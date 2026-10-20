"use client";

import Link from "next/link";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { AlertIcon } from "./icons";
import { CAPACITY, REQUEST_CONFIRMATION } from "@/config/site";
import {
  FORMATI,
  OCCASIONI,
  emptyRequest,
  validate,
  type Errors,
  type Kind,
  type RequestData,
} from "@/lib/request";

const field =
  "block min-h-12 w-full rounded-xs border bg-raised px-s4 py-s3 text-md text-ink placeholder:text-ink-secondary/70";
const label = "mb-s1 block text-sm font-semibold text-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-s1 flex items-start gap-s1 text-sm font-semibold text-error">
      <AlertIcon className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

function Chips({
  idPrefix,
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
}: {
  idPrefix: string;
  name: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const errId = `${idPrefix}-${name}-error`;
  return (
    <fieldset aria-describedby={error ? errId : undefined} className="min-w-0">
      <legend className={label}>
        {legend}
        {!required && <span className="font-normal text-ink-secondary"> (facoltativo)</span>}
      </legend>
      <div className="flex flex-wrap gap-s2">
        {options.map((o, i) => (
          <label key={o} className="relative">
            <input
              type="radio"
              name={`${idPrefix}-${name}`}
              data-field={i === 0 ? name : undefined}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer absolute inset-0 size-full cursor-pointer opacity-0"
            />
            <span className="inline-flex min-h-11 items-center rounded-pill border border-line bg-raised px-s4 text-md font-semibold text-ink transition-colors duration-(--duration-fast) peer-checked:border-water peer-checked:bg-water peer-checked:text-inverse peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-water">
              {o}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errId} message={error} />
    </fieldset>
  );
}

export default function RequestForm({ kind }: { kind: Kind }) {
  const [values, setValues] = useState<RequestData>(() => emptyRequest(kind));
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  // data minima: solo sul client, per non rendere instabile il prerender
  const today = useSyncExternalStore(
    () => () => {},
    () => new Date().toISOString().slice(0, 10),
    () => "",
  );
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof RequestData>(key: K, v: RequestData[K]) => {
    const next = { ...values, [key]: v };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const ctl = (key: keyof RequestData) => {
    // telefono ed email condividono l'errore di gruppo "contatto" (serve almeno uno dei due)
    const groupError = key === "telefono" || key === "email" ? errors.contatto : undefined;
    const invalid = Boolean(errors[key] || groupError);
    const errorId = errors[key] ? `${fid(key)}-error` : groupError ? `${fid("contatto")}-error` : undefined;
    return {
      id: fid(key),
      "data-field": key,
      "aria-invalid": invalid ? true : undefined,
      "aria-describedby": errorId,
      className: `${field} ${invalid ? "border-error" : "border-line"}`,
    };
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0] === "contatto" ? "telefono" : Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/richiesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      requestAnimationFrame(() => thanksRef.current?.focus());
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    const rows = [
      ["Data", new Date(values.data + "T12:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })],
      ["Ospiti", values.ospiti],
      kind === "privati" && values.occasione ? ["Occasione", values.occasione] : null,
      kind === "aziendali" && values.formato ? ["Formato", values.formato] : null,
      ["Nome", values.nome],
      values.telefono.trim() ? ["Telefono", values.telefono] : null,
      values.email.trim() ? ["Email", values.email] : null,
    ].filter((r): r is string[] => r !== null);
    return (
      <div role="status" className="scroll-mt-[calc(var(--header-height)+var(--space-4))] rounded-md bg-raised p-s6 shadow-card">
        <h3 ref={thanksRef} tabIndex={-1} className="font-display text-2xl font-bold outline-none">
          Grazie!
        </h3>
        <p className="mt-s3 text-md text-ink-secondary">
          Abbiamo ricevuto la tua richiesta. {REQUEST_CONFIRMATION}
        </p>
        <dl className="mt-s6 grid grid-cols-[auto_1fr] gap-x-s5 gap-y-s2 text-md">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-semibold text-ink">{k}</dt>
              <dd className="min-w-0 break-words text-ink-secondary">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const guests = Number(values.ospiti);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-s5">
      <div aria-live="polite" className="empty:hidden">
        {submitted && errorCount > 0 && (
          <p className="flex items-start gap-s2 rounded-xs border border-error bg-raised p-s3 text-md font-semibold text-error">
            <AlertIcon className="mt-0.5 size-5 shrink-0" />
            {errorCount === 1 ? "C’è 1 campo da correggere." : `Ci sono ${errorCount} campi da correggere.`}
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-s2 rounded-xs border border-error bg-raised p-s3 text-md font-semibold text-error">
            <AlertIcon className="mt-0.5 size-5 shrink-0" />
            Non siamo riusciti a inviare la richiesta. Riprova tra poco o chiamaci.
          </p>
        )}
      </div>

      {kind === "privati" ? (
        <Chips idPrefix={uid} name="occasione" legend="Occasione" options={OCCASIONI} value={values.occasione} onChange={(v) => set("occasione", v)} />
      ) : (
        <Chips
          idPrefix={uid}
          name="formato"
          legend="Formato"
          options={FORMATI}
          value={values.formato}
          onChange={(v) => set("formato", v)}
          error={errors.formato}
          required
        />
      )}

      <div className="grid gap-s5 md:grid-cols-2">
        <div>
          <label htmlFor={fid("data")} className={label}>
            Data dell’evento
          </label>
          <input type="date" min={today || undefined} autoComplete="off" required value={values.data} onChange={(e) => set("data", e.target.value)} {...ctl("data")} />
          <FieldError id={`${fid("data")}-error`} message={errors.data} />
        </div>
        <div>
          <label htmlFor={fid("ospiti")} className={label}>
            Numero di ospiti
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            required
            value={values.ospiti}
            onChange={(e) => set("ospiti", e.target.value.replace(/\D/g, ""))}
            {...ctl("ospiti")}
          />
          <FieldError id={`${fid("ospiti")}-error`} message={errors.ospiti} />
          {kind === "privati" && guests > CAPACITY.bordoPiscinaCoperto && (
            <p className="mt-s1 text-sm text-ink-secondary">
              Oltre {CAPACITY.bordoPiscinaCoperto} ospiti usiamo anche il giardino: ti ricontattiamo per i dettagli.
            </p>
          )}
          {kind === "aziendali" && guests > CAPACITY.centroCongressi && (
            <p className="mt-s1 text-sm text-ink-secondary">
              Il Centro congressi accoglie fino a {CAPACITY.centroCongressi} persone: ti ricontattiamo per valutare insieme la soluzione.
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={fid("nome")} className={label}>
          Nome e cognome
        </label>
        <input type="text" autoComplete="name" required value={values.nome} onChange={(e) => set("nome", e.target.value)} {...ctl("nome")} />
        <FieldError id={`${fid("nome")}-error`} message={errors.nome} />
      </div>

      <div role="group" aria-labelledby={fid("contatto-legend")}>
        <p id={fid("contatto-legend")} className={label}>
          Come ti ricontattiamo <span className="font-normal text-ink-secondary">(almeno uno tra telefono ed email)</span>
        </p>
        <div className="grid gap-s5 md:grid-cols-2">
          <div>
            <label htmlFor={fid("telefono")} className={label}>
              Telefono
            </label>
            <input type="tel" inputMode="tel" autoComplete="tel" value={values.telefono} onChange={(e) => set("telefono", e.target.value)} {...ctl("telefono")} />
            <FieldError id={`${fid("telefono")}-error`} message={errors.telefono} />
          </div>
          <div>
            <label htmlFor={fid("email")} className={label}>
              Email
            </label>
            <input type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} {...ctl("email")} />
            <FieldError id={`${fid("email")}-error`} message={errors.email} />
          </div>
        </div>
        <FieldError id={`${fid("contatto")}-error`} message={errors.contatto} />
      </div>

      {kind === "aziendali" && (
        <div>
          <label htmlFor={fid("tecniche")} className={label}>
            Necessità tecniche <span className="font-normal text-ink-secondary">(facoltativo)</span>
          </label>
          <textarea rows={3} value={values.tecniche} onChange={(e) => set("tecniche", e.target.value)} {...ctl("tecniche")} />
        </div>
      )}

      <div>
        <label htmlFor={fid("messaggio")} className={label}>
          Messaggio <span className="font-normal text-ink-secondary">(facoltativo)</span>
        </label>
        <textarea rows={4} autoComplete="off" value={values.messaggio} onChange={(e) => set("messaggio", e.target.value)} {...ctl("messaggio")} />
      </div>

      {/* honeypot anti-spam: nascosto a utenti e screen reader */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fid("sito")}>Non compilare questo campo</label>
        <input type="text" id={fid("sito")} tabIndex={-1} autoComplete="off" value={values.sito} onChange={(e) => set("sito", e.target.value)} />
      </div>

      <div>
        <label className="flex min-h-11 items-start gap-s3 text-md text-ink">
          <input
            type="checkbox"
            id={fid("consenso")}
            data-field="consenso"
            checked={values.consenso}
            onChange={(e) => set("consenso", e.target.checked)}
            aria-invalid={errors.consenso ? true : undefined}
            aria-describedby={errors.consenso ? `${fid("consenso")}-error` : undefined}
            className="mt-0.5 size-6 shrink-0 accent-water"
          />
          <span>
            Ho letto l’
            <Link href="/privacy" className="font-semibold text-water underline underline-offset-4">
              informativa privacy
            </Link>{" "}
            e accetto che i miei dati siano usati per rispondere alla richiesta.
          </span>
        </label>
        <FieldError id={`${fid("consenso")}-error`} message={errors.consenso} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 items-center justify-center gap-s2 rounded-pill bg-water px-s6 text-md font-semibold text-inverse transition-[filter] duration-(--duration-fast) ease-standard hover:brightness-110 active:brightness-95 disabled:cursor-wait disabled:opacity-80 md:justify-self-start"
      >
        {status === "loading" && (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
          </svg>
        )}
        {status === "loading" ? "Invio in corso…" : "Invia la richiesta"}
      </button>
    </form>
  );
}

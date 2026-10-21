import type { Access, CollectionConfig } from "payload";

type UserWithRole = { ruolo?: "amministratore" | "editor" } | null;

const isAdmin: Access = ({ req }) => (req.user as UserWithRole)?.ruolo === "amministratore";

/**
 * Due ruoli, come in WordPress: l'amministratore gestisce anche gli utenti, l'editor modifica i contenuti.
 * Il primo utente creato è sempre amministratore.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utente", plural: "Utenti" },
  admin: { useAsTitle: "email", defaultColumns: ["nome", "email", "ruolo"], group: false },
  auth: true,
  access: {
    // Ognuno vede e modifica sé stesso; solo l'amministratore vede gli altri, li crea e li elimina.
    read: ({ req }) => (isAdmin({ req } as never) ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: isAdmin,
    update: ({ req }) => (isAdmin({ req } as never) ? true : req.user ? { id: { equals: req.user.id } } : false),
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
        return { ...data, ruolo: totalDocs === 0 ? "amministratore" : data?.ruolo ?? "editor" };
      },
    ],
  },
  fields: [
    { name: "nome", label: "Nome", type: "text" },
    {
      name: "ruolo",
      label: "Ruolo",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Amministratore (tutto, anche gli utenti)", value: "amministratore" },
        { label: "Editor (contenuti e foto)", value: "editor" },
      ],
      access: { update: ({ req }) => (req.user as UserWithRole)?.ruolo === "amministratore" },
    },
  ],
};

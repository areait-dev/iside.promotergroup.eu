/**
 * Next.js tiene nel DOM, nascoste, le pagine già visitate: lo stesso id può comparire più volte.
 * Restituisce l'elemento con quell'id che è davvero visibile (cioè quello della pagina corrente).
 */
export function visibleById(id: string): HTMLElement | null {
  const all = document.querySelectorAll<HTMLElement>(`[id="${id}"]`);
  for (const el of all) if (el.getClientRects().length > 0) return el;
  return null;
}

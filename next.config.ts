import type { NextConfig } from "next";
import { findTodos } from "./src/config/site";

/**
 * Dati ancora da confermare: avviso in dev e in build; con FAIL_ON_TODO=1 la build si ferma
 * (da usare nella pipeline di produzione, così non si pubblica per errore con valori "TODO:").
 */
const globalWithFlag = globalThis as typeof globalThis & { __isideTodoChecked?: boolean };
if (!globalWithFlag.__isideTodoChecked) {
  globalWithFlag.__isideTodoChecked = true;
  const todos = findTodos();
  if (todos.length > 0) {
    const list = todos.map((t) => `  - ${t}`).join("\n");
    const message = `[iside] ${todos.length} valori del config sono ancora "TODO:" (src/config/site.ts):\n${list}`;
    if (process.env.FAIL_ON_TODO === "1") throw new Error(message);
    console.warn(message);
  }
}

const nextConfig: NextConfig = {
  /** La vecchia pagina /prenota è ora /preventivo (la query ?tipo=… viene mantenuta). */
  async redirects() {
    return [{ source: "/prenota", destination: "/preventivo", permanent: true }];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

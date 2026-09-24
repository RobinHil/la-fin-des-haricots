# La fin des haricots

Compte à rebours humoristique avant une rupture, en page web statique.

- Stack : Bun, Vite, React, TypeScript, Tailwind CSS v4 (plugin `@tailwindcss/vite`).
- Commandes : `bun install`, `bun run dev`, `bun run build`.
- Déploiement : `.github/workflows/deploy.yml` publie `dist/` sur GitHub Pages à chaque push sur `main`.
- La date de fin par défaut est dans `src/config.ts`. Elle se surcharge par l'URL :
  `?fin=2026-09-28T18:00&pour=Prénom`.
- Textes, noms de composants et variables en français.

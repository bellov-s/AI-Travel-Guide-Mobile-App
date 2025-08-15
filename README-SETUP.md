# AI Travel Guide — Next.js Scaffold (merge into your repo)

## What is this?
A minimal Next.js (App Router) skeleton + Tailwind + utilities to run your Figma-exported UI components.

## How to use
1) Extract all files into the **root** of your repo (so you get `/app`, `/styles`, etc.).
2) Install deps:
   ```bash
   npm i next react react-dom
   npm i @radix-ui/react-slot class-variance-authority clsx tailwind-merge
   npm i -D typescript tailwindcss postcss autoprefixer globby
   npx tailwindcss init -p  # safe if already present
   ```
3) (Optional) Fix versioned imports created by Figma:
   ```bash
   node scripts/fix-imports.mjs
   ```
4) Move your Figma components to `components/ui/` (or adjust imports).
5) Start dev server:
   ```bash
   npm run dev
   ```

## Notes
- If you already have `tsconfig.json` or `tailwind.config.js`, merge settings instead of overwriting.
- Update `app/page.tsx` to import and render your components (e.g., `Badge`).

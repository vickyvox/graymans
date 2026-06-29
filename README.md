# Graymans Media

React + Vite marketing website for a digital growth / web / automation agency.

## Local Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The static production files will be generated in `dist/`.

## Static Preview

```bash
node serve-dist.mjs
```

Open `http://127.0.0.1:5173`.

## Hostinger Deploy

1. Run `npm run build`.
2. Open Hostinger hPanel and go to File Manager.
3. Upload everything inside `dist/` to `public_html/`.
4. If an old site exists, replace its old files after keeping a backup.

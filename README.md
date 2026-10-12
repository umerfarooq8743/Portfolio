# Umer Farooq — Portfolio

Personal portfolio of Umer Farooq, Software Engineer (Full-Stack MEAN). Built with React, TypeScript, Vite and Tailwind CSS.

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm start          # or: npm run dev  → http://localhost:5173
```

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm start` / `dev` | Development server with hot reload          |
| `npm run build`     | Type-check, then production build → `dist/` |
| `npm run preview`   | Serve the production build locally          |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | TypeScript only                             |

## Editing content

All text, projects, experience, skills and links live in **`src/data/profile.ts`**. Components read from it, so most updates don't need any JSX changes. Keep it factual: no invented metrics, clients or links.

- Profile photo: `public/umer-farooq.jpg`
- Social preview image: `public/og-image.png` (1200×630)
- Favicon: `public/favicon.svg`, `public/apple-touch-icon.png`

## SEO and your domain

No domain is hard-coded. Once the site has a real URL, set `SITE_URL` for production builds. The build then adds:

- a canonical link
- absolute `og:url` and `og:image` tags
- `sitemap.xml`
- a `robots.txt` that references the sitemap

```bash
SITE_URL=https://your-domain.com npm run build
```

On Vercel or Netlify, add `SITE_URL` as an environment variable in the project settings.

## Deploy

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repo.
3. Vercel detects Vite automatically: the build command is `npm run build` and the output folder is `dist`.
4. Optionally add a `SITE_URL` environment variable and a custom domain.

### Netlify

Use the same steps. Set the build command to `npm run build` and the publish directory to `dist`.

### GitHub Pages

Build with `vite build --base=/<repo-name>/` (or use a custom domain), then publish `dist/` with a GitHub Actions Pages workflow.

## Project structure

```
src/
  data/profile.ts        ← all content
  components/            ← page sections (Hero, About, Projects, …)
  components/ui/         ← small reusable pieces (Reveal, Tag, ButtonLink, icons)
  hooks/                 ← useActiveSection (nav highlighting)
  index.css              ← design tokens (Tailwind @theme) + shared styles
```

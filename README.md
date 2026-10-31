# personal website

One page, no scrolling: a mountain banner that follows the time of day in Waterloo, then a short bio.

- follows the system theme until the sun/moon button is clicked, then remembers the choice
- text sizes itself to fit any screen

Built with Next.js and Tailwind.

```bash
npm run dev
```

Copy lives in `app/page.tsx`, projects in `lib/projects.ts`. Replace `public/resume.pdf` to update the resume.

## Deploying

Every push to `main` builds a static export (`out/`) and publishes it to GitHub Pages via `.github/workflows/pages.yml`. Asset paths in `<img>`/`<a>` tags go through `asset()` in `lib/asset.ts` so they pick up the Pages base path.

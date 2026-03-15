# Setup & Deploy — BlueKit Landing Page

Instructions to scaffold, develop, and deploy the React landing page from scratch.

---

## 1. Scaffold

```bash
npm create vite@latest bluekit-landing -- --template react-ts
cd bluekit-landing
npm install
```

### Optional: SVG as React component

If you want to import the logo SVG as a React component (recommended):

```bash
npm install -D vite-plugin-svgr
```

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
});
```

Then import: `import { ReactComponent as Logo } from './assets/logo.svg';`

Alternatively, inline the SVG path directly in `Logo.tsx` (simpler, no plugin needed).

### Optional: lucide-react for icons

```bash
npm install lucide-react
```

Use `<Folder />`, `<Lock />`, `<GitBranch />`, `<FileText />` for step card icons.

---

## 2. File Setup

### `src/styles/tokens.css`

Create this file with all CSS variables from `design-system.md`. Import it at the top of `src/styles/global.css`.

### `src/styles/global.css`

```css
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--t1);
  font-family: var(--ff-body);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a { text-decoration: none; }
```

Import in `src/main.tsx`:
```ts
import './styles/global.css';
```

### `index.html`

Add Google Fonts link tags to `<head>` (see design-system.md Typography section).

---

## 3. Copy Logo Asset

Copy the logo SVG to `src/assets/logo.svg`.

The SVG content:
```svg
<svg viewBox="0 0 1089 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M354.942 131.436..." <!-- full path from design-system.md -->
    stroke="#4287F5"
    stroke-width="20"
  />
</svg>
```

Also copy to `public/favicon.svg` for the browser tab icon.

Update `index.html`:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

---

## 4. Build Components

Create each component in `src/components/` following `components.md`.

Order to build:
1. `Logo.tsx` — shared, needed by Nav, Hero, Footer
2. `Nav.tsx`
3. `Hero.tsx`
4. `VideoSection.tsx`
5. `HowItWorks.tsx`
6. `Download.tsx`
7. `Footer.tsx`
8. `App.tsx` — assembles everything

---

## 5. Development

```bash
npm run dev
# Opens at http://localhost:5173
```

---

## 6. Production Build

```bash
npm run build
# Output: dist/
```

Preview the build locally:
```bash
npm run preview
```

---

## 7. Deploy (Vercel)

Push the project to a GitHub repo, then:

```bash
# One-time: install Vercel CLI
npm install -g vercel

# From the project root — first deploy
vercel

# Subsequent deploys
vercel --prod
```

Vercel auto-detects Vite with no config needed. It will:
- Set build command to `npm run build`
- Set output directory to `dist`
- Assign a `*.vercel.app` domain immediately

**Custom domain:** Vercel dashboard → Project → Settings → Domains → Add.

**Git-connected deploys (recommended):** Link the repo in the Vercel dashboard and every push to `main` auto-deploys. No CLI needed after initial setup.

---

## 8. When the Download Link Is Ready

1. Create a GitHub Release in the main app repo with the `.dmg` attached
2. Copy the direct download URL from the release assets
3. Replace `href="#"` on both download buttons with the URL
4. Redeploy

---

## 9. When the Screen Studio Video Is Ready

In `VideoSection.tsx`, replace the placeholder div:

```tsx
{/* BEFORE */}
<div className="video-placeholder">...</div>

{/* AFTER — Screen Studio iframe example */}
<iframe
  src="YOUR_SCREEN_STUDIO_EMBED_URL"
  width="100%"
  height="100%"
  frameBorder="0"
  allow="autoplay; fullscreen"
  allowFullScreen
  title="BlueKit demo"
  style={{ display: 'block' }}
/>
```

The `.video-wrap` container already handles 16:9 aspect ratio and max-width via CSS.

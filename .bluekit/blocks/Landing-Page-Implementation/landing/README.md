# BlueKit Landing Page — Project Overview

A deployable single-page React + Vite app for the BlueKit marketing site.
Lives in its own repo/directory — independent from the main app.

## Goals

- Match the glassmorphic dark aesthetic of the app exactly
- Convey the local-first, developer-native value prop immediately
- Placeholder slot for a centered Screen Studio demo video
- Single download CTA for macOS

## Stack

- **React 18** + **TypeScript**
- **Vite** (zero-config, fast builds)
- **CSS Modules** or plain CSS variables — no Chakra UI (no need for the full system)
- Deploy target: **Vercel**, **Netlify**, or GitHub Pages static export

## Directory Structure (target repo)

```
bluekit-landing/
├── public/
│   └── favicon.svg          ← BlueKit logo SVG
├── src/
│   ├── assets/
│   │   └── logo.svg         ← same BlueKit SVG (inlined or imported)
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── VideoSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Download.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── tokens.css       ← design tokens (colors, spacing, fonts)
│   │   └── global.css       ← reset + body + orbs
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Files in This Directory

| File | Purpose |
|---|---|
| `README.md` | This overview |
| `design-system.md` | Colors, typography, spacing, glass tokens |
| `components.md` | Per-component specs, props, markup patterns |
| `copy.md` | All final copy — hero, steps, download, footer |
| `setup.md` | Scaffold commands, Vite config, deploy instructions |

## Source of Truth for Branding

All colors and tokens come from the main app's theme file:
`/Users/stephanchiorean/Documents/projects/blueKitApps/blueKit/src/theme.ts`

Logo SVG source:
`/Users/stephanchiorean/Documents/projects/blueKitApps/blueKit/src/shared/components/logo/BlueKitLogo.tsx`

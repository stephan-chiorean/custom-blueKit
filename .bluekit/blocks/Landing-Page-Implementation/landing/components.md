# Components — BlueKit Landing Page

Each component is a single `.tsx` file in `src/components/`.
No Chakra UI. Use CSS Modules or global CSS variables from `tokens.css`.

---

## `App.tsx`

Root layout. Renders orbs + nav + all sections:

```tsx
export default function App() {
  return (
    <>
      <div className="orbs" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>
      <Nav />
      <main>
        <Hero />
        <VideoSection />
        <HowItWorks />
        <Download />
      </main>
      <Footer />
    </>
  );
}
```

The `orbs` div is `position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden`.
`main` is `position: relative; z-index: 1`.

---

## `Nav.tsx`

Sticky glassmorphic navbar. Always visible at top.

**Behavior:**
- Fixed position, full width
- Background: `rgba(5,13,31,0.68)` + `backdrop-filter: blur(28px) saturate(180%)`
- Border-bottom: `1px solid rgba(255,255,255,0.055)`
- Height: `64px`

**Left:** Logo SVG (30×30) + blueKit wordmark
**Right:** Ghost "Download for Mac" button → smooth scrolls to `#download`

```tsx
<nav>
  <div className="nav-inner"> {/* max-width: 1160px, centered, flex space-between */}
    <a href="#" className="nav-brand">
      <Logo size={30} />
      <span className="wordmark">
        <span className="blue">blue</span><span className="kit">Kit</span>
      </span>
    </a>
    <a href="#download" className="nav-btn">
      <DownloadIcon size={13} />
      Download for Mac
    </a>
  </div>
</nav>
```

---

## `Hero.tsx`

Centered, full-viewport-height intro. All elements animate in on mount via CSS keyframes.

**Stagger order (each 80–100ms apart):**
1. Logo (200×200) — `animation-delay: 0.05s`
2. blueKit wordmark (giant) — `animation-delay: 0.15s`
3. Tagline "The Notebook for Code" — `animation-delay: 0.24s`
4. Subheadline — `animation-delay: 0.32s`
5. CTA buttons — `animation-delay: 0.40s`

**Animation (`@keyframes rise`):**
```css
@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Apply with: animation: rise 0.75s cubic-bezier(0.22,1,0.36,1) forwards; */
```

**Logo:**
- Size: 200px
- `filter: drop-shadow(0 0 50px rgba(66,135,245,0.22))`

**Wordmark:**
- `font-family: Sora; font-weight: 800; letter-spacing: -0.04em`
- `font-size: clamp(68px, 10.5vw, 112px)`
- "blue" → `color: #4287f5`
- "Kit" → `color: white; text-shadow: 0 2px 20px rgba(0,0,0,0.35)`

**Tagline:**
- `font-family: Sora; font-weight: 400; font-size: clamp(15px, 2.2vw, 20px)`
- `color: rgba(255,255,255,0.55)`

**Subheadline:**
- `max-width: 500px; font-size: 15.5px; color: rgba(255,255,255,0.32); line-height: 1.75`

**CTAs (flex row, gap 14px):**
- Primary: "Download for Mac" → solid blue button with Apple SVG icon → `href="#download"`
- Secondary: "See how it works ↓" → ghost/text button → `href="#how"`

---

## `VideoSection.tsx`

Centered section for the Screen Studio demo embed.

**Layout:** `display: flex; flex-direction: column; align-items: center`

**Eyebrow label:** "See it in action"
- `font-family: JetBrains Mono; font-size: 11.5px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: #4287f5`

**Video container:**
- `width: 100%; max-width: 920px; aspect-ratio: 16/9`
- Glass surface recipe (see design-system.md)
- `border-radius: 20px; overflow: hidden`
- Subtle inner radial gradient: `radial-gradient(ellipse at 50% 65%, rgba(66,135,245,0.055) 0%, transparent 68%)`
- On hover: `border-color: rgba(66,135,245,0.22)`

**Video placeholder (replace when video is ready):**
```tsx
{/* TODO: Replace with Screen Studio embed */}
<div className="video-placeholder">
  <div className="play-ring">
    <PlayIcon />
  </div>
  <p>Demo coming soon</p>
</div>
```

Play ring: `width/height: 68px; border-radius: 50%; background: rgba(66,135,245,0.12); border: 1px solid rgba(66,135,245,0.28)`

**When embedding Screen Studio video:**
Replace the placeholder div with `<iframe>` or `<video>` tag. The container already handles sizing via `aspect-ratio: 16/9`.

---

## `HowItWorks.tsx`

4-card grid explaining the workflow. Each card reveals on scroll.

**Section eyebrow:** "How it works"
**Section heading:** "Made for the way you actually work"
**Section subtitle:** "No onboarding. No cloud setup. Just open it and go."

**Grid:** `display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px`
- 2 columns on tablet (≤900px)
- 1 column on mobile (≤580px)

**Step card anatomy:**
```tsx
<div className="step glass-card">
  <span className="step-num">01</span>  {/* JetBrains Mono, 11.5px, blue-500 */}
  <StepIcon />                          {/* 38×38, color: blue-400, stroke 1.5 */}
  <h3 className="step-title">...</h3>  {/* Sora 600, 15.5px */}
  <p className="step-desc">...</p>     {/* DM Sans 400, 13.5px, t2 */}
</div>
```

Hover: adds inner radial gradient highlight via `::after` pseudo-element.

**Steps data** (see `copy.md` for full text):

| # | Icon | Title |
|---|---|---|
| 01 | Folder | "Point it at a project" |
| 02 | Notebook/lines | "Build your context" |
| 03 | Lock | "Everything stays local" |
| 04 | Git branch | "Knowledge travels with your code" |

Use simple SVG icons — either inline or from `lucide-react` (small bundle, tree-shakable):
- Folder: `<Folder />` or custom path
- Notebook: `<FileText />` or rectangle with lines
- Lock: `<Lock />`
- Git branch: `<GitBranch />`

Code pills inside step descriptions:
```tsx
<code style={{
  fontFamily: 'JetBrains Mono',
  fontSize: '11.5px',
  color: 'var(--blue-300)',
  background: 'rgba(66,135,245,0.1)',
  padding: '2px 6px',
  borderRadius: '4px',
}}>~/.bluekit</code>
```

**Scroll reveal:**
```tsx
// useEffect with IntersectionObserver
// Add 'in' class when intersecting
// CSS: .step { opacity: 0; transform: translateY(22px); transition: 0.65s ease; }
//      .step.in { opacity: 1; transform: translateY(0); }
// Stagger via inline style: style={{ transitionDelay: `${index * 0.09}s` }}
```

---

## `Download.tsx`

Centered CTA section with a single prominent download card.

**Card:**
- `max-width: 620px; margin: 0 auto`
- `padding: 68px 48px; text-align: center`
- Glass surface recipe
- `border-radius: 24px`
- Top-edge highlight line via `::before`:
  ```css
  content: '';
  position: absolute; top: -1px; left: 50%;
  transform: translateX(-50%);
  width: 55%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(66,135,245,0.65), transparent);
  ```
- Inner top radial glow via `::after`:
  ```css
  background: radial-gradient(ellipse at 50% -10%, rgba(66,135,245,0.09) 0%, transparent 58%);
  ```

**Content:**
- Headline: "Built for Mac. Works offline." (two lines)
- Subtext: "Free download. No account required."
- Big download button with Apple SVG logo + "Download for macOS"
- Meta line: "macOS 12+ · Apple Silicon & Intel · ~15 MB"

**Apple logo SVG path** (fill="currentColor"):
```
M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z
```
(viewBox="0 0 24 24", size 20×20)

**The `href` on the download button** should point to the GitHub Releases download URL once the app is released. Leave as `#` until then.

---

## `Footer.tsx`

Minimal centered footer.

```tsx
<footer>
  <div className="foot-brand">
    <Logo size={26} style={{ opacity: 0.65 }} />
    <span className="foot-mark">
      <span className="blue">blue</span><span className="kit">Kit</span>
    </span>
  </div>
  <p className="foot-copy">© 2026 BlueKit · Built for developers who think locally.</p>
</footer>
```

- `padding: 40px 32px 52px`
- `border-top: 1px solid rgba(255,255,255,0.05)`
- `flex-direction: column; align-items: center; gap: 14px`
- "Kit" in footer wordmark: `color: rgba(255,255,255,0.55)` (slightly dimmer)

---

## `Logo.tsx` (shared)

Reusable logo SVG component used in Nav, Hero, and Footer:

```tsx
interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ size = 64, className, style }: LogoProps) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 1089 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M354.942 131.436C..." /* full path from design-system.md */
        stroke="#4287F5"
        strokeWidth="20"
      />
    </svg>
  );
}
```

---

## Scroll Reveal Hook

```tsx
// src/hooks/useScrollReveal.ts
import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

Or use a single `useEffect` in each section component that queries all `.reveal` elements.

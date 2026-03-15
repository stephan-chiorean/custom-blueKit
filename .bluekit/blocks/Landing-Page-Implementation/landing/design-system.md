# Design System — BlueKit Landing Page

Match the app's aesthetic exactly. All values sourced from:
`/Users/stephanchiorean/Documents/projects/blueKitApps/blueKit/src/theme.ts`
`/Users/stephanchiorean/Documents/projects/blueKitApps/blueKit/src/views/home/WelcomeView.tsx`

---

## Color Tokens

Define these as CSS custom properties in `src/styles/tokens.css`:

```css
:root {
  /* Brand */
  --blue-200:  #FAEDE3;   /* warm cream — dark mode text in app */
  --blue-300:  #93c5fd;
  --blue-400:  #60a5fa;
  --blue-500:  #4287f5;   /* PRIMARY — used everywhere */
  --blue-600:  #2563eb;
  --blue-700:  #1d4ed8;

  /* Background */
  --bg:        #050d1f;   /* page base */

  /* Glass surfaces (cards, nav, video container) */
  --surface:        rgba(255, 255, 255, 0.04);
  --surface-hover:  rgba(255, 255, 255, 0.07);
  --border:         rgba(255, 255, 255, 0.08);
  --border-hover:   rgba(66, 135, 245, 0.30);

  /* Text */
  --t1: rgba(255, 255, 255, 0.95);   /* headings, primary */
  --t2: rgba(255, 255, 255, 0.55);   /* body, secondary */
  --t3: rgba(255, 255, 255, 0.32);   /* muted, meta */
}
```

---

## Typography

Google Fonts — load in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
```

```css
:root {
  --ff-display: 'Sora', sans-serif;       /* headings, wordmark */
  --ff-body:    'DM Sans', sans-serif;    /* body, buttons, nav */
  --ff-mono:    'JetBrains Mono', monospace; /* step numbers, code pills */
}
```

### Type Scale

| Use | Size | Weight | Font |
|---|---|---|---|
| Hero wordmark | `clamp(68px, 10.5vw, 112px)` | 800 | Sora |
| Section heading | `clamp(30px, 4.5vw, 46px)` | 700 | Sora |
| Download headline | `clamp(26px, 4vw, 40px)` | 700 | Sora |
| Step title | `15.5px` | 600 | Sora |
| Nav wordmark | `19px` | 700 | Sora |
| Hero tagline | `clamp(15px, 2.2vw, 20px)` | 400 | Sora |
| Body / subheadline | `15–16px` | 400 | DM Sans |
| Button | `14–16px` | 500–600 | DM Sans |
| Step number | `11.5px` | 700 | JetBrains Mono |
| Meta / eyebrow | `11–12px` | 500–700 | JetBrains Mono |

---

## The Wordmark

"blueKit" renders in two spans — exact match to WelcomeView.tsx:

```tsx
<span style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, letterSpacing: '-0.04em' }}>
  <span style={{ color: 'var(--blue-500)' }}>blue</span>
  <span style={{ color: '#fff' }}>Kit</span>
</span>
```

In the nav (smaller):
- `fontSize: 19px`, `fontWeight: 700`, `letterSpacing: '-0.025em'`

---

## Logo SVG

The BlueKit logo is a single `<path>` with `stroke="#4287F5"` `strokeWidth="20"` `fill="none"` on a `viewBox="0 0 1089 1080"` canvas.

Full path data:
```
M354.942 131.436C369.493 129.141 385.916 129.628 402.017 132.673C430.736 138.105 460.974 152.259 477.09 176.431C502.493 167.944 526.289 163.898 545.439 163.898C567.802 163.898 596.568 169.417 626.895 181.146C641.652 155.206 672.254 139.872 701.499 133.721C718.094 130.23 735.155 129.463 750.28 131.644C765.192 133.793 779.382 138.988 788.911 148.518C797.457 157.064 802.49 169.337 804.986 182.385C807.511 195.581 807.629 210.486 805.557 225.345C801.892 251.622 791.081 279.581 772.336 298.201C797.459 337.301 814.981 385.798 818.716 444.777C820.598 474.51 805.938 514.285 776.47 551.142C749.027 585.465 708.13 618.089 653.513 638.876C679.494 672.057 695.214 716.627 695.214 765.353C695.214 774.024 694.716 782.561 693.752 790.923C698.627 788.91 702.696 786.017 705.437 782.666C709.733 777.413 711.417 770.407 706.491 761.173L706.31 760.831L706.153 760.476C698.056 741.975 685.721 714.781 699.391 686.171L699.564 685.809L699.767 685.461C708.726 670.03 723.809 663.232 738.531 662.924C752.717 662.627 767.251 668.295 776.908 678.639L777.364 679.135L777.444 679.223C781.333 683.62 784.373 689.049 785.876 695.033L786.017 695.614L786.021 695.638L786.027 695.66C786.815 699.116 786.122 702.559 784.5 705.308L784.493 705.318C782.834 708.122 780.134 710.337 776.78 711.295C773.423 712.254 769.961 711.797 767.075 710.295L767.063 710.289C764.25 708.82 761.856 706.283 760.692 702.963L760.691 702.964C760.175 701.498 759.26 700.08 757.957 698.822L757.676 698.559L757.66 698.545C753.724 694.925 747.292 693.157 741.02 693.954C734.516 694.78 731.34 697.779 730.532 700.104L730.475 700.27L730.411 700.434C728.72 704.801 728.833 710.746 731.13 718.356C733.388 725.836 737.424 733.817 742.049 741.484C753.027 758.466 758.159 787.272 742.997 809.242C734.453 821.963 723.222 830.897 710.656 836.794C716.268 845.117 719.593 854.389 719.593 864.417C719.593 891.657 695.612 913.009 664.677 926.977C632.815 941.362 589.499 950 542.188 950H541.376C541.34 950 541.308 949.999 541.28 949.999H541.169L540.961 949.998C540.89 949.998 540.818 949.997 540.747 949.997V949.996C540.585 949.996 540.425 949.996 540.268 949.995V949.994C493.397 949.762 450.553 941.052 419.054 926.683C388.458 912.726 364.784 891.478 364.784 864.417C364.784 845.454 376.537 829.34 393.583 816.812C389.644 800.462 387.538 783.193 387.538 765.353C387.538 715.425 404.046 669.855 431.19 636.432C378.813 615.172 339.466 582.913 313.011 549.212C284.537 512.94 270.289 474.018 272.163 444.77C276.286 380.421 296.791 328.568 325.632 287.79C310.802 268.107 302.482 242 300.256 217.729C299.01 204.141 299.628 190.695 302.319 178.787C304.986 166.989 309.861 155.968 317.732 148.096C326.972 138.856 340.585 133.7 354.942 131.436Z
```

Save this as `src/assets/logo.svg` and import as a React component via `vite-plugin-svgr`, or inline directly in JSX.

---

## Background Orbs

Three fixed-position radial gradient blobs that float behind all content.
Apply `filter: blur(130px)` and animate with `@keyframes` for subtle drift.

```css
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(130px);
  pointer-events: none;
  z-index: 0;
}

/* Blue — top left */
.orb-a {
  width: 900px; height: 900px;
  top: -260px; left: -200px;
  background: radial-gradient(circle, rgba(66,135,245,0.11) 0%, transparent 70%);
  animation: drift-a 22s ease-in-out infinite;
}

/* Purple — mid right */
.orb-b {
  width: 720px; height: 720px;
  top: 38%; right: -180px;
  background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
  animation: drift-b 28s ease-in-out infinite;
}

/* Cyan — bottom center */
.orb-c {
  width: 640px; height: 640px;
  bottom: -120px; left: 28%;
  background: radial-gradient(circle, rgba(6,182,212,0.065) 0%, transparent 70%);
  animation: drift-c 19s ease-in-out infinite;
}

@keyframes drift-a {
  0%,100% { transform: translate(0,0); }
  33%      { transform: translate(70px,50px); }
  66%      { transform: translate(-30px,90px); }
}
@keyframes drift-b {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(-90px,-70px); }
}
@keyframes drift-c {
  0%,100% { transform: translate(0,0); }
  45%      { transform: translate(60px,-50px); }
  80%      { transform: translate(-25px,35px); }
}
```

---

## Glass Surface Recipe

Used on all cards, nav, and the video container:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 18px;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}
.glass-card:hover {
  border-color: rgba(66, 135, 245, 0.30);
  transform: translateY(-3px);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.28);
}
```

Nav uses a stronger blur:
```css
backdrop-filter: blur(28px) saturate(180%);
background: rgba(5, 13, 31, 0.68);
```

---

## Spacing

| Token | Value |
|---|---|
| Section vertical padding | `128px` desktop, `80px` mobile |
| Container max-width | `1160px` |
| Horizontal padding | `32px` desktop, `20px` mobile |
| Card padding | `30px 26px` (step cards), `68px 48px` (download card) |
| Gap between step cards | `14px` |

---

## Buttons

**Primary (Download):**
```css
background: var(--blue-500);
color: white;
border-radius: 12px;
padding: 13px 26px;
font: 600 15px var(--ff-body);
transition: background 0.2s, transform 0.2s, box-shadow 0.2s;

&:hover {
  background: var(--blue-600);
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(66,135,245,0.38);
}
```

**Ghost (Nav):**
```css
background: rgba(66,135,245,0.07);
border: 1px solid rgba(66,135,245,0.35);
color: var(--blue-300);
border-radius: 10px;
padding: 8px 18px;
font: 500 13.5px var(--ff-body);

&:hover {
  background: rgba(66,135,245,0.14);
  border-color: rgba(66,135,245,0.55);
  color: white;
}
```

**Big Download (CTA section):**
```css
padding: 15px 36px;
border-radius: 14px;
font: 600 16px var(--ff-display);
letter-spacing: -0.015em;

&:hover {
  box-shadow: 0 14px 44px rgba(66,135,245,0.42), 0 0 0 1px rgba(66,135,245,0.28);
}
```

---

## Scroll Reveal Animation

Use `IntersectionObserver` to add a `.in` class when elements enter the viewport.
Base state: `opacity: 0; transform: translateY(22px);`
Revealed: `opacity: 1; transform: translateY(0);` with `transition: 0.65s ease`.

Stagger child cards with `transition-delay`: `0.08s`, `0.17s`, `0.26s`, `0.35s`.

Hero elements use CSS animation (`@keyframes rise`) with `animation-fill-mode: forwards` and staggered `animation-delay` (no JS needed for the hero since it's above the fold).

---

## Reduced Motion

Always include:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

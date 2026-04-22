# PostHog Setup

## Overview
Add PostHog analytics to the landing page to track page views, download clicks, and section engagement.

## Steps

### 1. Install dependency
```bash
npm install posthog-js
```

### 2. Add env var
Create `.env.local`:
```
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxx
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

Get your key from: PostHog > Project Settings > Project API Key

### 3. Initialize in `src/main.tsx`
Add PostHog init before the React render call:
```ts
import posthog from 'posthog-js'

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    capture_pageview: true,
  })
}
```

### 4. Create `src/analytics.ts`
Thin wrapper so components don't import posthog directly:
```ts
import posthog from 'posthog-js'

export function trackDownload(source: 'hero' | 'download_section') {
  posthog.capture('download_clicked', { source })
}
```

### 5. Wire up download buttons
Both `Hero.tsx` and `Download.tsx` have a download `<Link>` pointing to the `.dmg`.
Add `onClick={() => trackDownload('hero')}` and `onClick={() => trackDownload('download_section')}` respectively.

### 6. Add `.env.local` to `.gitignore`
Should already be there — double-check so the key isn't committed.

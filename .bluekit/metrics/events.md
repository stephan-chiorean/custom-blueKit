# Event Taxonomy

All events fired via PostHog on the landing page.

## Events

### `download_clicked`
Fired when a user clicks any download button.

| Property | Type | Values | Notes |
|---|---|---|---|
| `source` | string | `hero`, `download_section` | Which CTA was clicked |

**Where fired:**
- `Hero.tsx` — primary CTA button (above the fold)
- `Download.tsx` — bottom download section

---

### `$pageview` (automatic)
PostHog fires this automatically on init. Captures URL, referrer, UTM params.

---

## Future events to add

| Event | Trigger | Properties |
|---|---|---|
| `section_viewed` | Section enters viewport | `section: 'hero' \| 'how_it_works' \| 'download'` |
| `how_it_works_clicked` | "See how it works" anchor link | — |
| `video_played` | VideoSection play interaction | — |

## Dashboard suggestions
- **Conversion funnel:** `$pageview` → `download_clicked`
- **CTA comparison:** `download_clicked` grouped by `source`
- **Traffic sources:** `$pageview` with UTM breakdown

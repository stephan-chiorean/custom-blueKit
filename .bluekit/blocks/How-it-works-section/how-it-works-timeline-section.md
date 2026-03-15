---
id: how-it-works-timeline-section
alias: How It Works Timeline Section
type: kit
is_base: false
version: 1
tags:
  - landing-page
  - ui
  - chakra
description: A "How It Works" section with an alternating left-right timeline layout, large faded step numbers, icon nodes centered on a vertical connector line, and consistent type scale.
---
# How It Works Timeline Section

## End State

After applying this kit, the UI will have a full-width section with:

**Section heading block:**
- Centered heading — `3xl`/`4xl` responsive font size, bold
- A visually accented keyword within the heading (brand color or gradient text)
- A short subtitle below in a muted/secondary text color

**Timeline layout:**
- A vertical connector line centered on the page (desktop only), rendered as a gradient from the primary brand color → accent color → faded primary. Hidden on mobile.
- 4 steps arranged in an alternating left-right pattern: even-indexed steps have content on the left and icon on the right; odd-indexed steps are reversed. On mobile, steps stack vertically.
- Vertical gap between steps: `~80px` on desktop (`mt-20` equivalent), `~48px` on mobile.

**Per-step anatomy:**
- **Step number** — Large decorative numeral (`"01"`, `"02"`, etc.) in monospace, `5xl` font size, bold, at ~15–20% opacity of the primary brand color. Sits above the title.
- **Step title** — `xl` font size, semibold weight.
- **Step description** — Body text, muted/secondary color, max-width constrained to ~`sm` (~384px) to keep lines readable.
- **Icon node** — `64×64px` rounded square (radius `2xl`/`16px`), card/surface background, border in primary color at 30% opacity, subtle glow. Contains a single `28px` icon in the primary brand color. This node sits centered on the vertical connector line.
- Content block text-aligns right on even steps, left on odd steps (desktop only). On mobile always left-align.

**Responsive behavior:**
- Mobile: single column, icon node appears above the content block, no connector line.
- Desktop: two-column alternating, icon centered on the connector line.

**Chakra UI mapping:**
- `Box` / `Container` for layout wrappers
- `VStack` with `spacing={0}` for the steps container, override margins per-step
- `Flex` with `direction` responsive array for each step row (e.g. `['column', null, index % 2 === 0 ? 'row' : 'row-reverse']`)
- `Text` with `fontSize` responsive array for heading (`['3xl', null, '4xl']`), step number (`'5xl'`), step title (`'xl'`), body (`'md'`)
- `fontFamily="mono"` on the step number `Text`
- `fontWeight` — `bold` for heading and step number, `semibold` for step title
- `color` — use `brand.500` or token equivalent for accented text; `gray.500` / `muted` token for descriptions and faded number
- The connector line is an `absolutely` positioned `Box` — `width="1px"`, full height, `bgGradient` from primary → accent → transparent
- Icon node: `Box` with `w={16} h={16}` (`64px`), `borderRadius="2xl"`, `border="1px solid"`, `borderColor="brand.300"`, `display="flex" alignItems="center" justifyContent="center"`, `boxShadow` for subtle glow
- `zIndex={1}` on icon node so it renders above the connector line

## Implementation Principles

- Keep the connector line purely decorative — never encode meaning in it beyond visual flow
- Step numbers should be monospaced, oversized, and faded — they are typographic texture, not navigation
- Constrain description text width (`maxW="sm"` or equivalent) regardless of available space to maintain readability
- The icon node always centers on the connector line — use `position="absolute"` on a centered wrapper or `flexShrink={0}` with explicit sizing
- Alternate text alignment (right / left) only on `md` breakpoint and above; always left-align on mobile
- Use a single gradient direction (top → bottom) for the connector line, fading out toward the last step
- Section padding: `py-24` equivalent (`paddingY={24}` in Chakra spacing scale = `96px` top and bottom)
- Max content width: `~896px` (`max-w-4xl`) centered with `mx-auto`
- Heading container: `max-w-2xl` centered, `mb-16` bottom margin before steps
- Prefer icon libraries with consistent stroke width (Lucide, Phosphor) at `28px` size

## Verification Criteria

After generation, verify:
- ✓ Section renders a centered heading with a brand-colored accent word and muted subtitle
- ✓ Vertical connector line is visible centered on desktop and hidden on mobile
- ✓ Steps alternate left/right on desktop; stack vertically on mobile
- ✓ Each step shows: large faded monospace number → bold title → muted description
- ✓ Icon node is `64×64px`, rounded, bordered in brand color, with glow, centered on the connector line
- ✓ Even steps: content right-aligned on the left side; odd steps: content left-aligned on the right side
- ✓ Step description text does not exceed ~384px wide
- ✓ Mobile layout: icon appears above text, no connector line, all text left-aligned
- ✓ Vertical rhythm between steps is ~80px on desktop, ~48px on mobile

## Interface Contracts

**Provides:**
- A self-contained `<HowItWorks />` (or equivalent) section component
- A `steps` data array with shape `{ number: string, icon: ComponentType, title: string, description: string }[]`
- All layout, spacing, and typography contained within the section — no global style side effects

**Requires:**
- A design token / theme with: `primary`/`brand` color, `accent` color, `muted` text color, `card`/`surface` background color
- An icon library available in the project (Lucide, Phosphor, or equivalent)
- Responsive layout support (CSS Grid/Flexbox or Chakra's responsive props)

**Compatible With:**
- Dark-mode themed landing pages (connector line gradient and faded number work well on dark surfaces)
- Any hero or features section above/below — section is self-padded
- Chakra UI v2+ theme provider

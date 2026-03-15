# BlueKit Landing Page Implementation

## Product Truth To Anchor
- Core surface today is `Planner + Blocks + Bookmarks`, not Kits/Walkthroughs/Agents/Diagrams.
- Optional tabs exist behind feature flags and should be presented as extensions, not core promise.
- Primary value is practical workflow speed inside real project context.
- Evidence in repo:
- `src/views/project/components/SidebarContent.tsx`
- `src/shared/contexts/FeatureFlagsContext.tsx`
- `src/views/project/sections/PlannerSection.tsx`
- `src/views/project/sections/BlocksSection.tsx`
- `src/features/bookmarks/components/BookmarksTabContent.tsx`

## Positioning Statement
BlueKit is a desktop control room for execution-level engineering work.  
It keeps planning, reusable blocks, and critical file context in one fast interface attached to your real project filesystem.

## Creative Direction
- Theme: "Control Room Notebook"
- Tone: precise, editorial, high-trust
- Visual personality: deep navy field, warm amber signal color, pale technical surfaces
- Design goal: "operational confidence", not "AI assistant magic"

## Information Architecture (One-Page Landing)
1. Hero: value proposition + primary CTA + subtle architecture strip.
2. Product Pillars: three equal cards for Planner, Blocks, Bookmarks.
3. Workflow Story: one realistic daily flow from task planning to file execution.
4. Architecture Snapshot: React/IPC/Tauri/watchers/SQLite in one simple diagram row.
5. Evidence & Trust: "built on repo-native structures", not marketing claims.
6. CTA Footer: install/run quickly with minimal setup.

## Final Copy (Production-Ready)

### Hero
- Eyebrow: `Desktop Workflow System`
- Headline: `Plan. Reuse. Execute.`
- Subhead: `BlueKit unifies Planner, Blocks, and Bookmarks so engineering work stays fast and grounded in your actual codebase.`
- Primary CTA: `Start in 5 Minutes`
- Secondary CTA: `See Architecture`

### Pillars
- Planner:
- `Turn scattered tasks into structured execution with linked plans, milestones, and drag-and-drop prioritization.`
- Blocks:
- `Store reusable implementation units, organize them by groups, and move proven building blocks across projects.`
- Bookmarks:
- `Pin high-value files into nested collections so context is one click away during deep work.`

### Workflow Story
- Title: `From Idea to Merged Code Without Context Loss`
- Steps:
- `Capture and prioritize work in Planner.`
- `Pull reusable implementation patterns from Blocks.`
- `Jump straight into critical files through Bookmarks.`
- `Execute in project context with watchers and typed IPC keeping views current.`

### Architecture Snapshot Copy
- `React + Chakra UI frontend`
- `Type-safe IPC layer`
- `Rust/Tauri command backend`
- `Filesystem watchers + artifact cache`
- `SQLite persistence at ~/.bluekit/bluekit.db`

### Trust Section
- Heading: `Evidence-Driven, Not Slideware`
- Body: `BlueKit behavior is defined by repository code paths: sidebar modes, feature flags, planner operations, block workflows, and bookmark reconciliation.`

### Footer CTA
- Heading: `Run It Locally Today`
- Steps:
- `npm install`
- `Set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY`
- `npm run tauri dev`
- Note: `Credential provisioning source is not documented in repo.`

## UX And Motion Specification
- Entry sequence:
- Hero fades in with 40ms stagger between eyebrow, headline, subhead, CTA.
- Pillar cards rise 8px with spring easing on scroll reveal.
- Architecture strip uses left-to-right line draw animation on first viewport entry.
- Interaction language:
- Card hover: 1px border brighten + subtle upward shift.
- CTA hover: amber glow ring and 120ms color transition.
- Respect reduced motion:
- Disable y-translation animations and replace with opacity-only transitions.

## Visual System Tokens
- Colors:
- `--bg-0: #f3f5fb`
- `--ink-900: #10223f`
- `--ink-700: #263d5b`
- `--line-200: #d6deec`
- `--accent-500: #f1a73a`
- `--accent-600: #e58f19`
- Typography:
- Display: `Fraunces` (700, 800)
- UI/body: `IBM Plex Sans` (400, 500, 600)
- Mono accents: `IBM Plex Mono` (500)
- Spacing scale (px):
- `8, 12, 16, 24, 32, 48, 64, 96`
- Radius:
- Cards `14px`, buttons `10px`
- Shadows:
- Card rest `0 2px 10px rgba(16,34,63,0.06)`
- Card hover `0 8px 28px rgba(16,34,63,0.12)`

## Responsive Behavior
- Desktop (`>=1200`):
- 12-column grid, hero split 7/5, pillar cards in 3 columns.
- Tablet (`768-1199`):
- 8-column grid, hero stacked, pillar cards in 2 columns then 1.
- Mobile (`<768`):
- Single-column stack, sticky CTA bar at bottom, reduced copy lengths.

## Implementation Blueprint (React + Chakra)
```tsx
export function LandingPage() {
  return (
    <Box bg="var(--bg-0)" color="var(--ink-900)">
      <LandingHero />
      <PillarsGrid />
      <WorkflowStory />
      <ArchitectureStrip />
      <TrustEvidence />
      <RunCta />
    </Box>
  );
}
```

## Component Contract
- `LandingHero`
- Props: `onPrimaryCta`, `onSecondaryCta`
- `PillarsGrid`
- Props: `items: {title: string; body: string; icon: ReactNode}[]`
- `WorkflowStory`
- Props: `steps: string[]`
- `ArchitectureStrip`
- Props: `nodes: string[]`
- `TrustEvidence`
- Props: `evidencePaths: string[]`
- `RunCta`
- Props: `commands: string[]`

## Chakra Styling Pattern
```tsx
const cardStyles = {
  bg: "white",
  border: "1px solid var(--line-200)",
  borderRadius: "14px",
  boxShadow: "0 2px 10px rgba(16,34,63,0.06)",
  _hover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 28px rgba(16,34,63,0.12)",
    borderColor: "var(--accent-500)",
  },
  transition: "all 160ms ease",
};
```

## Launch Checklist
- Copy accurately reflects current default navigation.
- Planner/Blocks/Bookmarks appear above fold.
- Extension features are labeled optional.
- All CTAs functional in desktop and mobile.
- Lighthouse targets:
- Performance `>= 90`
- Accessibility `>= 95`
- Best Practices `>= 90`

## Do Not Regress
- Do not pitch Kits/Walkthroughs/Agents/Diagrams as main experience.
- Do not use vague AI claims.
- Do not ship without reduced motion support.


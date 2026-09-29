import type { DemoDoc } from './DocView';
import type { NoteType } from './kit';

/** Sample notebook content shared by the demos: one believable team's work. */

export interface DemoContext {
  name: string;
  kind: 'build' | 'investigate' | 'series';
  docs: DemoDoc[];
  notes: { type: NoteType; title: string }[];
  tasks: { title: string; status: 'open' | 'in progress' | 'done' }[];
}

export const SPEC_DOC: DemoDoc = {
  name: 'new-flow-spec',
  folder: 'plan',
  title: 'New onboarding flow',
  tags: ['spec', 'onboarding', 'draft'],
  blocks: [
    { kind: 'p', text: 'Sign-up drops from five screens to three. Anonymous runs keep their referrer until the account exists; see [[referral-attribution]].' },
    { kind: 'h2', text: 'Flow' },
    {
      kind: 'table',
      head: ['Step', 'Screen', 'Owner'],
      rows: [
        ['1', 'Pick a template', 'Design'],
        ['2', 'Name the workspace', 'Web'],
        ['3', 'Invite the team', 'Web'],
      ],
    },
    { kind: 'callout', tone: 'question', text: 'Do trial users see the product tour twice if they skip step 3?' },
  ],
};

export const REFERENCE_DOC: DemoDoc = {
  name: 'stripe-webhooks',
  folder: 'context',
  title: 'Stripe webhooks',
  tags: ['reference', 'billing'],
  blocks: [
    { kind: 'p', text: 'Every event we handle, and what happens when it arrives twice. Handlers live in `billing/webhooks.ts`.' },
    {
      kind: 'table',
      head: ['Event', 'What we do'],
      rows: [
        ['`invoice.paid`', 'Extend the plan'],
        ['`charge.failed`', 'Retry in 24h, then email'],
        ['`customer.deleted`', 'Archive the workspace'],
      ],
    },
    { kind: 'code', lang: 'ts', lines: ['const key = `charge:${invoice.id}:${attempt}`;', 'await stripe.charges.create(params, {', '  idempotencyKey: key,', '});'] },
  ],
};

export const PLAN_DOC: DemoDoc = {
  name: 'checkout-plan',
  folder: 'plan',
  title: 'Checkout rebuild: plan',
  tags: ['implementation plan', 'checkout'],
  blocks: [
    { kind: 'p', text: 'Three phases, each shippable on its own. Builds on [[new-flow-spec]] and [[stripe-webhooks]].' },
    { kind: 'h2', text: 'Phases' },
    {
      kind: 'checks',
      items: [
        { text: 'Move pricing into one `plans` table', done: true },
        { text: 'New checkout page behind a flag', done: false },
        { text: 'Retire the old flow and its redirects', done: false },
      ],
    },
    { kind: 'code', lang: 'bash', lines: ['npm run migrate -- plans', 'FLAG_NEW_CHECKOUT=1 npm run dev'] },
  ],
};

const RETRY_DOC: DemoDoc = {
  name: 'retry-timeline',
  folder: 'discovery',
  title: 'Retry timeline',
  tags: ['investigation', 'billing'],
  blocks: [
    { kind: 'p', text: 'The double charges line up with the Friday retry batch. Two workers pick up the same invoice.' },
    { kind: 'steps', items: ['09:00 retry batch starts', '09:00:02 worker A charges', '09:00:03 worker B charges the same invoice'] },
    { kind: 'h2', text: 'Evidence' },
    {
      kind: 'table',
      head: ['Invoice', 'Charges', 'Workers'],
      rows: [
        ['`in_4f2a`', '2', 'A, B'],
        ['`in_7c91`', '2', 'A, C'],
      ],
    },
    { kind: 'callout', tone: 'note', text: 'Only invoices retried in the Friday batch are affected. Fix tracked in [[stripe-webhooks]].' },
  ],
};

const FIX_DOC: DemoDoc = {
  name: 'idempotency-fix',
  folder: 'conclusions',
  title: 'Fix: idempotency keys',
  tags: ['conclusion', 'billing'],
  blocks: [
    { kind: 'p', text: 'Every charge carries a key made from the invoice and the attempt, so a second worker can’t charge twice.' },
    { kind: 'checks', items: [{ text: 'Keys on every `charges.create`', done: true }, { text: 'Backfill refunds for the 14 doubles', done: false }] },
  ],
};

const Q3_DOC: DemoDoc = {
  name: '2026-09-22-planning',
  folder: 'sessions',
  title: 'Planning, Sept 22',
  tags: ['series', 'planning'],
  blocks: [
    { kind: 'p', text: 'Checkout ships before the pricing change. Onboarding follows once referrals are fixed.' },
    { kind: 'h2', text: 'Q3 order' },
    {
      kind: 'table',
      head: ['Ship', 'When', 'Context'],
      rows: [
        ['Checkout rebuild', 'Aug', '[[checkout-plan]]'],
        ['Pricing change', 'Sep', '[[pricing-page]]'],
        ['New onboarding', 'Oct', '[[new-flow-spec]]'],
      ],
    },
    { kind: 'checks', items: [{ text: 'Agree the Q3 order', done: true }, { text: 'Share it with support', done: false }] },
  ],
};

const Q3_EARLIER_DOC: DemoDoc = {
  name: '2026-09-15-planning',
  folder: 'sessions',
  title: 'Planning, Sept 15',
  tags: ['series', 'planning'],
  blocks: [
    { kind: 'p', text: 'Pricing can’t move until checkout is on the new flow. Billing bug first.' },
    { kind: 'steps', items: ['Fix the double charges', 'Ship checkout behind a flag', 'Then change pricing'] },
  ],
};

export const CONTEXTS: DemoContext[] = [
  {
    name: 'Onboarding redesign',
    kind: 'build',
    docs: [SPEC_DOC, PLAN_DOC],
    notes: [
      { type: 'decision', title: 'Keep referral codes for 30 days' },
      { type: 'flag', title: 'Anonymous-first can break attribution' },
      { type: 'question', title: 'Do trial users see the tour twice?' },
      { type: 'idea', title: 'Let invites skip the template step' },
    ],
    tasks: [
      { title: 'Stash the referrer on the device', status: 'done' },
      { title: 'Attach it at sign-up', status: 'in progress' },
      { title: 'Record the new flow for review', status: 'open' },
    ],
  },
  {
    name: 'Billing bug',
    kind: 'investigate',
    docs: [RETRY_DOC, REFERENCE_DOC, FIX_DOC],
    notes: [
      { type: 'question', title: 'Why do retries land twice on Fridays?' },
      { type: 'decision', title: 'Idempotency keys on every charge' },
      { type: 'idea', title: 'Replay failed events from the dashboard' },
    ],
    tasks: [
      { title: 'Reproduce the double charge', status: 'done' },
      { title: 'Add idempotency keys', status: 'in progress' },
    ],
  },
  {
    name: 'Q3 planning',
    kind: 'series',
    docs: [Q3_DOC, Q3_EARLIER_DOC],
    notes: [
      { type: 'decision', title: 'Checkout before the pricing change' },
      { type: 'flag', title: 'Support needs two weeks of notice' },
    ],
    tasks: [
      { title: 'Share the order with support', status: 'open' },
      { title: 'Book the October review', status: 'open' },
    ],
  },
];

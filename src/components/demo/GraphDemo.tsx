import { useMemo, useState } from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { DemoWindow, EASE_OUT_EXPO, MotionBox, ink, useAutoplay } from './kit';

// The app's context graph palette (contextGraphColors.dark in the BlueKit app).
const C = {
  status: {
    active: { fill: '#5B8DEF', glow: 'rgba(91,141,239,0.55)' },
    next: { fill: '#FBBF24', glow: 'rgba(251,191,36,0.45)' },
    completed: { fill: '#4ADE80', glow: 'rgba(74,222,128,0.45)' },
    archived: { fill: '#6B7280', glow: 'rgba(107,114,128,0.30)' },
  },
  group: { fill: '#C084FC', glow: 'rgba(192,132,252,0.50)' },
  membership: '#8A93A8',
  ring: 'rgba(255,255,255,0.85)',
  label: '#E6E8F0',
  labelMuted: '#9AA1B8',
  bgDot: 'rgba(255,255,255,0.05)',
  surface: 'rgba(20,22,32,0.82)',
  surfaceBorder: 'rgba(255,255,255,0.10)',
};

type Status = keyof typeof C.status;
const STATUS_LABEL: Record<Status, string> = { active: 'Active', next: 'Next', completed: 'Completed', archived: 'Archived' };

// Coordinate space of the canvas. The bottom-right corner stays clear for the node card.
const W = 1000;
const H = 560;

interface GContext {
  id: string;
  name: string;
  status: Status;
  about: string;
  docs: number;
  notes: number;
  tasks: number;
  x: number;
  y: number;
}

interface GGroup {
  id: string;
  name: string;
  about: string;
  x: number;
  y: number;
}

/** One membership, with the reason it exists: the thing a file-link graph can't tell you. */
interface GEdge {
  group: string;
  context: string;
  why: string;
}

const GROUPS: GGroup[] = [
  { id: 'growth', name: 'Growth', about: 'Everything that moves sign-ups.', x: 290, y: 215 },
  { id: 'payments', name: 'Payments', about: 'Money in, money out.', x: 610, y: 175 },
  { id: 'q3', name: 'Q3 launch', about: 'What has to ship before the August launch.', x: 450, y: 420 },
  { id: 'reliability', name: 'Reliability', about: "Things that must not break twice.", x: 850, y: 225 },
];

const CONTEXTS: GContext[] = [
  { id: 'onboarding', name: 'Onboarding redesign', status: 'active', about: 'Cut sign-up from five screens to three without losing attribution.', docs: 4, notes: 9, tasks: 4, x: 345, y: 330 },
  { id: 'referral', name: 'Referral program', status: 'active', about: 'Reward people who bring a friend, paid out monthly.', docs: 3, notes: 6, tasks: 3, x: 455, y: 110 },
  { id: 'oldsignup', name: 'Old sign-up flow', status: 'completed', about: 'The flow onboarding replaced. Kept for why it was built that way.', docs: 5, notes: 12, tasks: 0, x: 120, y: 145 },
  { id: 'emails', name: 'Activation emails', status: 'next', about: 'A three-email sequence for people who stall after sign-up.', docs: 1, notes: 3, tasks: 2, x: 140, y: 310 },
  { id: 'q3plan', name: 'Q3 planning', status: 'active', about: 'The plan everything in the launch rolls up to.', docs: 2, notes: 7, tasks: 5, x: 300, y: 490 },
  { id: 'pricing', name: 'Pricing page', status: 'next', about: 'New tiers and the paywall at the end of the funnel.', docs: 2, notes: 5, tasks: 3, x: 500, y: 270 },
  { id: 'checkout', name: 'Checkout rebuild', status: 'active', about: 'One page checkout with saved cards.', docs: 6, notes: 8, tasks: 6, x: 605, y: 345 },
  { id: 'billing', name: 'Billing bug', status: 'active', about: 'Some customers get charged twice on Fridays.', docs: 3, notes: 10, tasks: 2, x: 690, y: 235 },
  { id: 'webhooks', name: 'Webhook audit', status: 'completed', about: 'Found the retry race behind the double charges.', docs: 4, notes: 6, tasks: 0, x: 900, y: 120 },
  { id: 'invoices', name: 'Legacy invoices', status: 'archived', about: 'Shelved when the billing provider changed.', docs: 2, notes: 2, tasks: 0, x: 760, y: 75 },
];

const EDGES: GEdge[] = [
  { group: 'growth', context: 'onboarding', why: 'The sign-up funnel itself' },
  { group: 'growth', context: 'referral', why: "Grew out of onboarding's attribution flag" },
  { group: 'growth', context: 'oldsignup', why: 'The flow onboarding replaced' },
  { group: 'growth', context: 'emails', why: 'Picks up where onboarding drops people' },
  { group: 'growth', context: 'pricing', why: 'The paywall at the end of the funnel' },
  { group: 'payments', context: 'referral', why: 'Payouts to referrers' },
  { group: 'payments', context: 'pricing', why: 'Plan changes and upgrades' },
  { group: 'payments', context: 'checkout', why: 'Where people pay' },
  { group: 'payments', context: 'billing', why: 'Charges and retries' },
  { group: 'payments', context: 'invoices', why: 'The old invoicing path, parked' },
  { group: 'q3', context: 'q3plan', why: 'The plan these roll up to' },
  { group: 'q3', context: 'onboarding', why: 'Launches in August' },
  { group: 'q3', context: 'checkout', why: 'Ships before the pricing change' },
  { group: 'q3', context: 'billing', why: 'Has to be fixed before launch' },
  { group: 'reliability', context: 'billing', why: 'Double charges on Fridays' },
  { group: 'reliability', context: 'webhooks', why: 'Found the retry race' },
];

type Node = ({ kind: 'context' } & GContext) | ({ kind: 'group' } & GGroup);
const NODES: Node[] = [
  ...GROUPS.map((g) => ({ kind: 'group' as const, ...g })),
  ...CONTEXTS.map((c) => ({ kind: 'context' as const, ...c })),
];
const byId = new Map(NODES.map((n) => [n.id, n]));

/** What the demo plays through until someone hovers or clicks. */
const TOUR = ['billing', 'growth', 'oldsignup', 'payments', 'referral'];

function memberCount(groupId: string) {
  return EDGES.filter((e) => e.group === groupId).length;
}

/** Same sizing rule as the app: groups by membership, contexts by how much is in them. */
function radius(n: Node) {
  return n.kind === 'group' ? 11 + Math.min(memberCount(n.id), 12) * 0.7 : 6 + Math.min(n.docs + n.notes + n.tasks, 30) * 0.18;
}

function nodeFill(n: Node) {
  return n.kind === 'group' ? C.group : C.status[n.status];
}

/** An inert dot field behind the graph, like the app's constellation background. */
function useDots() {
  return useMemo(() => {
    let seed = 99;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 110 }, () => ({ x: rand() * W, y: rand() * H, r: rand() * 1.2 + 0.4, o: rand() * 0.5 + 0.3 }));
  }, []);
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Box>
      <Text fontSize="17px" fontWeight="700" lineHeight="1.1" style={{ color: C.label }}>{value}</Text>
      <Text fontSize="11px" style={{ color: C.labelMuted }}>{label}</Text>
    </Box>
  );
}

/** The node card, as the app shows it: name, status, description, counts, and every membership with its reason. */
function NodeCard({ node }: { node: Node }) {
  const fill = nodeFill(node);
  const rows =
    node.kind === 'group'
      ? EDGES.filter((e) => e.group === node.id).map((e) => ({ key: e.context, node: byId.get(e.context)!, why: e.why }))
      : EDGES.filter((e) => e.context === node.id).map((e) => ({ key: e.group, node: byId.get(e.group)!, why: e.why }));

  return (
    <MotionBox
      key={node.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      p="16px"
      borderRadius="14px"
      style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}`, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <HStack gap="9px" align="start" mb="8px">
        <Box w="11px" h="11px" mt="5px" borderRadius="full" flexShrink={0} style={{ background: fill.fill, boxShadow: `0 0 8px ${fill.glow}` }} />
        <Box minW={0}>
          <Text fontSize="15.5px" fontWeight="700" lineHeight="1.25" style={{ color: C.label }}>{node.name}</Text>
          <Text fontSize="10.5px" fontWeight="600" letterSpacing="0.05em" textTransform="uppercase" mt="2px" style={{ color: C.labelMuted }}>
            {node.kind === 'group' ? 'Group' : STATUS_LABEL[node.status]}
          </Text>
        </Box>
      </HStack>
      <Text fontSize="13px" lineHeight="1.5" mb="12px" style={{ color: C.labelMuted }}>{node.about}</Text>
      <HStack gap="18px" mb="12px">
        {node.kind === 'group' ? (
          <Stat label="contexts" value={rows.length} />
        ) : (
          <>
            <Stat label="docs" value={node.docs} />
            <Stat label="notes" value={node.notes} />
            <Stat label="tasks" value={node.tasks} />
            <Stat label="groups" value={rows.length} />
          </>
        )}
      </HStack>
      <Text fontSize="10.5px" fontWeight="600" letterSpacing="0.05em" textTransform="uppercase" mb="6px" style={{ color: C.labelMuted }}>
        {node.kind === 'group' ? 'Members' : 'Groups'}
      </Text>
      <VStack align="stretch" gap="5px">
        {rows.map((r) => (
          <HStack key={r.key} gap="8px" align="baseline" minW={0}>
            <Box w="6px" h="6px" borderRadius="full" flexShrink={0} transform="translateY(-1px)" style={{ background: nodeFill(r.node).fill }} />
            <Text fontSize="12.5px" lineHeight="1.45" style={{ color: C.labelMuted }}>
              <Text as="span" fontWeight="600" style={{ color: C.label }}>{r.node.name}</Text>
              {'  '}
              {r.why}
            </Text>
          </HStack>
        ))}
      </VStack>
    </MotionBox>
  );
}

/**
 * The context graph, drawn the way the app draws it: contexts as glowing dots
 * coloured by status, the groups they joined as larger purple nodes, one thin
 * line per membership. Hover or click a node to focus its neighbourhood; the
 * card shows why each membership exists. It tours a few nodes until touched.
 */
export function GraphDemo() {
  const tour = useAutoplay(TOUR.length, 3400);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const focusId = hover ?? pinned ?? TOUR[tour.step];
  const focus = byId.get(focusId)!;
  const dots = useDots();

  const neighbours = useMemo(() => {
    const set = new Set([focusId]);
    for (const e of EDGES) {
      if (e.group === focusId) set.add(e.context);
      if (e.context === focusId) set.add(e.group);
    }
    return set;
  }, [focusId]);

  const enter = (id: string) => { tour.touch(); setHover(id); };
  const pin = (id: string) => { tour.touch(); setPinned(id); };

  return (
    <DemoWindow
      innerRef={tour.ref}
      glow="rgba(192, 132, 252, 0.7)"
      bar={
        <HStack gap="8px">
          <Text fontSize="13px" fontWeight="600" style={{ color: ink.subtle }}>Context Graph</Text>
          <Text fontSize="12px" style={{ color: ink.faint }}>Acme notebook · {CONTEXTS.length} contexts · {GROUPS.length} groups</Text>
        </HStack>
      }
    >
      <Box position="relative">
        <Box overflowX="auto" css={{ scrollbarWidth: 'none' }}>
          <Box position="relative" minW="760px">
            <Box
              aria-hidden="true"
              position="absolute"
              inset="0"
              pointerEvents="none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)' }}
            />
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }} role="img" aria-label="A context graph: contexts joined to the groups they belong to">
              <defs>
                <filter id="demo-node-glow" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={C.bgDot} opacity={d.o} />
              ))}

              {EDGES.map((e) => {
                const a = byId.get(e.group)!;
                const b = byId.get(e.context)!;
                const on = e.group === focusId || e.context === focusId;
                return (
                  <line
                    key={`${e.group}-${e.context}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={C.membership}
                    strokeWidth={on ? 1.8 : 1}
                    strokeOpacity={on ? 0.85 : 0.2}
                    style={{ transition: 'stroke-opacity 0.3s ease, stroke-width 0.3s ease' }}
                  />
                );
              })}

              {NODES.map((n) => {
                const isFocus = n.id === focusId;
                const isGroup = n.kind === 'group';
                const near = neighbours.has(n.id);
                const fill = nodeFill(n);
                const r = radius(n) + (isFocus ? 6 : 0);
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x},${n.y})`}
                    opacity={near ? 1 : 0.42}
                    style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                    onMouseEnter={() => enter(n.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => pin(n.id)}
                  >
                    <circle r={r + 14} fill="transparent" />
                    {isFocus && <circle r={r + 8} fill="none" stroke={C.ring} strokeOpacity={0.5} strokeWidth={1} />}
                    <circle r={r} fill={fill.fill} filter="url(#demo-node-glow)" style={{ transition: 'r 0.25s ease' }} />
                    <circle r={r * 0.45} fill="#fff" opacity={isGroup ? 0.75 : 0.5} style={{ transition: 'r 0.25s ease' }} />
                    {isGroup && <circle r={r + 4} fill="none" stroke={fill.fill} strokeOpacity={0.45} strokeWidth={1} />}
                    <text
                      y={r + 17}
                      textAnchor="middle"
                      fontSize={isGroup || isFocus ? 14 : 12.5}
                      fontWeight={isGroup || isFocus ? 700 : 500}
                      fill={isGroup || isFocus ? C.label : C.labelMuted}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend, as in the app's toolbar. */}
            <HStack
              position="absolute"
              top="14px"
              left="14px"
              gap="2px"
              px="6px"
              h="32px"
              borderRadius="10px"
              pointerEvents="none"
              style={{ background: C.surface, border: `1px solid ${C.surfaceBorder}`, backdropFilter: 'blur(12px)' }}
            >
              {(Object.keys(C.status) as Status[]).map((s) => (
                <HStack key={s} gap="6px" px="8px">
                  <Box w="8px" h="8px" borderRadius="full" style={{ background: C.status[s].fill }} />
                  <Text fontSize="11px" fontWeight="600" style={{ color: C.labelMuted }}>{STATUS_LABEL[s]}</Text>
                </HStack>
              ))}
              <HStack gap="6px" px="8px">
                <Box w="8px" h="8px" borderRadius="full" style={{ background: C.group.fill }} />
                <Text fontSize="11px" fontWeight="600" style={{ color: C.labelMuted }}>Groups</Text>
              </HStack>
            </HStack>

            <Text
              position="absolute"
              bottom="14px"
              left="16px"
              fontSize="11px"
              letterSpacing="0.08em"
              textTransform="uppercase"
              pointerEvents="none"
              style={{ color: C.labelMuted }}
            >
              Acme · Context Graph
            </Text>
          </Box>
        </Box>

        {/* The node card: over the canvas from md up, below it on phones. */}
        <Box
          position={{ base: 'relative', md: 'absolute' }}
          right={{ md: '14px' }}
          bottom={{ md: '14px' }}
          w={{ base: 'auto', md: '350px' }}
          m={{ base: '12px', md: '0' }}
          pointerEvents="none"
        >
          <NodeCard key={focus.id} node={focus} />
        </Box>
      </Box>
    </DemoWindow>
  );
}

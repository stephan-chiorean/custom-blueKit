import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { DemoWindow, EASE_OUT_EXPO, MotionBox, ink, useAutoplay } from './kit';

// Coordinate space: x in percent of the graph's width, y in px.
const H = 360;
const LEFT_EDGE = 27; // left contexts end here
const GROUP_LEFT = 38;
const GROUP_RIGHT = 62;
const RIGHT_EDGE = 73; // right contexts start here
const ROW_Y = [45, 135, 225, 315];

interface MapContext {
  name: string;
  done?: boolean;
}

// Four contexts per side, left then right.
const CONTEXTS: MapContext[] = [
  { name: 'Onboarding redesign' },
  { name: 'Referral program' },
  { name: 'Old sign-up flow', done: true },
  { name: 'Q3 planning' },
  { name: 'Pricing page' },
  { name: 'Checkout rebuild' },
  { name: 'Billing bug' },
  { name: 'Webhook audit', done: true },
];

interface MapGroup {
  name: string;
  color: string;
  about: string;
  members: Record<number, string>;
}

const GROUPS: MapGroup[] = [
  {
    name: 'Growth',
    color: '#60a5fa',
    about: 'Everything that moves sign-ups.',
    members: {
      0: 'The sign-up funnel itself',
      1: "Grew out of onboarding's attribution flag",
      2: 'The flow onboarding replaced',
      4: 'The paywall at the end of the funnel',
    },
  },
  {
    name: 'Payments',
    color: '#c084fc',
    about: 'Money in, money out.',
    members: {
      4: 'Plan changes and upgrades',
      5: 'Where people pay',
      6: 'Charges and retries',
      1: 'Payouts to referrers',
    },
  },
  {
    name: 'Q3',
    color: '#4ade80',
    about: 'What ships this quarter.',
    members: {
      3: 'The plan these roll up to',
      0: 'Launches in August',
      5: 'Ships before the pricing change',
      6: 'Has to be fixed before launch',
    },
  },
  {
    name: 'Reliability',
    color: '#fbbf24',
    about: 'Things that must not break twice.',
    members: {
      6: 'Double charges on Fridays',
      7: 'Found the retry race',
    },
  },
];

type Focus = { kind: 'group'; index: number } | { kind: 'context'; index: number };

const side = (ci: number) => (ci < 4 ? 'left' : 'right');
const rowY = (ci: number) => ROW_Y[ci % 4];

function lit(focus: Focus, gi: number, ci: number): boolean {
  if (!(ci in GROUPS[gi].members)) return false;
  return focus.kind === 'group' ? focus.index === gi : focus.index === ci;
}

/**
 * The context map: contexts join groups, each membership saying why, one
 * context in several groups, finished work still on the map. Click a group or
 * a context; it plays through the groups until you do.
 */
export function MapDemo() {
  const play = useAutoplay(GROUPS.length, 3600);
  const [picked, setPicked] = useState<Focus | null>(null);
  const focus: Focus = picked ?? { kind: 'group', index: play.step };

  const choose = (next: Focus) => { play.touch(); setPicked(next); };
  const contextOn = (ci: number) => (focus.kind === 'context' ? focus.index === ci : ci in GROUPS[focus.index].members);
  const groupOn = (gi: number) => (focus.kind === 'group' ? focus.index === gi : focus.index in GROUPS[gi].members);
  const activeColor = focus.kind === 'group' ? GROUPS[focus.index].color : ink.accent;

  return (
    <DemoWindow
      innerRef={play.ref}
      glow="rgba(192, 132, 252, 0.7)"
      bar={
        <HStack gap="8px">
          <Text fontSize="13px" fontWeight="600" style={{ color: ink.subtle }}>Map</Text>
          <Text fontSize="12px" style={{ color: ink.faint }}>Acme notebook · {CONTEXTS.length} contexts · {GROUPS.length} groups</Text>
        </HStack>
      }
    >
      <Box overflowX="auto" css={{ scrollbarWidth: 'none' }}>
        <Box position="relative" h={`${H}px`} minW="680px" mx={{ base: '16px', md: '32px' }} mt="18px">
          <svg
            aria-hidden="true"
            viewBox={`0 0 100 ${H}`}
            preserveAspectRatio="none"
            width="100%"
            height={H}
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            {GROUPS.flatMap((g, gi) =>
              Object.keys(g.members).map(Number).map((ci) => {
                const on = lit(focus, gi, ci);
                const y1 = rowY(ci);
                const y2 = ROW_Y[gi];
                const [x1, x2] = side(ci) === 'left' ? [LEFT_EDGE, GROUP_LEFT] : [RIGHT_EDGE, GROUP_RIGHT];
                const mid = (x1 + x2) / 2;
                return (
                  <motion.path
                    key={`${gi}-${ci}`}
                    d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={false}
                    animate={{
                      stroke: on ? g.color : 'rgba(255,255,255,0.14)',
                      strokeWidth: on ? 2 : 1,
                      opacity: on ? 1 : CONTEXTS[ci].done ? 0.45 : 0.8,
                    }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  />
                );
              }),
            )}
          </svg>

          {CONTEXTS.map((c, ci) => {
            const on = contextOn(ci);
            const isLeft = side(ci) === 'left';
            return (
              <Box
                key={c.name}
                as="button"
                onClick={() => choose({ kind: 'context', index: ci })}
                aria-pressed={focus.kind === 'context' && focus.index === ci}
                position="absolute"
                left={isLeft ? '0' : `${RIGHT_EDGE}%`}
                w={`${LEFT_EDGE}%`}
                top={`${rowY(ci) - 18}px`}
                h="36px"
                px="12px"
                borderRadius="10px"
                cursor="pointer"
                transition="opacity 0.25s ease, border-color 0.25s ease, background 0.25s ease"
                style={{
                  opacity: on ? 1 : c.done ? 0.4 : 0.62,
                  background: on ? ink.raised : ink.surface,
                  border: `1px solid ${on ? activeColor : ink.line}`,
                }}
                _hover={{ opacity: 1 }}
              >
                <HStack gap="8px" justify={isLeft ? 'flex-end' : 'flex-start'} flexDirection={isLeft ? 'row' : 'row-reverse'}>
                  <Text fontSize="13px" fontWeight={on ? '600' : '500'} truncate style={{ color: c.done ? ink.subtle : ink.strong }}>
                    {c.name}
                  </Text>
                  {c.done ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-label="Completed" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="9" stroke={ink.subtle} strokeWidth="2" />
                      <path d="M8.5 12.2l2.4 2.4 4.6-5" stroke={ink.subtle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <Box w="7px" h="7px" borderRadius="full" flexShrink={0} style={{ background: '#4ade80' }} aria-label="Active" />
                  )}
                </HStack>
              </Box>
            );
          })}

          {GROUPS.map((g, gi) => {
            const on = groupOn(gi);
            return (
              <Box
                key={g.name}
                as="button"
                onClick={() => choose({ kind: 'group', index: gi })}
                aria-pressed={focus.kind === 'group' && focus.index === gi}
                position="absolute"
                left={`${GROUP_LEFT}%`}
                w={`${GROUP_RIGHT - GROUP_LEFT}%`}
                top={`${ROW_Y[gi] - 21}px`}
                h="42px"
                borderRadius="full"
                cursor="pointer"
                transition="background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease"
                style={{
                  background: on ? g.color : ink.surface,
                  color: on ? '#050d1f' : ink.strong,
                  border: `1px solid ${on ? g.color : ink.lineStrong}`,
                  boxShadow: on ? `0 8px 30px -8px ${g.color}` : 'none',
                }}
              >
                <HStack gap="8px" justify="center">
                  <Box w="7px" h="7px" borderRadius="full" style={{ background: on ? '#050d1f' : g.color }} />
                  <Text fontSize="14px" fontWeight="600">{g.name}</Text>
                  <Text fontSize="12.5px" style={{ opacity: 0.65 }}>{Object.keys(g.members).length}</Text>
                </HStack>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box px={{ base: '16px', md: '32px' }} pt="6px" pb="24px" minH="132px" style={{ borderTop: `1px solid ${ink.line}` }}>
        <AnimatePresence mode="wait" initial={false}>
          <MotionBox
            key={`${focus.kind}-${focus.index}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            pt="16px"
          >
            {focus.kind === 'group' ? (
              <VStack align="stretch" gap="8px">
                <Text fontSize="14.5px" style={{ color: ink.subtle }}>
                  <Text as="span" fontWeight="700" style={{ color: GROUPS[focus.index].color }}>{GROUPS[focus.index].name}.</Text>{' '}
                  {GROUPS[focus.index].about}
                </Text>
                <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} columnGap="28px" rowGap="6px">
                  {Object.entries(GROUPS[focus.index].members).map(([ci, why]) => (
                    <HStack key={ci} gap="8px" fontSize="13.5px" minW={0}>
                      <Text fontWeight="500" flexShrink={0} style={{ color: CONTEXTS[Number(ci)].done ? ink.subtle : ink.strong }}>
                        {CONTEXTS[Number(ci)].name}
                      </Text>
                      <Text truncate style={{ color: ink.faint }}>{why}</Text>
                    </HStack>
                  ))}
                </Box>
              </VStack>
            ) : (
              <Text fontSize="14.5px" lineHeight="1.6" style={{ color: ink.subtle }}>
                <Text as="span" fontWeight="700" style={{ color: ink.strong }}>{CONTEXTS[focus.index].name}</Text>
                {CONTEXTS[focus.index].done ? ' is complete, and still on the map. It sits in ' : ' sits in '}
                {GROUPS.flatMap((g, gi) => (focus.index in g.members ? [gi] : [])).map((gi, i, all) => (
                  <Text as="span" key={gi}>
                    <Text as="span" fontWeight="600" style={{ color: GROUPS[gi].color }}>{GROUPS[gi].name}</Text>
                    {i < all.length - 2 ? ', ' : i === all.length - 2 ? ' and ' : ''}
                  </Text>
                ))}
                .
              </Text>
            )}
          </MotionBox>
        </AnimatePresence>
      </Box>
    </DemoWindow>
  );
}

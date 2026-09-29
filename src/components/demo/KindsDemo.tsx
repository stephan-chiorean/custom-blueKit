import { AnimatePresence } from 'framer-motion';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { DemoWindow, EASE_OUT_EXPO, MotionBox, Segmented, ink } from './kit';

export type KindId = 'build' | 'investigate' | 'series' | 'custom';

export const KINDS: { id: KindId; name: string; line: string; color: string }[] = [
  { id: 'build', name: 'Build', line: 'You know what you’re making.', color: '#60a5fa' },
  { id: 'investigate', name: 'Investigate', line: 'You’re figuring something out.', color: '#c084fc' },
  { id: 'series', name: 'Series', line: 'It comes back every week.', color: '#4ade80' },
  { id: 'custom', name: 'Custom', line: 'Your own shape.', color: '#cbd5e1' },
];

/** The starting folders each kind creates, and what goes in each (as the skill files docs). */
const FOLDERS: Record<KindId, { name: string; role: string }[]> = {
  build: [
    { name: 'context', role: 'the ticket, spec or brief' },
    { name: 'plan', role: 'design docs and the implementation plan' },
    { name: 'review', role: 'verification and review notes' },
  ],
  investigate: [
    { name: 'context', role: 'the question and what’s known' },
    { name: 'discovery', role: 'findings, experiments, options' },
    { name: 'conclusions', role: 'answers and recommendations' },
  ],
  series: [
    { name: 'context', role: 'what the series is for' },
    { name: 'sessions', role: 'one doc per session, dated' },
    { name: 'takeaways', role: 'what builds up across sessions' },
  ],
  custom: [],
};

function FolderIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M3 7.5a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v7A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9Z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The New Context window: a name, a kind, and the folders that kind starts
 * with, growing in as the kind changes. `Kinds` owns the selection so its
 * cards and this switcher stay in step.
 */
export function KindsDemo({
  kind,
  onChoose,
  innerRef,
}: {
  kind: KindId;
  onChoose: (kind: KindId) => void;
  innerRef?: React.RefObject<HTMLDivElement>;
}) {
  const current = KINDS.find((k) => k.id === kind)!;
  const folders = FOLDERS[kind];

  return (
    <DemoWindow
      innerRef={innerRef}
      glow="rgba(74, 222, 128, 0.6)"
      bar={
        <Text fontSize="13px" fontWeight="600" style={{ color: ink.subtle }}>
          New context
        </Text>
      }
    >
      <VStack align="stretch" gap="18px" p={{ base: '18px', md: '26px' }}>
        <VStack align="stretch" gap="7px">
          <Text fontSize="12.5px" fontWeight="500" style={{ color: ink.subtle }}>Name</Text>
          <HStack h="42px" px="12px" borderRadius="10px" style={{ background: ink.surface, border: `1px solid ${ink.lineStrong}` }}>
            <Text fontSize="15px" fontWeight="500" style={{ color: ink.strong }}>Checkout redesign</Text>
            <Box as="span" display="inline-block" w="1.5px" h="18px" className="caret" style={{ background: ink.accentText }} />
          </HStack>
        </VStack>

        <VStack align="stretch" gap="7px">
          <Text fontSize="12.5px" fontWeight="500" style={{ color: ink.subtle }}>Kind</Text>
          <Segmented
            label="Context kind"
            layoutId="kinds-demo"
            value={kind}
            onChange={onChoose}
            options={KINDS.map((k) => ({
              id: k.id,
              label: (
                <>
                  <Box w="6px" h="6px" borderRadius="full" style={{ background: k.color }} />
                  {k.name}
                </>
              ),
            }))}
          />
        </VStack>

        <Box borderRadius="12px" p="14px" minH="162px" style={{ background: 'rgba(0,0,0,0.22)', border: `1px solid ${ink.line}` }}>
          <HStack gap="8px" mb="10px">
            <FolderIcon color={current.color} />
            <Text fontSize="13.5px" fontWeight="600" style={{ color: ink.strong }}>checkout-redesign/</Text>
          </HStack>
          <AnimatePresence mode="wait" initial={false}>
            <MotionBox key={kind} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
              {folders.length === 0 ? (
                <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Text pl="23px" fontSize="13.5px" lineHeight="1.6" style={{ color: ink.subtle }}>
                    Starts empty. Add the folders your work needs.
                  </Text>
                </MotionBox>
              ) : (
                <VStack align="stretch" gap="8px" pl="12px" style={{ borderLeft: `1px solid ${ink.line}` }} ml="7px">
                  {folders.map((f, i) => (
                    <MotionBox
                      key={f.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.05 + i * 0.08 }}
                    >
                      <HStack gap="8px" align="baseline">
                        <FolderIcon color={ink.subtle} />
                        <Text fontSize="13.5px" fontWeight="500" flexShrink={0} style={{ color: ink.text }}>{f.name}/</Text>
                        <Text fontSize="12.5px" truncate style={{ color: ink.faint }}>{f.role}</Text>
                      </HStack>
                    </MotionBox>
                  ))}
                </VStack>
              )}
            </MotionBox>
          </AnimatePresence>
        </Box>

        <Text fontSize="12.5px" style={{ color: ink.subtle }}>
          Your agent files new docs into these folders by what they are.
        </Text>
      </VStack>
    </DemoWindow>
  );
}

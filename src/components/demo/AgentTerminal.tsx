import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { EASE_OUT_EXPO, MotionBox, useInView, usePrefersReducedMotion } from './kit';

/** The Agents section's accent: what BlueKit itself writes shows in magenta. */
export const AGENT_ACCENT = '#e879f9';
const BLUEKIT_BLUE = '#60a5fa';

type Line = { text: string; tone?: 'dim' | 'write' | 'ask' };
/**
 * `phase` is the loop step a line belongs to (0 create, 1 connect, 2 build,
 * 3 close out), so the loop section can light up the step being played.
 */
type Step =
  | { kind: 'you'; text: string; phase: number }
  | { kind: 'agent'; lead: string; lines?: Line[]; phase: number }
  | { kind: 'gap'; text: string; phase: number };

/** One context's whole life: create it, connect, build it together, close it out. */
const SCRIPT: Step[] = [
  { kind: 'you', phase: 0, text: '/bluekit create a build context for the referral rework in the Cadence notebook' },
  {
    kind: 'agent',
    phase: 0,
    lead: 'Created Referral rework.',
    lines: [{ text: '+ context/   plan/   review/', tone: 'write' }],
  },
  { kind: 'gap', phase: 1, text: 'next morning, new session' },
  { kind: 'you', phase: 1, text: '/bluekit connect to referral rework' },
  { kind: 'agent', phase: 1, lead: 'Connected to Referral rework.', lines: [{ text: '1 doc · 2 notes · 0 tasks', tone: 'dim' }] },
  { kind: 'you', phase: 2, text: 'draft a plan from the ticket' },
  { kind: 'agent', phase: 2, lead: 'Wrote the plan.', lines: [{ text: '+ plan/referral-plan.md', tone: 'write' }] },
  { kind: 'you', phase: 2, text: 'keep referral codes for 30 days. log that' },
  { kind: 'agent', phase: 2, lead: 'Logged it.', lines: [{ text: '+ decision  Keep referral codes for 30 days', tone: 'write' }] },
  { kind: 'you', phase: 2, text: 'track the plan as tasks' },
  {
    kind: 'agent',
    phase: 2,
    lead: 'Added 2 tasks.',
    lines: [
      { text: '+ task  Attach the referrer at sign-up', tone: 'write' },
      { text: '+ task  Add a referral expiry test', tone: 'write' },
    ],
  },
  { kind: 'gap', phase: 3, text: 'two weeks later' },
  { kind: 'you', phase: 3, text: 'both shipped. close out the context' },
  {
    kind: 'agent',
    phase: 3,
    lead: 'Completed Referral rework.',
    lines: [
      { text: '✓ 2 tasks done · plan, decision and notes kept', tone: 'write' },
      { text: 'It stays in your notebook, on the map.', tone: 'ask' },
    ],
  },
];

/** How many loop steps the script plays through. */
export const LOOP_PHASES = 4;

const TYPE_MS = 24;
const THINK_MS = 650;
const AFTER_AGENT_MS = 900;
const GAP_MS = 1100;

/** `/bluekit` in the skill's blue; the rest of a prompt in plain white. */
function PromptText({ text }: { text: string }) {
  if (!text.startsWith('/bluekit')) return <>{text}</>;
  return (
    <>
      <Text as="span" style={{ color: BLUEKIT_BLUE }}>{text.slice(0, 8)}</Text>
      {text.slice(8)}
    </>
  );
}

function Caret() {
  return <Box as="span" display="inline-block" w="8px" h="15px" ml="2px" verticalAlign="text-bottom" className="caret" style={{ background: 'rgba(255,255,255,0.7)' }} />;
}

function Prompt({ children }: { children: ReactNode }) {
  return (
    <Text fontFamily="mono" fontSize={{ base: '12.5px', md: '13.5px' }} lineHeight="1.6" color="white">
      <Box as="span" mr="10px" style={{ color: 'rgba(255,255,255,0.4)' }}>›</Box>
      {children}
    </Text>
  );
}

/** A quiet divider for time passing between sessions. */
function Gap({ text }: { text: string }) {
  return (
    <HStack gap="12px" my="4px" fontFamily="mono" fontSize="11.5px" style={{ color: 'rgba(255,255,255,0.32)' }}>
      <Box flex="1" h="1px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <Text>{text}</Text>
      <Box flex="1" h="1px" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </HStack>
  );
}

/**
 * A coding agent session with the BlueKit skill, played out: it starts blank
 * and runs one context's whole life (create, connect, build together, close
 * out). Plays once when it scrolls into view; Replay runs it again. With
 * reduced motion the whole session shows at once. `onPhase` reports the loop
 * step being played: -1 before it starts, LOOP_PHASES once it's done.
 */
export function AgentTerminal({ onPhase }: { onPhase?: (phase: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as RefObject<HTMLElement>);
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0); // steps fully shown
  const [typed, setTyped] = useState(0); // chars of the current prompt
  const [thinking, setThinking] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  useEffect(() => {
    if (reduced) {
      setStep(SCRIPT.length);
      return;
    }
    if (!started || step >= SCRIPT.length) return;
    const current = SCRIPT[step];
    if (current.kind === 'you') {
      if (typed < current.text.length) {
        // A beat before each prompt: longer after the agent answers, so it reads.
        const firstDelay = step === 0 ? 600 : AFTER_AGENT_MS;
        const t = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? firstDelay : TYPE_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { setStep((s) => s + 1); setTyped(0); }, 380);
      return () => clearTimeout(t);
    }
    if (current.kind === 'gap') {
      const t = setTimeout(() => setStep((s) => s + 1), GAP_MS);
      return () => clearTimeout(t);
    }
    setThinking(true);
    const t = setTimeout(() => {
      setThinking(false);
      setStep((s) => s + 1);
    }, THINK_MS);
    return () => clearTimeout(t);
  }, [started, step, typed, reduced]);

  const done = step >= SCRIPT.length;
  const current = SCRIPT[step];
  const replay = () => { setStep(0); setTyped(0); setThinking(false); };

  const phase = done ? LOOP_PHASES : started ? current.phase : -1;
  useEffect(() => {
    onPhase?.(phase);
  }, [phase, onPhase]);

  return (
    <Box
      ref={ref}
      position="relative"
      borderRadius="16px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.1)"
      bg="rgba(4, 9, 22, 0.94)"
      boxShadow={`0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px ${AGENT_ACCENT}14`}
    >
      <HStack px="16px" h="40px" borderBottom="1px solid rgba(255,255,255,0.07)" gap="8px">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <Box key={c} w="11px" h="11px" borderRadius="full" style={{ background: c, opacity: 0.85 }} />
        ))}
        <Text ml="10px" fontFamily="mono" fontSize="12px" color="rgba(255,255,255,0.45)">
          ~/code/cadence-app — your agent
        </Text>
        {done && !reduced && (
          <Box
            as="button"
            onClick={replay}
            ml="auto"
            fontFamily="mono"
            fontSize="12px"
            px="10px"
            h="24px"
            borderRadius="6px"
            cursor="pointer"
            style={{ color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}
            _hover={{ color: 'white' }}
          >
            Replay
          </Box>
        )}
      </HStack>

      <VStack align="stretch" gap="10px" px={{ base: '16px', md: '22px' }} py={{ base: '18px', md: '22px' }} minH={{ base: '600px', md: '640px' }}>
        {SCRIPT.slice(0, step).map((s, i) =>
          s.kind === 'gap' ? (
            <Gap key={i} text={s.text} />
          ) : s.kind === 'you' ? (
            <Box key={i} mt={i === 0 ? 0 : '6px'}>
              <Prompt><PromptText text={s.text} /></Prompt>
            </Box>
          ) : (
            <MotionBox key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}>
              <Text fontFamily="mono" fontSize={{ base: '12.5px', md: '13.5px' }} lineHeight="1.6" color="rgba(255,255,255,0.88)">
                <Box as="span" mr="10px" style={{ color: AGENT_ACCENT }}>⏺</Box>
                {s.lead}
              </Text>
              {s.lines?.map((line, j) => (
                <MotionBox
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.12 + j * 0.12 }}
                >
                  <Text
                    pl="22px"
                    fontFamily="mono"
                    fontSize={{ base: '12px', md: '13px' }}
                    lineHeight="1.7"
                    whiteSpace="pre"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    mt={line.tone === 'ask' ? '8px' : 0}
                    style={{
                      color:
                        line.tone === 'write' ? AGENT_ACCENT : line.tone === 'ask' ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {line.text}
                  </Text>
                </MotionBox>
              ))}
            </MotionBox>
          ),
        )}

        {!done && current.kind === 'you' && (
          <Box mt={step === 0 ? 0 : '6px'}>
            <Prompt>
              <PromptText text={current.text.slice(0, typed)} />
              <Caret />
            </Prompt>
          </Box>
        )}
        {!done && current.kind === 'gap' && <Gap text={current.text} />}
        {!done && thinking && (
          <Text fontFamily="mono" fontSize={{ base: '12.5px', md: '13.5px' }} style={{ color: 'rgba(255,255,255,0.45)' }}>
            <Box as="span" mr="10px" className="caret" style={{ color: AGENT_ACCENT }}>⏺</Box>
            Working…
          </Text>
        )}
        {done && (
          <Box mt="6px">
            <Prompt><Caret /></Prompt>
          </Box>
        )}
      </VStack>
    </Box>
  );
}

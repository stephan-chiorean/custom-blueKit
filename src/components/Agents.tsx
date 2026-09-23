import { Box, Container, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { Point, SectionHeading } from './SectionHeading';

type Line =
  | { kind: 'you'; text: string }
  | { kind: 'agent'; text: string }
  | { kind: 'out'; text: string; tone?: 'dim' | 'blue' | 'green' | 'violet' | 'amber' };

const session: Line[] = [
  { kind: 'you', text: 'connect to the onboarding redesign context' },
  { kind: 'agent', text: 'BlueKit connected context: Onboarding Redesign' },
  { kind: 'out', text: 'Project: Cadence · Kind: build', tone: 'dim' },
  { kind: 'out', text: 'Docs 4 · Notes 9 · Tasks 10', tone: 'dim' },
  { kind: 'out', text: '[urgent] Fix referral attribution for anonymous runs', tone: 'amber' },
  { kind: 'out', text: '[flag] Anonymous-first can break referral attribution', tone: 'violet' },
  { kind: 'you', text: 'fix the referral bug, then log what you decided' },
  { kind: 'agent', text: 'Reading new-flow-spec and the open flag first…' },
  { kind: 'out', text: '✓ Referrer is stashed on device, attached at sign-up', tone: 'green' },
  { kind: 'out', text: '+ [decision] Keep referral codes for 30 days → decisions', tone: 'blue' },
  { kind: 'out', text: '✓ Task "Fix referral attribution" → completed', tone: 'green' },
];

const toneColor: Record<string, string> = {
  dim: 'rgba(255,255,255,0.45)',
  blue: '#93c5fd',
  green: '#86efac',
  violet: '#c4b5fd',
  amber: '#fcd34d',
};

function Terminal() {
  return (
    <Box
      position="relative"
      borderRadius="16px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.1)"
      bg="rgba(4, 9, 22, 0.94)"
      boxShadow="0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(66,135,245,0.06)"
    >
      <HStack px="16px" h="40px" borderBottom="1px solid rgba(255,255,255,0.07)" gap="8px">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <Box key={c} w="11px" h="11px" borderRadius="full" style={{ background: c, opacity: 0.85 }} />
        ))}
        <Text ml="10px" fontFamily="mono" fontSize="12px" color="rgba(255,255,255,0.45)">
          ~/projects/cadence — your agent
        </Text>
      </HStack>

      <VStack align="stretch" gap="7px" px={{ base: '16px', md: '22px' }} py={{ base: '18px', md: '22px' }}>
        {session.map((line, i) => {
          const delay = { transitionDelay: `${0.15 + i * 0.14}s` };
          if (line.kind === 'you') {
            return (
              <Text
                key={i}
                className="reveal"
                style={delay}
                mt={i === 0 ? 0 : '12px'}
                fontFamily="mono"
                fontSize={{ base: '12.5px', md: '13.5px' }}
                color="white"
              >
                <Box as="span" color="primary.400" mr="10px">
                  ›
                </Box>
                {line.text}
              </Text>
            );
          }
          if (line.kind === 'agent') {
            return (
              <Text key={i} className="reveal" style={delay} fontFamily="mono" fontSize={{ base: '12.5px', md: '13.5px' }} color="rgba(255,255,255,0.88)">
                <Box as="span" color="#4ade80" mr="10px">
                  ⏺
                </Box>
                {line.text}
              </Text>
            );
          }
          return (
            <Text
              key={i}
              className="reveal"
              style={{ ...delay, color: toneColor[line.tone ?? 'dim'] }}
              pl="22px"
              fontFamily="mono"
              fontSize={{ base: '12px', md: '13px' }}
            >
              {line.text}
            </Text>
          );
        })}
        <Box className="reveal" style={{ transitionDelay: `${0.15 + session.length * 0.14}s` }} mt="12px">
          <Box as="span" display="inline-block" w="8px" h="15px" bg="primary.400" className="caret" />
        </Box>
      </VStack>
    </Box>
  );
}

const agents = ['Claude Code', 'Codex', 'Cursor'];

export function Agents() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="agents" ref={ref} py={{ base: '64px', md: '112px' }} scrollMarginTop="72px">
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Grid
          templateColumns={{ base: '1fr', lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }}
          gap={{ base: '44px', lg: '64px' }}
          alignItems="center"
        >
          <VStack align="start" gap="28px" className="reveal">
            <SectionHeading
              eyebrow="Agents"
              accent="#fcd34d"
              title="Your agent works inside the context."
              body="Tell your coding agent which context you're in. It reads the docs, notes, and tasks before it starts, and writes back what it did when you ask: a decision logged, a task closed, a doc in the right folder."
            />
            <VStack align="start" gap="12px">
              <Point accent="#fcd34d">
                <b>One sentence to connect.</b> No setup per session, no pasting context into chat.
              </Point>
              <Point accent="#fcd34d">
                <b>You stay the editor.</b> The agent only writes when you ask, and every change shows up in the app.
              </Point>
              <Point accent="#fcd34d">
                <b>Several at once.</b> Open two contexts, or contexts from different projects, in the same session.
              </Point>
            </VStack>
            <HStack gap="8px" flexWrap="wrap">
              <Text fontSize="13px" color="rgba(255,255,255,0.5)" mr="4px">
                Works with
              </Text>
              {agents.map((a) => (
                <Box
                  key={a}
                  px="12px"
                  py="5px"
                  borderRadius="full"
                  border="1px solid rgba(252, 211, 77, 0.25)"
                  bg="rgba(252, 211, 77, 0.06)"
                  fontSize="13px"
                  color="rgba(255,255,255,0.82)"
                  fontWeight="500"
                >
                  {a}
                </Box>
              ))}
            </HStack>
            <Text fontSize="13.5px" color="rgba(255,255,255,0.5)" lineHeight="1.6" maxW="480px">
              The BlueKit skill installs from inside the app with one click.
            </Text>
          </VStack>

          <Box className="reveal" style={{ transitionDelay: '0.1s' }}>
            <Terminal />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

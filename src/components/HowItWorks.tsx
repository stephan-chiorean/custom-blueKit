import { useState } from 'react';
import { Box, Container, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import { AGENT_ACCENT, AgentTerminal } from './demo/AgentTerminal';

const agents = ['Claude Code', 'Codex', 'Cursor'];

const steps = [
  {
    title: 'Create a context',
    description: 'One for each new thread of work. It starts with folders that fit the kind of work it is.',
  },
  {
    title: 'Connect your agent',
    description: 'One sentence, in any session. Your agent reads the docs, notes and tasks before it starts.',
  },
  {
    title: 'Build it together',
    description:
      'Write docs, log notes and decisions, and create tasks as you go. The agent writes only when you ask, and every change shows up in the app.',
  },
  {
    title: 'Close it out',
    description: 'Complete the context when the work is done. It stays in your notebook, decisions and all.',
  },
];

/**
 * The loop at the heart of BlueKit, told next to a live agent session that
 * plays it out. The step the session is on lights up as it plays.
 */
export function HowItWorks() {
  const ref = useReveal<HTMLElement>();
  const [phase, setPhase] = useState(-1);

  return (
    <Box as="section" id="how" ref={ref} pt={{ base: '72px', md: '120px' }} pb={{ base: '64px', md: '112px' }} scrollMarginTop="72px">
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Grid
          templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }}
          gap={{ base: '44px', lg: '64px' }}
          alignItems="center"
        >
          <VStack align="start" gap="32px" className="reveal">
            <SectionHeading
              eyebrow="How it works"
              accent={AGENT_ACCENT}
              title="A new way of working with AI."
              body="Every thread of work gets its own context. You and your agent build it up together, session after session, and close it out when the work is done."
            />

            <VStack as="ol" align="stretch" gap="4px" w="100%" m="0" p="0" style={{ listStyle: 'none' }}>
              {steps.map((step, i) => {
                const active = i === phase;
                const reached = i <= phase;
                return (
                  <HStack
                    as="li"
                    key={step.title}
                    align="start"
                    gap="16px"
                    px="16px"
                    py="14px"
                    borderRadius="12px"
                    transition="background 0.35s ease, border-color 0.35s ease"
                    style={{
                      background: active ? 'rgba(232, 121, 249, 0.07)' : 'transparent',
                      border: `1px solid ${active ? 'rgba(232, 121, 249, 0.28)' : 'transparent'}`,
                    }}
                  >
                    <Text
                      fontFamily="mono"
                      fontSize="13px"
                      fontWeight="600"
                      lineHeight="1.7"
                      flexShrink={0}
                      transition="color 0.35s ease"
                      style={{ color: reached ? AGENT_ACCENT : 'rgba(255,255,255,0.35)' }}
                    >
                      0{i + 1}
                    </Text>
                    <Box>
                      <Text color="white" fontSize="17px" fontWeight="600" lineHeight="1.4">
                        {step.title}
                      </Text>
                      <Text mt="4px" color="rgba(255,255,255,0.62)" fontSize="15px" lineHeight="1.6">
                        {step.description}
                      </Text>
                    </Box>
                  </HStack>
                );
              })}
            </VStack>

            <VStack align="start" gap="12px">
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
                    border="1px solid rgba(232, 121, 249, 0.28)"
                    bg="rgba(232, 121, 249, 0.07)"
                    fontSize="13px"
                    color="rgba(255,255,255,0.82)"
                    fontWeight="500"
                  >
                    {a}
                  </Box>
                ))}
              </HStack>
              <Text fontSize="13.5px" color="rgba(255,255,255,0.5)" lineHeight="1.6" maxW="480px">
                The BlueKit skill installs from inside the app with one click.{' '}
                <a href="/agent-guide" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  See agent tips
                </a>
              </Text>
            </VStack>
          </VStack>

          <Box className="reveal" style={{ transitionDelay: '0.1s' }}>
            <AgentTerminal onPhase={setPhase} />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

import { Box, Container, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { Point, SectionHeading } from './SectionHeading';
import { AGENT_ACCENT, AgentTerminal } from './demo/AgentTerminal';

const agents = ['Claude Code', 'Codex', 'Cursor'];

export function Agents() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="agents" ref={ref} pt={{ base: '40px', md: '56px' }} pb={{ base: '64px', md: '112px' }} scrollMarginTop="72px">
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Grid
          templateColumns={{ base: '1fr', lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }}
          gap={{ base: '44px', lg: '64px' }}
          alignItems="center"
        >
          <VStack align="start" gap="28px" className="reveal">
            <SectionHeading
              eyebrow="Agents"
              accent={AGENT_ACCENT}
              title="Your agent works inside the context."
              body="Tell your coding agent which context you're in. It reads the docs, notes, and tasks before it starts, and writes back what it did when you ask: a decision logged, a task closed, a doc in the right folder."
            />
            <VStack align="start" gap="12px">
              <Point accent={AGENT_ACCENT}>
                <b>One sentence to connect.</b> No setup per session, no pasting context into chat.
              </Point>
              <Point accent={AGENT_ACCENT}>
                <b>You stay in control.</b> The agent only writes when you ask, and every change shows up in the app.
              </Point>
              <Point accent={AGENT_ACCENT}>
                <b>Work in parallel.</b> Connect to multiple contexts across multiple notebooks in the same session.
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
              The BlueKit skill installs from inside the app with one click.
            </Text>
          </VStack>

          <Box className="reveal" style={{ transitionDelay: '0.1s' }}>
            <AgentTerminal />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

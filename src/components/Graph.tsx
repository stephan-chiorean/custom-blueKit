import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import { GraphDemo } from './demo/GraphDemo';

const graphNotes = [
  { title: 'Groups you name', text: 'Contexts join the groups you make. One context can sit in several.' },
  { title: 'Every line has a reason', text: 'Each membership says why it belongs and what it grew out of.' },
  { title: 'Status at a glance', text: "Colour shows what's active, next, done or shelved. Finished work keeps its place." },
];

/**
 * The context graph, right after the loop. The contrast is with file-link
 * graphs: this one draws the work you chose to connect, not every link.
 */
export function Graph() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="graph" ref={ref} pt={{ base: '24px', md: '40px' }} pb={{ base: '56px', md: '96px' }} scrollMarginTop="72px">
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <VStack align="stretch" gap={{ base: '36px', md: '48px' }}>
          <Box className="reveal">
            <SectionHeading
              eyebrow="Context graph"
              accent="#c084fc"
              align="center"
              title="Connect your contexts."
              body="Build a context graph that means something to you."
            />
          </Box>

          <Box className="reveal" style={{ transitionDelay: '0.08s' }} position="relative">
            <Box
              aria-hidden="true"
              position="absolute"
              inset="-8% 10%"
              filter="blur(90px)"
              borderRadius="full"
              style={{ background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.22), transparent 70%)' }}
            />
            <Box position="relative">
              <GraphDemo />
            </Box>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={{ base: '18px', md: '28px' }}>
            {graphNotes.map((n, i) => (
              <Box key={n.title} className="reveal" style={{ transitionDelay: `${0.12 + i * 0.07}s` }}>
                <Text color="white" fontWeight="600" fontSize="16px">
                  {n.title}
                </Text>
                <Text mt="6px" color="rgba(255,255,255,0.6)" fontSize="15px" lineHeight="1.6">
                  {n.text}
                </Text>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}

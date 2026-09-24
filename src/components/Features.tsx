import { Box, Container, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { Point, SectionHeading } from './SectionHeading';
import { Shot } from './Shot';

function Contexts() {
  return (
    <Grid
      id="contexts"
      templateColumns={{ base: '1fr', lg: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' }}
      gap={{ base: '44px', lg: '64px' }}
      alignItems="center"
      scrollMarginTop="96px"
    >
      <VStack align="start" gap="28px" className="reveal">
        <SectionHeading
          eyebrow="Contexts"
          title="One tab for every thread of work."
          body="A context gathers everything about one piece of work: the docs you're reading, what you've decided, what's still open, and what's left to do. Switch between them like browser tabs. When the work is done, close it out."
        />
        <VStack align="start" gap="12px">
          <Point>
            <b>Docs are linked, never copied.</b> They stay plain markdown in your project, and one doc can live in
            several contexts.
          </Point>
          <Point>
            <b>Typed notes</b> for decisions, questions, insights, ideas, and risks. Each one says what's true now,
            not what happened.
          </Point>
          <Point>
            <b>Tasks</b> in lists, right next to the work they belong to.
          </Point>
          <Point>
            <b>It ends.</b> Complete a context with a short retro and it leaves your working set. The record stays.
          </Point>
        </VStack>
      </VStack>

      {/* Layered composition: the context's tasks behind, the context list in front */}
      <Box position="relative" className="reveal" style={{ transitionDelay: '0.1s' }} pb={{ base: '0', md: '64px' }}>
        <Shot
          src="/shots/context-tasks.webp"
          alt="Tasks inside a BlueKit context, grouped into Build and Ship lists"
          width={1482}
          height={1130}
          w={{ base: '100%', md: '76%' }}
          ml="auto"
          opacity={{ base: 1, md: 0.9 }}
        />
        <Shot
          src="/shots/context-list.webp"
          alt="The context list: Onboarding Redesign, Churn Investigation, Apple Watch App, and more"
          width={938}
          height={830}
          display={{ base: 'none', md: 'block' }}
          position="absolute"
          left="0"
          top="64px"
          w="50%"
          glow="rgba(167, 139, 250, 0.7)"
          boxShadow="0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)"
        />
      </Box>
    </Grid>
  );
}

const kinds = [
  { name: 'Build', line: 'You know what you’re making.', color: '#60a5fa' },
  { name: 'Investigate', line: 'You’re figuring something out.', color: '#c084fc' },
  { name: 'Series', line: 'It comes back every week.', color: '#4ade80' },
  { name: 'Custom', line: 'Your own shape.', color: '#cbd5e1' },
];

function Kinds() {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' }}
      gap={{ base: '44px', lg: '64px' }}
      alignItems="center"
    >
      <Box order={{ base: 1, lg: 0 }} className="reveal" style={{ transitionDelay: '0.1s' }}>
        <Shot
          src="/shots/context-kinds.webp"
          alt="The New Context dialog with Build, Investigate, Series, and Custom"
          width={1068}
          height={650}
          glow="rgba(74, 222, 128, 0.6)"
        />
      </Box>

      <VStack align="start" gap="28px" className="reveal">
        <SectionHeading
          eyebrow="Context kinds"
          accent="#4ade80"
          title="Start with the right shape."
          body="Building something and figuring something out are different kinds of work. Pick one and the context starts with folders that fit it. Your agent works differently in each one, too."
        />
        <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap="10px" w="100%">
          {kinds.map((k) => (
            <Box
              key={k.name}
              px="16px"
              py="14px"
              borderRadius="12px"
              border="1px solid rgba(255,255,255,0.08)"
              bg="rgba(255,255,255,0.03)"
            >
              <HStack gap="8px">
                <Box w="7px" h="7px" borderRadius="full" style={{ background: k.color }} />
                <Text color="white" fontWeight="600" fontSize="15px">
                  {k.name}
                </Text>
              </HStack>
              <Text mt="4px" color="rgba(255,255,255,0.6)" fontSize="14px" lineHeight="1.5">
                {k.line}
              </Text>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Grid>
  );
}

const mapNotes = [
  { title: 'Groups, not folders', text: 'A context can belong to several groups. Each membership says why it belongs.' },
  { title: 'Finished work stays', text: 'Completed and archived contexts keep their place, so the history is visible.' },
  { title: 'Jump straight in', text: 'Click any context on the map to open it where you left off.' },
];

function ContextMap() {
  return (
    <VStack id="map" align="stretch" gap={{ base: '36px', md: '48px' }} scrollMarginTop="96px">
      <Box className="reveal">
        <SectionHeading
          eyebrow="Context map"
          accent="#c084fc"
          align="center"
          title="See how the work connects."
          body="Contexts join groups, and the map draws the whole project at once: what's active, what's done, and what grew out of what."
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
        <Shot
          src="/shots/context-map.webp"
          alt="The context map: 25 contexts connected through 7 groups"
          width={1728}
          height={1084}
          glow="rgba(192, 132, 252, 0.7)"
        />
      </Box>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={{ base: '18px', md: '28px' }}>
        {mapNotes.map((n, i) => (
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
  );
}

export function Features() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="features" ref={ref} py={{ base: '56px', md: '88px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <VStack align="stretch" gap={{ base: '104px', md: '160px' }}>
          <Contexts />
          <Kinds />
          <ContextMap />
        </VStack>
      </Container>
    </Box>
  );
}

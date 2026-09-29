import { Box, Container, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './SectionHeading';
import { KINDS, KindsDemo, type KindId } from './demo/KindsDemo';
import { MapDemo } from './demo/MapDemo';
import { useAutoplay } from './demo/kit';

function Kinds() {
  const play = useAutoplay(KINDS.length, 2800);
  const kind = KINDS[play.step].id;
  const choose = (id: KindId) => {
    play.touch();
    play.setStep(KINDS.findIndex((k) => k.id === id));
  };

  return (
    <Grid
      id="contexts"
      scrollMarginTop="96px"
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' }}
      gap={{ base: '44px', lg: '64px' }}
      alignItems="center"
    >
      <Box order={{ base: 1, lg: 0 }} className="reveal" style={{ transitionDelay: '0.1s' }}>
        <KindsDemo kind={kind} onChoose={choose} innerRef={play.ref} />
      </Box>

      <VStack align="start" gap="28px" className="reveal">
        <SectionHeading
          eyebrow="Context kinds"
          accent="#4ade80"
          title="Start with the right shape."
          body="Building something and figuring something out are different kinds of work. Pick one and the context starts with folders that fit it. Your agent works differently in each one, too."
        />
        <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap="10px" w="100%">
          {KINDS.map((k) => {
            const active = k.id === kind;
            return (
              <Box
                key={k.id}
                as="button"
                onClick={() => choose(k.id)}
                aria-pressed={active}
                textAlign="left"
                px="16px"
                py="14px"
                borderRadius="12px"
                cursor="pointer"
                transition="border-color 0.2s ease, background 0.2s ease"
                style={{
                  border: `1px solid ${active ? k.color : 'rgba(255,255,255,0.08)'}`,
                  background: active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                }}
                _hover={{ background: 'rgba(255,255,255,0.05)' }}
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
            );
          })}
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
          body="Contexts join groups, and the map draws the whole notebook at once: what's active, what's done, and what grew out of what."
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
          <MapDemo />
        </Box>
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
          <Kinds />
          <ContextMap />
        </VStack>
      </Container>
    </Box>
  );
}

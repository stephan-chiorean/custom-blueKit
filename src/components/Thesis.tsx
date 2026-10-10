import { Box, Container, Grid, Text } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { Point } from './SectionHeading';

const roles = [
  { who: 'You', line: 'remember the shape.', detail: 'What exists, where it belongs, how it connects.' },
  { who: 'BlueKit', line: 'remembers the state.', detail: 'What was decided, what’s still open, what comes next.' },
];

/** What "the rest" is, each in the colour of what it touches (question, flag, doc, task). */
const rest = [
  { title: 'Closes your questions.', text: 'Settle something and the open question becomes the decision.', color: '#fbbf24' },
  { title: 'Catches what no longer fits.', text: 'When a decision undercuts a task, a note or a doc, it offers the fix.', color: '#f87171' },
  { title: 'Writes the walkthrough.', text: "Ask how you'll build it and the plan lands as a doc in the context.", color: '#c084fc' },
  { title: 'Spins up the work.', text: 'Follow-ups become tasks the moment they come up.', color: '#4ade80' },
];

export function Thesis() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="thesis" ref={ref} pt={{ base: '72px', md: '120px' }} pb={{ base: '8px', md: '16px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Text
          as="h2"
          className="reveal"
          color="white"
          fontSize={{ base: '34px', md: '52px', lg: '64px' }}
          fontWeight="700"
          lineHeight="1.04"
          letterSpacing="-0.03em"
          maxW="1000px"
        >
          You can’t hold every thread at once.{' '}
          <Box as="span" color="rgba(255,255,255,0.42)">
            You shouldn’t have to.
          </Box>
        </Text>

        <Text
          className="reveal"
          mt={{ base: '20px', md: '28px' }}
          color="rgba(255,255,255,0.66)"
          fontSize={{ base: '17px', md: '19px' }}
          lineHeight="1.65"
          maxW="680px"
          style={{ transitionDelay: '0.06s' }}
        >
          BlueKit keeps the state of each thread of work, so you can put one down, pick up another, and come back
          to exactly where you left off.
        </Text>

        <Grid
          className="reveal"
          mt={{ base: '40px', md: '56px' }}
          templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
          gap={{ base: '24px', md: '32px' }}
          maxW="980px"
          mx="auto"
          style={{ transitionDelay: '0.12s' }}
        >
          {roles.map((r) => (
            <Box key={r.who} borderTop="1px solid rgba(255,255,255,0.12)" pt="18px" textAlign="center">
              <Text color="white" fontSize={{ base: '20px', md: '22px' }} fontWeight="600" letterSpacing="-0.01em">
                <Box as="span" color="primary.400">
                  {r.who}
                </Box>{' '}
                {r.line}
              </Text>
              <Text mt="8px" color="rgba(255,255,255,0.55)" fontSize="15px" lineHeight="1.6">
                {r.detail}
              </Text>
            </Box>
          ))}
        </Grid>

        {/* The agent's part gets its own line, bigger: it's what makes the context stay true. */}
        <Box
          className="reveal"
          mt={{ base: '44px', md: '56px' }}
          maxW="980px"
          mx="auto"
          style={{ transitionDelay: '0.18s' }}
        >
          <Text
            as="h3"
            color="white"
            fontSize={{ base: '30px', md: '40px', lg: '46px' }}
            fontWeight="700"
            lineHeight="1.08"
            letterSpacing="-0.025em"
            textAlign="center"
          >
            <Box as="span" color="primary.400">
              Agents
            </Box>{' '}
            handle the rest.
          </Text>
          <Text mt={{ base: '12px', md: '14px' }} color="rgba(255,255,255,0.66)" fontSize={{ base: '17px', md: '19px' }} lineHeight="1.6" textAlign="center">
            They keep the context in line with the work as it moves.
          </Text>

          <Grid
            mt={{ base: '28px', md: '36px' }}
            templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0, 1fr))' }}
            columnGap={{ base: '24px', md: '32px' }}
            rowGap={{ base: '12px', md: '16px' }}
          >
            {rest.map((r) => (
              <Point key={r.title} accent={r.color}>
                <b>{r.title}</b> {r.text}
              </Point>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

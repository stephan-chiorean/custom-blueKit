import { Box, Container, Grid, Text } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';

const roles = [
  { who: 'You', line: 'remember the shape.', detail: 'What exists, where it belongs, how it connects.' },
  { who: 'BlueKit', line: 'remembers the state.', detail: 'What was decided, what’s still open, what comes next.' },
  { who: 'AI', line: 'handles the details.', detail: 'Reads what it needs and writes back what it did.' },
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
          templateColumns={{ base: '1fr', md: 'repeat(3, minmax(0, 1fr))' }}
          gap={{ base: '24px', md: '32px' }}
          style={{ transitionDelay: '0.12s' }}
        >
          {roles.map((r) => (
            <Box key={r.who} borderTop="1px solid rgba(255,255,255,0.12)" pt="18px">
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
      </Container>
    </Box>
  );
}

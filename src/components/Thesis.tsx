import { Box, Container, Grid, Text } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';

const threads = [
  { label: 'Decided', text: 'What was decided, and why.' },
  { label: 'Open', text: 'What is still unresolved, and who it waits on.' },
  { label: 'Changed', text: 'What your agent did while you were looking elsewhere.' },
];

export function Thesis() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="why" ref={ref} pt={{ base: '72px', md: '120px' }} pb={{ base: '40px', md: '64px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Box className="reveal" display="flex" alignItems="center" gap="10px" mb="22px">
          <Box w="18px" h="1px" bg="primary.400" />
          <Text fontFamily="mono" fontSize="12px" fontWeight="600" letterSpacing="0.16em" textTransform="uppercase" color="primary.400">
            Why BlueKit
          </Text>
        </Box>

        <Text
          as="h2"
          className="reveal"
          color="white"
          fontSize={{ base: '34px', md: '52px', lg: '64px' }}
          fontWeight="700"
          lineHeight="1.04"
          letterSpacing="-0.03em"
          maxW="1000px"
          style={{ transitionDelay: '0.06s' }}
        >
          AI can do the work now.{' '}
          <Box as="span" color="rgba(255,255,255,0.42)">
            Keeping up with it is the hard part.
          </Box>
        </Text>

        <Text
          className="reveal"
          mt={{ base: '22px', md: '28px' }}
          color="rgba(255,255,255,0.66)"
          fontSize={{ base: '17px', md: '19px' }}
          lineHeight="1.65"
          maxW="720px"
          style={{ transitionDelay: '0.12s' }}
        >
          Agents write the code, run the tests, and draft the docs. What they can't do is hold the thread
          for you. When the work moves faster than you can follow it, your understanding becomes the
          bottleneck. BlueKit is where you keep it.
        </Text>

        <Grid
          mt={{ base: '40px', md: '56px' }}
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap="1px"
          borderRadius="18px"
          overflow="hidden"
          border="1px solid rgba(255,255,255,0.08)"
          bg="rgba(255,255,255,0.08)"
        >
          {threads.map((t, i) => (
            <Box
              key={t.label}
              className="reveal"
              bg="rgba(7, 15, 34, 0.92)"
              px={{ base: '22px', md: '28px' }}
              py={{ base: '22px', md: '30px' }}
              style={{ transitionDelay: `${0.16 + i * 0.08}s` }}
            >
              <Text fontFamily="mono" fontSize="12px" letterSpacing="0.14em" textTransform="uppercase" color="primary.400">
                {String(i + 1).padStart(2, '0')} · {t.label}
              </Text>
              <Text mt="10px" color="white" fontSize={{ base: '18px', md: '20px' }} fontWeight="600" lineHeight="1.35">
                {t.text}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

import { Box, Container, Text } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';

export function Thesis() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="why" ref={ref} pt={{ base: '72px', md: '120px' }} pb={{ base: '8px', md: '16px' }}>
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

      </Container>
    </Box>
  );
}

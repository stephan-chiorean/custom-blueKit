import { Box, Container, HStack, Link, Text, VStack } from '@chakra-ui/react';

export function Community() {
  return (
    <Box as="section" id="community" pt={{ base: '70px', md: '96px' }} pb={{ base: '70px', md: '96px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Box
          bg="rgba(255, 255, 255, 0.04)"
          border="1px solid rgba(255, 255, 255, 0.08)"
          borderRadius="20px"
          p={{ base: '24px', md: '34px' }}
          style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
        >
          <VStack align="start" gap="12px">
            <Text fontSize="20px" fontWeight="700" letterSpacing="0.13em" textTransform="uppercase" color="primary.500" fontFamily="mono">
              Community
            </Text>
            <Text as="h2" color="white" fontSize={{ base: '30px', md: '40px' }} letterSpacing="-0.02em" lineHeight="1.08">
              Build better systems with other BlueKit users.
            </Text>
            <Text color="text.secondary" fontSize="15.5px" lineHeight="1.75" maxW="780px">
              Share workflows, compare block libraries, and swap practical implementation patterns with teams who run local-first.
            </Text>
            <HStack gap="10px" flexWrap="wrap" pt="6px">
              <Link href="#" px="14px" py="8px" borderRadius="10px" border="1px solid rgba(66, 135, 245, 0.35)" color="primary.300" _hover={{ textDecoration: 'none', bg: 'rgba(66, 135, 245, 0.14)', color: 'white' }}>
                Join Discord
              </Link>
              <Link href="#" px="14px" py="8px" borderRadius="10px" border="1px solid rgba(255,255,255,0.15)" color="rgba(255,255,255,0.8)" _hover={{ textDecoration: 'none', bg: 'rgba(255,255,255,0.08)', color: 'white' }}>
                GitHub
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

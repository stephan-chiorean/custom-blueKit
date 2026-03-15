import { Box, Container, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function Hero() {
  return (
    <Box as="section" id="top" pt={{ base: '108px', md: '138px' }} pb={{ base: '30px', md: '54px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <VStack align="stretch" gap={{ base: '26px', md: '34px' }}>
          <VStack align="start" gap="0" maxW="760px" className="hero-reveal" style={{ animationDelay: '0.06s' }}>
            <Text
              as="h1"
              color="white"
              fontWeight="700"
              fontSize={{ base: '56px', md: '78px', lg: '96px' }}
              letterSpacing="-0.032em"
              lineHeight="0.94"
              textAlign="left"
            >
              Control your context.
            </Text>

            <Text
              mt={{ base: '18px', md: '22px' }}
              color="rgba(255,255,255,0.74)"
              fontSize={{ base: '32px', md: '50px' }}
              lineHeight={{ base: '1.17', md: '1.12' }}
              letterSpacing="-0.015em"
              textAlign="left"
              maxW="980px"
            >
              The local-first notebook for planning, understanding, and high-context coding.
            </Text>
          </VStack>

          <HStack
            className="hero-reveal"
            style={{ animationDelay: '0.18s' }}
            gap={{ base: '12px', md: '18px' }}
            align="center"
            flexWrap="wrap"
          >
            <Link
              href="https://pub-bbfe77b031cf40df8b49f3dcd9f96d78.r2.dev/bluekit-app_0.1.0_aarch64.dmg"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              bg="primary.500"
              color="white"
              borderRadius="12px"
              px={{ base: '18px', md: '26px' }}
              py={{ base: '12px', md: '14px' }}
              fontSize={{ base: '15px', md: '16px' }}
              fontWeight="600"
              transition="background 0.2s, transform 0.2s, box-shadow 0.2s"
              _hover={{
                bg: 'primary.600',
                transform: 'translateY(-2px)',
                boxShadow: '0 14px 36px rgba(66, 135, 245, 0.35)',
                textDecoration: 'none',
              }}
            >
              <AppleIcon />
              <Text>Download for macOS</Text>
            </Link>

            <Link
              href="#how"
              color="primary.300"
              fontSize={{ base: '16px', md: '17px' }}
              fontWeight="600"
              _hover={{ color: 'white', textDecoration: 'none' }}
            >
              See how it works
            </Link>
          </HStack>

          <Box
            className="hero-reveal"
            style={{
              animationDelay: '0.26s',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            borderRadius={{ base: '18px', md: '24px' }}
            overflow="hidden"
            border="1px solid rgba(255, 255, 255, 0.09)"
            bg="rgba(255,255,255,0.03)"
            boxShadow="0 30px 90px rgba(0,0,0,0.45)"
            position="relative"
          >
            <Image
              src="/app-panel.png"
              alt="BlueKit app interface"
              w="100%"
              h="auto"
              display="block"
            />
            <Box
              position="absolute"
              inset={0}
              pointerEvents="none"
              background="linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0.22) 100%)"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

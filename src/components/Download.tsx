import { Box, Container, Link, Text, VStack } from '@chakra-ui/react';

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function Download() {
  return (
    <Box as="section" id="download" pt={{ base: '70px', md: '118px' }} pb={{ base: '80px', md: '128px' }}>
      <Container maxW="1160px" px={{ base: '20px', md: '32px' }}>
        <Box
          maxW="620px"
          mx="auto"
          p={{ base: '52px 24px', md: '68px 48px' }}
          borderRadius="24px"
          textAlign="center"
          bg="rgba(255, 255, 255, 0.04)"
          border="1px solid rgba(255, 255, 255, 0.08)"
          position="relative"
          overflow="hidden"
          transition="border-color 0.25s, transform 0.25s, box-shadow 0.25s"
          style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
          _before={{
            content: '""',
            position: 'absolute',
            top: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '55%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(66, 135, 245, 0.65), transparent)',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% -10%, rgba(66, 135, 245, 0.09) 0%, transparent 58%)',
            pointerEvents: 'none',
          }}
          _hover={{
            borderColor: 'rgba(66, 135, 245, 0.30)',
            transform: 'translateY(-3px)',
            boxShadow: '0 16px 44px rgba(0, 0, 0, 0.28)',
          }}
        >
          <VStack position="relative" zIndex={1} gap="12px">
            <Text as="h2" fontSize="clamp(26px, 4vw, 40px)" fontWeight="700" lineHeight="1.1" letterSpacing="-0.02em">
              Built for Mac.
              <br />
              Works offline.
            </Text>

            <Text color="fg.muted" fontSize="16px" mb="14px">
              Free download. No account required.
            </Text>

            <Link
              href="https://pub-bbfe77b031cf40df8b49f3dcd9f96d78.r2.dev/bluekit-app_0.1.0_aarch64.dmg"
              display="inline-flex"
              alignItems="center"
              gap="9px"
              bg="primary.500"
              color="white"
              borderRadius="14px"
              px="36px"
              py="15px"
              fontSize="16px"
              fontWeight="600"
              letterSpacing="-0.015em"
              transition="background 0.2s, transform 0.2s, box-shadow 0.2s"
              _hover={{
                bg: 'primary.600',
                transform: 'translateY(-2px)',
                boxShadow: '0 14px 44px rgba(66, 135, 245, 0.42), 0 0 0 1px rgba(66, 135, 245, 0.28)',
                textDecoration: 'none',
              }}
            >
              <AppleIcon />
              <Text>Download for macOS</Text>
            </Link>

            <Text mt="6px" color="text.tertiary" fontSize="13.5px">
              macOS 12+ · Apple Silicon & Intel · ~15 MB
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

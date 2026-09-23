import { Box, Container, Grid, Link, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import { DMG_URL, VERSION } from '../release';


function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const principles = [
  {
    title: 'On your machine',
    text: 'Contexts, notes, and tasks live in a local database. No account, no cloud, nothing leaves your laptop.',
  },
  {
    title: 'Markdown you own',
    text: 'Docs are plain files in your project, versioned with git and readable in any editor.',
  },
  {
    title: 'Free for individuals',
    text: 'The whole app, for one person, at no cost. That’s not a trial.',
  },
];

export function Download() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" id="download" ref={ref} pt={{ base: '48px', md: '72px' }} pb={{ base: '80px', md: '128px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={{ base: '24px', md: '36px' }}
          mb={{ base: '64px', md: '96px' }}
          pt={{ base: '40px', md: '56px' }}
          borderTop="1px solid rgba(255,255,255,0.07)"
        >
          {principles.map((p, i) => (
            <Box key={p.title} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <Text color="white" fontSize="17px" fontWeight="600">
                {p.title}
              </Text>
              <Text mt="8px" color="rgba(255,255,255,0.6)" fontSize="15px" lineHeight="1.65">
                {p.text}
              </Text>
            </Box>
          ))}
        </Grid>

        <Box
          className="reveal"
          maxW="640px"
          mx="auto"
          p={{ base: '52px 24px', md: '68px 48px' }}
          borderRadius="24px"
          textAlign="center"
          bg="rgba(255, 255, 255, 0.04)"
          border="1px solid rgba(255, 255, 255, 0.08)"
          position="relative"
          overflow="hidden"
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
            background: 'radial-gradient(ellipse at 50% -10%, rgba(66, 135, 245, 0.1) 0%, transparent 58%)',
            pointerEvents: 'none',
          }}
        >
          <VStack position="relative" zIndex={1} gap="12px">
            <Text as="h2" color="white" fontSize="clamp(28px, 4vw, 42px)" fontWeight="700" lineHeight="1.1" letterSpacing="-0.02em">
              Open your first context.
            </Text>

            <Text color="rgba(255,255,255,0.64)" fontSize="16px" mb="14px" maxW="420px">
              Free download for Mac. It updates itself, and your agent can connect the same day.
            </Text>

            <Link
              href={DMG_URL}
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

            <Text mt="6px" color="rgba(255,255,255,0.45)" fontSize="13.5px" fontFamily="mono">
              {VERSION ? `v${VERSION} · ` : ''}macOS · Apple Silicon
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

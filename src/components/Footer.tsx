import { Text, VStack } from '@chakra-ui/react';

export function Footer() {
  return (
    <VStack
      as="footer"
      position="relative"
      zIndex={1}
      borderTop="1px solid rgba(255, 255, 255, 0.05)"
      px={{ base: '16px', md: '32px' }}
      pt="34px"
      pb="44px"
      gap="8px"
    >
      <Text color="rgba(255,255,255,0.42)" fontSize="13px" textAlign="center">
        © 2026 BlueKit · Built for humans. ·{' '}
        <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          Privacy
        </a>
      </Text>
    </VStack>
  );
}

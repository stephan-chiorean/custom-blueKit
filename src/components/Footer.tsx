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
      <Text color="text.tertiary" fontSize="13px" textAlign="center">
        © 2026 BlueKit · Built for humans.
      </Text>
    </VStack>
  );
}

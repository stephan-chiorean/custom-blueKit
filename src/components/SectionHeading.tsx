import { Box, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'start' | 'center';
  accent?: string;
}

export function SectionHeading({ eyebrow, title, body, align = 'start', accent = '#60a5fa' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <VStack align={centered ? 'center' : 'start'} gap="14px" textAlign={centered ? 'center' : 'left'}>
      <Box display="inline-flex" alignItems="center" gap="10px">
        <Box w="18px" h="1px" style={{ background: accent }} />
        <Text
          fontFamily="mono"
          fontSize="12px"
          fontWeight="600"
          letterSpacing="0.16em"
          textTransform="uppercase"
          style={{ color: accent }}
        >
          {eyebrow}
        </Text>
      </Box>
      <Text
        as="h2"
        color="white"
        fontSize={{ base: '32px', md: '42px', lg: '48px' }}
        fontWeight="700"
        lineHeight="1.06"
        letterSpacing="-0.025em"
        maxW="640px"
      >
        {title}
      </Text>
      {body && (
        <Text color="rgba(255,255,255,0.66)" fontSize={{ base: '16px', md: '17px' }} lineHeight="1.7" maxW="560px">
          {body}
        </Text>
      )}
    </VStack>
  );
}

/** Short checklist line used under feature headings. */
export function Point({ children, accent = '#60a5fa' }: { children: ReactNode; accent?: string }) {
  return (
    <Box display="flex" gap="12px" alignItems="baseline">
      <Box
        flexShrink={0}
        w="6px"
        h="6px"
        borderRadius="full"
        transform="translateY(-2px)"
        style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
      />
      <Text color="rgba(255,255,255,0.78)" fontSize="15.5px" lineHeight="1.65">
        {children}
      </Text>
    </Box>
  );
}

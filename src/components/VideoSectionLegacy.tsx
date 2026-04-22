import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';
import { BsClipboard2CheckFill, BsMapFill, BsBoxFill, BsBookmarkFill } from 'react-icons/bs';
import type { IconType } from 'react-icons';

const features: {
  title: string;
  body: string;
  icon: IconType;
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
}[] = [
  {
    title: 'Tasks',
    body: 'Track everything you need to do, scoped to the project you\'re in. No separate tool, no context switch.',
    icon: BsClipboard2CheckFill,
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.08)',
    border: 'rgba(96, 165, 250, 0.15)',
    hoverBorder: 'rgba(96, 165, 250, 0.4)',
  },
  {
    title: 'Maps',
    body: 'Build interactive panels that map your thoughts, questions, and objectives across groups of context notes.',
    icon: BsMapFill,
    color: '#CD853F',
    bg: 'rgba(205, 133, 63, 0.08)',
    border: 'rgba(205, 133, 63, 0.15)',
    hoverBorder: 'rgba(205, 133, 63, 0.4)',
  },
  {
    title: 'Blocks',
    body: 'Capture reusable context containers and pull them into any project instantly.',
    icon: BsBoxFill,
    color: '#c084fc',
    bg: 'rgba(168, 85, 247, 0.08)',
    border: 'rgba(168, 85, 247, 0.15)',
    hoverBorder: 'rgba(168, 85, 247, 0.4)',
  },
  {
    title: 'Markers',
    body: 'Flag notes and resources with lightweight markers so the files that matter are always visible at a glance.',
    icon: BsBookmarkFill,
    color: '#FA745A',
    bg: 'rgba(250, 116, 90, 0.08)',
    border: 'rgba(250, 116, 90, 0.15)',
    hoverBorder: 'rgba(250, 116, 90, 0.4)',
  },
];

export function VideoSectionLegacy() {
  return (
    <Box as="section" id="features" pt={{ base: '44px', md: '78px' }} pb={{ base: '72px', md: '108px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <VStack align="start" gap="12px" mb={{ base: '24px', md: '30px' }}>
          <Text
            fontSize="20px"
            fontWeight="700"
            letterSpacing="0.13em"
            textTransform="uppercase"
            color="primary.500"
            fontFamily="mono"
          >
            Features
          </Text>
          <Text as="h2" color="white" fontSize={{ base: '32px', md: '44px' }} letterSpacing="-0.02em" lineHeight="1.05">
            Built for real engineering workflows.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, minmax(0,1fr))', lg: 'repeat(4, minmax(0,1fr))' }} gap="14px">
          {features.map((feature, index) => (
            <Box
              key={feature.title}
              className="reveal in"
              style={{ transitionDelay: `${0.08 + index * 0.08}s` }}
              bg={feature.bg}
              border={`1px solid ${feature.border}`}
              borderRadius="16px"
              p={{ base: '20px', md: '24px' }}
              transition="border-color 0.2s, transform 0.2s, box-shadow 0.2s"
              _hover={{
                borderColor: feature.hoverBorder,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 32px color-mix(in srgb, ${feature.color} 12%, transparent)`,
              }}
              display="flex"
              flexDirection="column"
            >
              <Box
                w="40px"
                h="40px"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb="16px"
                bg={`color-mix(in srgb, ${feature.color} 15%, transparent)`}
                color={feature.color}
              >
                <feature.icon size={20} />
              </Box>
              <Text color="white" fontSize="20px" fontWeight="600" mb="8px" letterSpacing="-0.015em">
                {feature.title}
              </Text>
              <Text color="rgba(255,255,255,0.58)" fontSize="15px" lineHeight="1.72" flex="1">
                {feature.body}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

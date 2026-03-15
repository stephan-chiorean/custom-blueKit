import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';

const features = [
  {
    title: 'Planner',
    body: 'Turn rough ideas into clear plans with milestones and task flow that stays connected to your repo.',
  },
  {
    title: 'Blocks',
    body: 'Capture proven implementation patterns and reuse them across projects without losing context.',
  },
  {
    title: 'Bookmarks',
    body: 'Pin critical files and folders so high-value context is always one click away during execution.',
  },
];

export function VideoSection() {
  return (
    <Box as="section" id="features" pt={{ base: '44px', md: '78px' }} pb={{ base: '72px', md: '108px' }}>
      <Container maxW="1280px" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <VStack align="start" gap="12px" mb={{ base: '24px', md: '30px' }}>
          <Text
            fontSize="11.5px"
            fontWeight="700"
            letterSpacing="0.13em"
            textTransform="uppercase"
            color="primary.500"
            fontFamily="mono"
          >
            Features
          </Text>
          <Text as="h2" color="white" fontSize={{ base: '32px', md: '44px' }} letterSpacing="-0.02em" lineHeight="1.05">
            Built for real engineering workflow.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, minmax(0,1fr))' }} gap="14px">
          {features.map((feature, index) => (
            <Box
              key={feature.title}
              className="reveal in"
              style={{ transitionDelay: `${0.08 + index * 0.08}s` }}
              bg="rgba(255, 255, 255, 0.04)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              borderRadius="16px"
              p={{ base: '20px', md: '24px' }}
              transition="border-color 0.2s, transform 0.2s"
              _hover={{ borderColor: 'rgba(66, 135, 245, 0.35)', transform: 'translateY(-2px)' }}
            >
              <Text color="white" fontSize="22px" fontWeight="600" mb="8px" letterSpacing="-0.015em">
                {feature.title}
              </Text>
              <Text color="text.secondary" fontSize="15px" lineHeight="1.72">
                {feature.body}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

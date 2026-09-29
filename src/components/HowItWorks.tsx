import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';
import { useReveal } from '../hooks/useReveal';
import type { ReactNode } from 'react';

type Step = {
  number: string;
  title: string;
  description: ReactNode;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    number: '01',
    title: 'Create a notebook',
    description:
      'A notebook is a folder of plain markdown for one stream of work. Link the repos it spans, and open them straight from the notebook.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 7.5a1.5 1.5 0 0 1 1.5-1.5H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v7A1.5 1.5 0 0 1 19.5 18h-15A1.5 1.5 0 0 1 3 16.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Start a context',
    description:
      'Name a piece of work and pick its kind. Link the docs that matter, and add notes and tasks as you go. Group related contexts to see how the work connects.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8h8M8 11.5h8M8 15h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Connect your agent',
    description: (
      <>
        Install the BlueKit skill once from the app. Then, from any repo in Claude Code, Codex, or Cursor, say{' '}
        <Text
          as="code"
          fontFamily="mono"
          fontSize="12px"
          color="primary.300"
          bg="rgba(66, 135, 245, 0.1)"
          px="6px"
          py="2px"
          borderRadius="4px"
        >
          /bluekit connect to the auth context in the Acme notebook
        </Text>
        . It reads the context before it starts, and adds notes and tasks when you ask.
      </>
    ),
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 17l6-5-6-5M12 19h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Close it out',
    description:
      'When the work is done, complete the context. It leaves your tabs, and everything in it stays in the notebook.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <Box as="section" id="how" pt={{ base: '70px', md: '96px' }} pb={{ base: '80px', md: '96px' }} ref={sectionRef}>
      <Container maxW="1160px" px={{ base: '20px', md: '32px' }}>
        <VStack gap="12px" maxW="2xl" mx="auto" textAlign="center" mb={{ base: '56px', md: '64px' }}>
          <Text
            fontSize="12px"
            fontWeight="600"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="primary.400"
            fontFamily="mono"
          >
            How it works
          </Text>
          <Text as="h2" color="white" fontSize={{ base: '32px', md: '42px', lg: '48px' }} fontWeight="700" lineHeight="1.06" letterSpacing="-0.025em">
            Four steps to your first <Box as="span" color="primary.500">context</Box>.
          </Text>
          <Text color="rgba(255,255,255,0.66)" fontSize={{ base: '16px', md: '17px' }}>
            No account needed. The first step takes a minute.
          </Text>
        </VStack>

        <Box maxW="896px" mx="auto" position="relative">
          <Box
            aria-hidden="true"
            display={{ base: 'none', md: 'block' }}
            position="absolute"
            top="0"
            bottom="0"
            left="50%"
            transform="translateX(-50%)"
            w="1px"
            bg="linear-gradient(180deg, rgba(66, 135, 245, 0.95) 0%, rgba(6, 182, 212, 0.55) 52%, rgba(66, 135, 245, 0.05) 100%)"
          />

          <VStack align="stretch" gap="0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <Grid
                  key={step.number}
                  className="reveal"
                  templateColumns={{ base: '1fr', md: 'minmax(0, 1fr) 64px minmax(0, 1fr)' }}
                  alignItems="center"
                  mt={index === 0 ? '0' : { base: '48px', md: '80px' }}
                  style={{ transitionDelay: `${0.08 + index * 0.09}s` }}
                >
                  <Box
                    order={{ base: 1, md: 0 }}
                    gridRow={{ base: 'auto', md: '1' }}
                    gridColumn={{ base: '1 / -1', md: isEven ? '1 / 2' : '3 / 4' }}
                    justifySelf={{ base: 'stretch', md: isEven ? 'end' : 'start' }}
                    textAlign={{ base: 'left', md: isEven ? 'right' : 'left' }}
                    pr={{ base: '0', md: isEven ? '28px' : '0' }}
                    pl={{ base: '0', md: isEven ? '0' : '28px' }}
                    maxW="384px"
                  >
                    <Text
                      fontFamily="mono"
                      fontSize="5xl"
                      fontWeight="700"
                      lineHeight="1"
                      letterSpacing="-0.03em"
                      color="primary.500"
                      opacity={0.5}
                      mb="8px"
                    >
                      {step.number}
                    </Text>

                    <Text color="white" fontSize="xl" fontWeight="600" lineHeight="1.3">
                      {step.title}
                    </Text>

                    <Text mt="10px" color="rgba(255,255,255,0.62)" fontSize="md" lineHeight="1.7">
                      {step.description}
                    </Text>
                  </Box>

                  <Box
                    order={{ base: 0, md: 0 }}
                    gridRow={{ base: 'auto', md: '1' }}
                    gridColumn={{ base: '1 / -1', md: '2 / 3' }}
                    w="64px"
                    h="64px"
                    mx={{ base: '0', md: 'auto' }}
                    mb={{ base: '20px', md: '0' }}
                    borderRadius="16px"
                    border="1px solid rgba(66, 135, 245, 0.3)"
                    bg="rgba(8, 15, 31, 0.95)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="primary.500"
                    boxShadow="0 0 0 1px rgba(66, 135, 245, 0.08), 0 14px 36px rgba(10, 18, 36, 0.48)"
                    zIndex={1}
                  >
                    {step.icon}
                  </Box>
                </Grid>
              );
            })}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
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
    title: 'Point it at a project',
    description:
      'Open any project folder. BlueKit attaches to it instantly. No setup, no config files required.',
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
    title: 'Build your context',
    description:
      'Create maps to organize your thinking, flag notes with markers, and group reusable context into blocks.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8h8M8 11.5h8M8 15h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Everything stays local',
    description: (
      <>
        Your SQLite database lives at{' '}
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
          ~/.bluekit
        </Text>
        . No cloud, no accounts, no data leaving your machine.
      </>
    ),
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 10V7.5a4 4 0 1 1 8 0V10" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Knowledge travels with your code',
    description: (
      <>
        Your notebook lives inside{' '}
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
          .bluekit/
        </Text>{' '}
        so your context moves with your repo.
      </>
    ),
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const items = Array.from(section.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target as Element);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <Box as="section" id="how" pt={{ base: '70px', md: '96px' }} pb={{ base: '80px', md: '96px' }} ref={sectionRef}>
      <Container maxW="1160px" px={{ base: '20px', md: '32px' }}>
        <VStack gap="12px" maxW="2xl" mx="auto" textAlign="center" mb={{ base: '56px', md: '64px' }}>
          <Text
            fontSize="20px"
            fontWeight="700"
            letterSpacing="0.13em"
            textTransform="uppercase"
            color="primary.500"
            fontFamily="mono"
          >
            How it works
          </Text>
          <Text as="h2" fontSize={{ base: '3xl', md: '4xl' }} fontWeight="700" lineHeight="1.05" letterSpacing="-0.02em">
            Build context without <Box as="span" color="primary.500">breaking flow</Box>
          </Text>
          <Text color="fg.muted" fontSize="md">
            No onboarding maze, just a clean timeline from project open to reusable knowledge.
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

                    <Text fontSize="xl" fontWeight="600" lineHeight="1.3">
                      {step.title}
                    </Text>

                    <Text mt="10px" color="fg.muted" fontSize="md" lineHeight="1.7">
                      {step.description}
                    </Text>
                  </Box>

                  <Box
                    order={{ base: 0, md: 0 }}
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

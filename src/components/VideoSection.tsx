import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Text, VStack } from '@chakra-ui/react';
import { LuListTodo, LuMap, LuPackage, LuBookmark, LuX, LuPlay } from 'react-icons/lu';
import type { IconType } from 'react-icons';

const features: {
  title: string;
  body: string;
  icon: IconType;
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
  demoVideo?: string;
}[] = [
  {
    title: 'Tasks',
    body: 'Track everything you need to do, scoped to the project you\'re in. No separate tool, no context switch.',
    icon: LuListTodo,
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.08)',
    border: 'rgba(96, 165, 250, 0.15)',
    hoverBorder: 'rgba(96, 165, 250, 0.4)',
    demoVideo: '/CreateTask.mp4',
  },
  {
    title: 'Plans',
    body: 'Map out features and milestones with a structured plan that lives next to your code.',
    icon: LuMap,
    color: '#4ade80',
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'rgba(34, 197, 94, 0.15)',
    hoverBorder: 'rgba(34, 197, 94, 0.4)',
    demoVideo: '/CreatePlan.mp4',
  },
  {
    title: 'Blocks',
    body: 'Capture reusable context containers and pull them into any project instantly.',
    icon: LuPackage,
    color: '#c084fc',
    bg: 'rgba(168, 85, 247, 0.08)',
    border: 'rgba(168, 85, 247, 0.15)',
    hoverBorder: 'rgba(168, 85, 247, 0.4)',
  },
  {
    title: 'Bookmarks',
    body: 'Pin the files and folders that matter most so critical context is always one click away.',
    icon: LuBookmark,
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.08)',
    border: 'rgba(251, 146, 60, 0.15)',
    hoverBorder: 'rgba(251, 146, 60, 0.4)',
  },
];

export function VideoSection() {
  const [activeDemo, setActiveDemo] = useState<{ title: string; color: string; icon: IconType; video: string } | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeDemo]);

  // Close on Escape
  useEffect(() => {
    if (!activeDemo) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveDemo(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeDemo]);

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
              _hover={feature.demoVideo ? {
                borderColor: feature.hoverBorder,
                transform: 'translateY(-2px)',
                cursor: 'pointer',
                boxShadow: `0 8px 32px color-mix(in srgb, ${feature.color} 12%, transparent)`,
              } : {
                borderColor: feature.hoverBorder,
                transform: 'translateY(-2px)',
              }}
              onClick={feature.demoVideo ? () => setActiveDemo({ title: feature.title, color: feature.color, icon: feature.icon, video: feature.demoVideo! }) : undefined}
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
              <Text color="text.secondary" fontSize="15px" lineHeight="1.72" flex="1">
                {feature.body}
              </Text>

              {feature.demoVideo && (
                <Box
                  mt="20px"
                  display="inline-flex"
                  alignItems="center"
                  gap="7px"
                  color={feature.color}
                  fontSize="13px"
                  fontWeight="600"
                  letterSpacing="0.01em"
                >
                  <Box
                    className="demo-play-btn"
                    w="22px"
                    h="22px"
                    borderRadius="50%"
                    bg={`color-mix(in srgb, ${feature.color} 18%, transparent)`}
                    border={`1px solid color-mix(in srgb, ${feature.color} 35%, transparent)`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <LuPlay size={10} style={{ marginLeft: '1px' }} />
                  </Box>
                  Watch demo
                </Box>
              )}
            </Box>
          ))}
        </Grid>
      </Container>

      {activeDemo && (
        <Box
          className="modal-backdrop"
          position="fixed"
          inset={0}
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: '16px', md: '40px' }}
          onClick={() => setActiveDemo(null)}
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(66, 135, 245, 0.07) 0%, rgba(5, 13, 31, 0.88) 60%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          } as React.CSSProperties}
        >
          <Box
            className="modal-panel"
            position="relative"
            maxW="860px"
            w="100%"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="14px"
              px="2px"
            >
              <Box display="flex" alignItems="center" gap="10px">
                <Box
                  w="28px"
                  h="28px"
                  borderRadius="8px"
                  bg={`color-mix(in srgb, ${activeDemo.color} 14%, transparent)`}
                  border={`1px solid color-mix(in srgb, ${activeDemo.color} 25%, transparent)`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={activeDemo.color}
                >
                  <activeDemo.icon size={14} />
                </Box>
                <Text color="rgba(255,255,255,0.55)" fontSize="13px" fontWeight="500" letterSpacing="0.02em">
                  {activeDemo.title} · <Text as="span" color="rgba(255,255,255,0.85)">Demo</Text>
                </Text>
              </Box>

              <Box
                as="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="30px"
                h="30px"
                borderRadius="8px"
                color="rgba(255,255,255,0.5)"
                bg="rgba(255,255,255,0.05)"
                border="1px solid rgba(255,255,255,0.08)"
                transition="all 0.15s"
                _hover={{ color: 'white', bg: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)' }}
                onClick={() => setActiveDemo(null)}
                style={{ cursor: 'pointer' } as React.CSSProperties}
              >
                <LuX size={15} />
              </Box>
            </Box>

            {/* Video container */}
            <Box
              borderRadius="18px"
              overflow="hidden"
              position="relative"
              style={{
                border: `1px solid color-mix(in srgb, ${activeDemo.color} 20%, transparent)`,
                boxShadow: `0 0 0 1px color-mix(in srgb, ${activeDemo.color} 6%, transparent), 0 32px 80px rgba(0, 0, 0, 0.55), 0 0 60px color-mix(in srgb, ${activeDemo.color} 8%, transparent)`,
              } as React.CSSProperties}
            >
              <video
                key={activeDemo.video}
                src={activeDemo.video}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              {/* Subtle top/bottom gradient overlay */}
              <Box
                position="absolute"
                inset={0}
                pointerEvents="none"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.18) 100%)',
                } as React.CSSProperties}
              />
            </Box>

            {/* Footer hint */}
            <Text
              textAlign="center"
              mt="12px"
              color="rgba(255,255,255,0.25)"
              fontSize="12px"
              letterSpacing="0.02em"
            >
              Press <Text as="kbd" fontFamily="mono" fontSize="11px" color="rgba(255,255,255,0.35)" px="5px" py="1px" borderRadius="4px" bg="rgba(255,255,255,0.07)" border="1px solid rgba(255,255,255,0.1)">Esc</Text> or click outside to close
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}

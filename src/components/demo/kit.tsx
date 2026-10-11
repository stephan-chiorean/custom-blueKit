import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Box, HStack, Text, type BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { LuArchive, LuBoxes, LuCircleCheck, LuSkipForward, LuZap } from 'react-icons/lu';

/**
 * Shared pieces for the landing page's live product demos: small, working
 * slices of BlueKit drawn in the DOM instead of screenshots, so they stay crisp
 * at any size and can be clicked.
 */

export const MotionBox = motion.create(Box);
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** The app's dark palette, as the demos use it. */
export const ink = {
  strong: '#faede3',
  text: 'rgba(250, 237, 227, 0.86)',
  subtle: 'rgba(250, 237, 227, 0.56)',
  faint: 'rgba(250, 237, 227, 0.34)',
  line: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.14)',
  surface: 'rgba(255, 255, 255, 0.035)',
  raised: 'rgba(255, 255, 255, 0.075)',
  accent: '#4287f5',
  accentSoft: 'rgba(66, 135, 245, 0.16)',
  accentText: '#93c5fd',
};

export type NoteType = 'decision' | 'question' | 'idea' | 'insight' | 'flag';

/** Note type colours, the same ones the app uses in dark mode. */
export const noteColors: Record<NoteType, { fg: string; bg: string }> = {
  decision: { fg: '#72B8E8', bg: 'rgba(74, 144, 217, 0.18)' },
  question: { fg: '#DBA365', bg: 'rgba(183, 119, 57, 0.18)' },
  idea: { fg: '#4ade80', bg: 'rgba(74, 222, 128, 0.13)' },
  insight: { fg: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
  flag: { fg: '#f87171', bg: 'rgba(239, 68, 68, 0.15)' },
};

export function NoteChip({ type }: { type: NoteType }) {
  return (
    <Text
      as="span"
      flexShrink={0}
      px="8px"
      py="2px"
      borderRadius="full"
      fontSize="11px"
      fontWeight="600"
      style={{ color: noteColors[type].fg, background: noteColors[type].bg }}
    >
      {type}
    </Text>
  );
}

export type ContextStatus = 'active' | 'next' | 'completed' | 'archived';

/** Context status as the app's Links tab shows it: an icon in its view's colour. */
export const contextStatusStyle: Record<ContextStatus, { label: string; color: string; Icon: IconType }> = {
  active: { label: 'Active', color: '#93c5fd', Icon: LuZap },
  next: { label: 'Next', color: '#fcd34d', Icon: LuSkipForward },
  completed: { label: 'Completed', color: '#4ade80', Icon: LuCircleCheck },
  archived: { label: 'Archived', color: 'rgba(250, 237, 227, 0.5)', Icon: LuArchive },
};

/** Group violet, the same as the context graph. */
export const GROUP_COLOR = '#c084fc';

/** A linked context, as a pill: status icon, then the name. */
export function LinkPill({ name, status }: { name: string; status: ContextStatus }) {
  const { label, color, Icon } = contextStatusStyle[status];
  return (
    <HStack
      as="span"
      gap="6px"
      flexShrink={0}
      h="26px"
      px="9px"
      borderRadius="full"
      fontSize="12.5px"
      fontWeight="500"
      whiteSpace="nowrap"
      title={label}
      style={{ color: ink.text, background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
    >
      <Box as="span" display="flex" style={{ color }}>
        <Icon size={12} strokeWidth={2.25} aria-label={label} />
      </Box>
      {name}
    </HStack>
  );
}

/** A group's header in the Links tab: violet mark, name, and what it's for. */
export function GroupHeader({ name, about }: { name: string; about?: string }) {
  return (
    <HStack gap="8px" minW={0}>
      <Box as="span" display="flex" flexShrink={0} style={{ color: GROUP_COLOR }}>
        <LuBoxes size={14} strokeWidth={2} aria-hidden="true" />
      </Box>
      <Text as="span" flexShrink={0} fontSize="13px" fontWeight="600" style={{ color: ink.strong }}>
        {name}
      </Text>
      {about && (
        <Text as="span" truncate fontSize="12px" style={{ color: ink.faint }}>
          {about}
        </Text>
      )}
    </HStack>
  );
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function useInView(ref: RefObject<HTMLElement>): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

/**
 * Steps through `count` states every `ms` while the demo is on screen, until
 * the visitor first interacts; after that the demo is theirs. Never plays with
 * reduced motion.
 */
export function useAutoplay(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as RefObject<HTMLElement>);
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || reduced || !inView) return;
    const timer = setTimeout(() => setStep((s) => (s + 1) % count), ms);
    return () => clearTimeout(timer);
  }, [step, touched, reduced, inView, count, ms]);

  return { ref, step, setStep, touched, touch: () => setTouched(true) };
}

interface DemoWindowProps extends BoxProps {
  /** Accent for the top edge highlight. */
  glow?: string;
  /** Title-bar content after the traffic lights. */
  bar?: ReactNode;
  /** For `useAutoplay`: the window is what has to be on screen for it to play. */
  innerRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
}

/** A BlueKit window: glass frame, traffic lights, a bar, and the demo inside. */
export function DemoWindow({ glow = 'rgba(66, 135, 245, 0.6)', bar, innerRef, children, ...rest }: DemoWindowProps) {
  return (
    <Box
      ref={innerRef}
      position="relative"
      maxW="100%"
      minW={0}
      borderRadius={{ base: '14px', md: '18px' }}
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.1)"
      bg="rgba(9, 14, 30, 0.82)"
      boxShadow="0 30px 90px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: '12%',
        right: '12%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${glow}, transparent)`,
        zIndex: 2,
      }}
      {...rest}
    >
      <HStack h="42px" px="14px" gap="12px" borderBottom={`1px solid ${ink.line}`} bg="rgba(255,255,255,0.02)">
        <HStack gap="7px" flexShrink={0} aria-hidden="true">
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <Box key={c} w="11px" h="11px" borderRadius="full" style={{ background: c, opacity: 0.8 }} />
          ))}
        </HStack>
        {bar}
      </HStack>
      {children}
    </Box>
  );
}

interface SegmentedProps<T extends string> {
  options: { id: T; label: ReactNode }[];
  value: T;
  onChange: (id: T) => void;
  /** Unique per instance, so the sliding highlight doesn't jump between demos. */
  layoutId: string;
  label: string;
}

/** Pill switcher with a sliding highlight, like the app's view switcher. */
export function Segmented<T extends string>({ options, value, onChange, layoutId, label }: SegmentedProps<T>) {
  return (
    <HStack gap="0" p="3px" borderRadius="11px" bg={ink.surface} border={`1px solid ${ink.line}`} role="tablist" aria-label={label}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <Box
            key={o.id}
            as="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            position="relative"
            flex="1"
            minW={0}
            h="32px"
            px={{ base: '4px', md: '10px' }}
            borderRadius="8px"
            cursor="pointer"
            fontSize={{ base: '12px', md: '13px' }}
            fontWeight={active ? '600' : '500'}
            whiteSpace="nowrap"
            transition="color 0.15s ease"
            style={{ color: active ? ink.strong : ink.subtle }}
            _hover={{ color: ink.strong }}
          >
            {active && (
              <MotionBox
                layoutId={layoutId}
                position="absolute"
                inset="0"
                borderRadius="8px"
                style={{ background: ink.raised, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <Box position="relative" display="flex" alignItems="center" justifyContent="center" gap="7px">
              {o.label}
            </Box>
          </Box>
        );
      })}
    </HStack>
  );
}

/** A tiny "you can click this" note under a demo. */
export function DemoHint({ children }: { children: ReactNode }) {
  return (
    <Text mt="12px" textAlign="center" fontSize="13px" style={{ color: 'rgba(255,255,255,0.42)' }}>
      {children}
    </Text>
  );
}

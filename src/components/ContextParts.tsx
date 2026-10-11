import { Box, Grid, HStack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import { LuCheck, LuFileText, LuLink } from 'react-icons/lu';
import { EASE_OUT_EXPO, GROUP_COLOR, GroupHeader, LinkPill, MotionBox, NoteChip, ink, useAutoplay, usePrefersReducedMotion, type ContextStatus, type NoteType } from './demo/kit';

/**
 * What a context holds, right under the hero demo: docs, notes, tasks and
 * links, each with a small slice of how it looks in the app. Links take the
 * group violet from the graph section, so docs take the demo's doc blue.
 */

const DOCS = [
  { name: 'rollout-plan.md', folder: 'plan', links: 0 },
  { name: 'webhook-guide.md', folder: 'guides', links: 3 },
  { name: 'checkout-spec.md', folder: 'context', links: 0 },
  { name: 'agent-handoff.md', folder: 'plan', links: 0 },
];

const NOTES: { type: NoteType; text: string }[] = [
  { type: 'decision', text: 'Checkout ships before pricing' },
  { type: 'question', text: 'Do trial users see the tour twice?' },
  { type: 'idea', text: 'Replay failed events from the dashboard' },
  { type: 'flag', text: 'Support needs two weeks of notice' },
];

/** The question above, once it's settled: the note becomes its answer. */
const ANSWERED: { type: NoteType; text: string } = { type: 'decision', text: 'Returning trial users skip the tour' };

const LINK_GROUPS: { name: string; about: string; contexts: { name: string; status: ContextStatus }[] }[] = [
  {
    name: 'Q3 launch',
    about: 'What has to ship before launch.',
    contexts: [
      { name: 'Q3 planning', status: 'active' },
      { name: 'Checkout rebuild', status: 'active' },
      { name: 'Onboarding redesign', status: 'active' },
    ],
  },
  {
    name: 'Reliability',
    about: 'Things that must not break twice.',
    contexts: [
      { name: 'Webhook audit', status: 'completed' },
      { name: 'Legacy invoices', status: 'archived' },
    ],
  },
];

const TASKS: { text: string; status: 'completed' | 'open' | 'urgent'; agent?: string }[] = [
  { text: 'Add idempotency keys', status: 'completed' },
  { text: 'Fix double charge on retry', status: 'urgent', agent: 'Codex' },
  { text: 'Replay failed webhooks', status: 'open', agent: 'Claude Code' },
  { text: 'Write the migration guide', status: 'open' },
];

function Row({ children, last }: { children: ReactNode; last?: boolean }) {
  return (
    <HStack h="40px" px="14px" gap="10px" minW={0} borderBottom={last ? 'none' : `1px solid ${ink.line}`}>
      {children}
    </HStack>
  );
}

function RowText({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <Text
      flex="1"
      minW={0}
      truncate
      fontSize="13.5px"
      fontWeight="500"
      style={{ color: muted ? ink.faint : ink.text, textDecoration: muted ? 'line-through' : undefined }}
    >
      {children}
    </Text>
  );
}

function DocsSlice() {
  return (
    <>
      {DOCS.map((d, i) => (
        <Row key={d.name} last={i === DOCS.length - 1}>
          <Box as="span" display="flex" flexShrink={0} style={{ color: ink.accentText }}>
            <LuFileText size={15} strokeWidth={1.75} aria-hidden="true" />
          </Box>
          <RowText>{d.name}</RowText>
          {d.links > 0 ? (
            <HStack gap="4px" flexShrink={0} fontSize="11.5px" fontWeight="600" style={{ color: ink.subtle }} title={`Linked in ${d.links} contexts`}>
              <LuLink size={12} strokeWidth={2} aria-hidden="true" />
              <Text as="span">in {d.links} contexts</Text>
            </HStack>
          ) : (
            <Text as="span" flexShrink={0} fontSize="11.5px" style={{ color: ink.faint }}>
              {d.folder}/
            </Text>
          )}
        </Row>
      ))}
    </>
  );
}

function NotesSlice() {
  const { ref, step } = useAutoplay(2, 3200);
  return (
    <Box ref={ref}>
      {NOTES.map((n, i) => {
        const note = i === 1 && step === 1 ? ANSWERED : n;
        return (
          <Row key={i} last={i === NOTES.length - 1}>
            <MotionBox
              key={note.text}
              display="flex"
              alignItems="center"
              gap="10px"
              flex="1"
              minW={0}
              initial={i === 1 ? { opacity: 0, filter: 'blur(4px)' } : false}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              <Box w="72px" flexShrink={0} display="flex">
                <NoteChip type={note.type} />
              </Box>
              <RowText>{note.text}</RowText>
            </MotionBox>
          </Row>
        );
      })}
    </Box>
  );
}

/** A small "working" tag: the dot breathes while the agent has the task. */
function AgentTag({ name, delay }: { name: string; delay: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <HStack
      gap="6px"
      flexShrink={0}
      px="8px"
      h="22px"
      borderRadius="full"
      fontSize="11px"
      fontWeight="600"
      style={{ color: ink.accentText, background: ink.accentSoft }}
    >
      <MotionBox
        w="6px"
        h="6px"
        borderRadius="full"
        style={{ background: ink.accentText }}
        animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
      />
      <Text as="span" whiteSpace="nowrap">
        {name}
      </Text>
    </HStack>
  );
}

function StatusMark({ status }: { status: 'completed' | 'open' | 'urgent' }) {
  if (status === 'completed') {
    return (
      <Box w="16px" h="16px" flexShrink={0} borderRadius="full" display="flex" alignItems="center" justifyContent="center" style={{ background: 'rgba(74, 222, 128, 0.18)', color: '#4ade80' }}>
        <LuCheck size={11} strokeWidth={3} aria-hidden="true" />
      </Box>
    );
  }
  const color = status === 'urgent' ? '#f87171' : 'rgba(250, 237, 227, 0.4)';
  return <Box w="16px" h="16px" flexShrink={0} borderRadius="full" style={{ border: `1.5px solid ${color}` }} />;
}

function TasksSlice() {
  return (
    <>
      {TASKS.map((t, i) => (
        <Row key={t.text} last={i === TASKS.length - 1}>
          <StatusMark status={t.status} />
          <RowText muted={t.status === 'completed'}>{t.text}</RowText>
          {t.agent && <AgentTag name={t.agent} delay={i * 0.6} />}
        </Row>
      ))}
    </>
  );
}

function LinksSlice() {
  return (
    <>
      {LINK_GROUPS.map((g, i) => (
        <Box key={g.name} flex="1" display="flex" flexDirection="column" justifyContent="center" px="14px" py="11px" borderBottom={i === LINK_GROUPS.length - 1 ? 'none' : `1px solid ${ink.line}`}>
          <GroupHeader name={g.name} about={g.about} />
          {/* One line of pills; the overflow fades out rather than wrapping. */}
          <HStack
            mt="9px"
            gap="6px"
            overflow="hidden"
            css={{ maskImage: 'linear-gradient(90deg, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, black 85%, transparent)' }}
          >
            {g.contexts.map((c) => (
              <LinkPill key={c.name} name={c.name} status={c.status} />
            ))}
          </HStack>
        </Box>
      ))}
    </>
  );
}

const PARTS = [
  {
    name: 'Docs',
    color: '#93c5fd',
    lead: 'Specs, guides and plans.',
    text: 'Markdown files you own. Link a doc into every context it belongs to. It’s never copied.',
    Slice: DocsSlice,
  },
  {
    name: 'Notes',
    color: '#fbbf24',
    lead: 'Ideas, questions, decisions.',
    text: 'The shape of your thinking, typed so you can scan it. Answer a question and it becomes the decision.',
    Slice: NotesSlice,
  },
  {
    name: 'Tasks',
    color: '#4ade80',
    lead: 'The work, broken down.',
    text: 'Track what’s open, urgent and done. Hand separate tasks to agents running in parallel.',
    Slice: TasksSlice,
  },
  {
    name: 'Links',
    color: GROUP_COLOR,
    lead: 'Contexts that belong together.',
    text: 'Put contexts in groups you name. Each one shows what it’s linked to and why it belongs.',
    Slice: LinksSlice,
  },
];

export function ContextParts() {
  const ref = useReveal<HTMLElement>();

  return (
    <Box as="section" ref={ref} aria-labelledby="context-parts-title" mt={{ base: '40px', md: '64px' }}>
      <Text
        as="h2"
        id="context-parts-title"
        className="reveal"
        color="white"
        fontSize={{ base: '26px', md: '34px' }}
        fontWeight="700"
        lineHeight="1.12"
        letterSpacing="-0.022em"
        maxW="760px"
        textWrap="balance"
      >
        Every context holds four things.{' '}
        <Box as="span" color="rgba(255,255,255,0.42)">
          Your agent works in all of them.
        </Box>
      </Text>

      <Grid
        as="ul"
        listStyleType="none"
        m="0"
        p="0"
        mt={{ base: '24px', md: '32px' }}
        templateColumns={{ base: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }}
        columnGap={{ base: '36px', md: '32px', lg: '48px' }}
        rowGap={{ base: '36px', md: '48px' }}
      >
        {PARTS.map(({ name, color, lead, text, Slice }, i) => (
          <Box as="li" key={name} minW={0} className="reveal" style={{ transitionDelay: `${0.08 + (i % 2) * 0.08}s` }}>
            <Box
              position="relative"
              borderRadius="14px"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              minH="162px"
              border={`1px solid ${ink.line}`}
              bg="rgba(9, 14, 30, 0.6)"
              boxShadow="0 18px 48px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
              aria-hidden="true"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '14%',
                right: '14%',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                opacity: 0.7,
              }}
            >
              <Slice />
            </Box>

            <HStack mt="22px" gap="10px" align="center">
              <Box w="8px" h="8px" borderRadius="2px" flexShrink={0} style={{ background: color }} />
              <Text as="h3" color="white" fontSize={{ base: '22px', md: '24px' }} fontWeight="700" letterSpacing="-0.02em" lineHeight="1">
                {name}
              </Text>
            </HStack>
            <Text mt="10px" color="white" fontSize="16px" fontWeight="600" letterSpacing="-0.005em">
              {lead}
            </Text>
            <Text mt="6px" color="rgba(255,255,255,0.62)" fontSize="15px" lineHeight="1.6" maxW="52ch">
              {text}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

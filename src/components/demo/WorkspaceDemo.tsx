import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LuFileText } from 'react-icons/lu';
import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import { CONTEXTS, type DemoContext } from './data';
import { DocView } from './DocView';
import { DemoWindow, EASE_OUT_EXPO, MotionBox, NoteChip, Segmented, ink, useAutoplay } from './kit';

type View = 'docs' | 'notes' | 'tasks';
const VIEWS: View[] = ['docs', 'notes', 'tasks'];
const TASK_ORDER = ['open', 'in progress', 'done'] as const;

const statusStyle: Record<(typeof TASK_ORDER)[number], { dot: string; label: string }> = {
  open: { dot: 'transparent', label: 'Open' },
  'in progress': { dot: '#DBA365', label: 'In progress' },
  done: { dot: '#4287f5', label: 'Done' },
};

function PanelRow({ index, children, onClick, active }: { index: number; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO, delay: index * 0.05 }}
    >
      <HStack
        as={onClick ? 'button' : 'div'}
        onClick={onClick}
        w="100%"
        gap="10px"
        px="11px"
        minH="40px"
        py="8px"
        borderRadius="9px"
        textAlign="left"
        cursor={onClick ? 'pointer' : 'default'}
        transition="background 0.15s ease"
        style={{ background: active ? ink.raised : ink.surface, boxShadow: active ? `inset 0 0 0 1px ${ink.lineStrong}` : 'none' }}
        _hover={onClick ? { background: 'rgba(255,255,255,0.06)' } : undefined}
      >
        {children}
      </HStack>
    </MotionBox>
  );
}

/**
 * The hero: a working slice of BlueKit. Context tabs across the top, the open
 * doc rendered on the left, and the context's docs, notes and tasks on the
 * right. Plays through the contexts on its own until clicked; then docs open,
 * tasks move through their statuses, and tabs switch.
 */
export function WorkspaceDemo() {
  const tour = useAutoplay(CONTEXTS.length * VIEWS.length, 3000);
  const [contexts, setContexts] = useState<DemoContext[]>(CONTEXTS);
  const [contextIndex, setContextIndex] = useState(0);
  const [view, setView] = useState<View>('docs');
  const [docIndex, setDocIndex] = useState(0);

  // While playing, the tour step drives the tab and the panel view.
  useEffect(() => {
    if (tour.touched) return;
    setContextIndex(Math.floor(tour.step / VIEWS.length));
    setView(VIEWS[tour.step % VIEWS.length]);
    setDocIndex(0);
  }, [tour.step, tour.touched]);

  const context = contexts[contextIndex];
  const doc = context.docs[Math.min(docIndex, context.docs.length - 1)];

  const chooseContext = (i: number) => { tour.touch(); setContextIndex(i); setDocIndex(0); };
  const chooseView = (v: View) => { tour.touch(); setView(v); };
  const openDoc = (i: number) => { tour.touch(); setDocIndex(i); };
  const advanceTask = (ti: number) => {
    tour.touch();
    setContexts((all) =>
      all.map((c, ci) =>
        ci !== contextIndex
          ? c
          : {
              ...c,
              tasks: c.tasks.map((t, j) =>
                j === ti ? { ...t, status: TASK_ORDER[(TASK_ORDER.indexOf(t.status) + 1) % TASK_ORDER.length] } : t,
              ),
            },
      ),
    );
  };

  const openTasks = context.tasks.filter((t) => t.status !== 'done').length;

  return (
    <DemoWindow
      innerRef={tour.ref}
      bar={
        <HStack gap="2px" minW={0} flex="1" overflowX="auto" role="tablist" aria-label="Contexts" css={{ scrollbarWidth: 'none' }}>
          {contexts.map((c, i) => {
            const active = i === contextIndex;
            return (
              <Box
                key={c.name}
                as="button"
                role="tab"
                aria-selected={active}
                onClick={() => chooseContext(i)}
                position="relative"
                flexShrink={0}
                h="30px"
                px="12px"
                borderRadius="8px"
                fontSize="13px"
                fontWeight={active ? '600' : '500'}
                cursor="pointer"
                transition="color 0.15s ease, background 0.15s ease"
                style={{ color: active ? ink.strong : ink.subtle, background: active ? ink.raised : 'transparent' }}
                _hover={{ color: ink.strong }}
              >
                {c.name}
              </Box>
            );
          })}
          <Text ml="auto" pl="12px" fontSize="12px" flexShrink={0} display={{ base: 'none', md: 'block' }} style={{ color: ink.faint }}>
            Acme notebook
          </Text>
        </HStack>
      }
    >
      <Grid templateColumns={{ base: 'minmax(0, 1fr)', md: 'minmax(0, 1.45fr) minmax(0, 1fr)' }} h={{ base: 'auto', md: '500px' }}>
        {/* The open doc */}
        <Box px={{ base: '20px', md: '36px' }} py={{ base: '22px', md: '30px' }} overflow="hidden" position="relative">
          <AnimatePresence mode="wait" initial={false}>
            <DocView key={`${contextIndex}-${doc.name}`} doc={doc} />
          </AnimatePresence>
          <Box
            aria-hidden="true"
            display={{ base: 'none', md: 'block' }}
            position="absolute"
            left="0"
            right="0"
            bottom="0"
            h="70px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(9, 14, 30, 0.95))' }}
          />
        </Box>

        {/* The context panel */}
        <VStack
          align="stretch"
          gap="14px"
          p={{ base: '16px', md: '18px' }}
          style={{ borderLeft: `1px solid ${ink.line}`, background: 'rgba(255,255,255,0.015)' }}
          minH={{ base: '360px', md: 'auto' }}
        >
          <Segmented
            label="Inside the context"
            layoutId="hero-view"
            value={view}
            onChange={chooseView}
            options={[
              { id: 'docs', label: <>Docs <Text as="span" style={{ color: ink.faint }}>{context.docs.length}</Text></> },
              { id: 'notes', label: <>Notes <Text as="span" style={{ color: ink.faint }}>{context.notes.length}</Text></> },
              { id: 'tasks', label: <>Tasks <Text as="span" style={{ color: ink.faint }}>{openTasks}</Text></> },
            ]}
          />

          <VStack align="stretch" gap="6px" flex="1">
            <AnimatePresence mode="wait" initial={false}>
              <MotionBox key={`${contextIndex}-${view}`} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                <VStack align="stretch" gap="6px">
                  {view === 'docs' &&
                    context.docs.map((d, i) => (
                      <PanelRow key={d.name} index={i} onClick={() => openDoc(i)} active={d.name === doc.name}>
                        <Box as="span" display="flex" flexShrink={0} style={{ color: ink.accentText }}>
                          <LuFileText size={15} strokeWidth={1.75} aria-hidden="true" />
                        </Box>
                        <Text fontSize="13.5px" fontWeight="500" truncate style={{ color: ink.strong }}>{d.name}</Text>
                        <Text ml="auto" fontSize="12px" flexShrink={0} style={{ color: ink.faint }}>{d.folder}/</Text>
                      </PanelRow>
                    ))}
                  {view === 'notes' &&
                    context.notes.map((n, i) => (
                      <PanelRow key={n.title} index={i}>
                        <NoteChip type={n.type} />
                        <Text fontSize="13.5px" truncate style={{ color: ink.text }}>{n.title}</Text>
                      </PanelRow>
                    ))}
                  {view === 'tasks' &&
                    context.tasks.map((t, i) => (
                      <PanelRow key={t.title} index={i} onClick={() => advanceTask(i)}>
                        <Box
                          w="15px"
                          h="15px"
                          borderRadius="full"
                          flexShrink={0}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          title={statusStyle[t.status].label}
                          style={{
                            border: `1.5px solid ${t.status === 'open' ? ink.lineStrong : statusStyle[t.status].dot}`,
                            background: t.status === 'done' ? statusStyle.done.dot : 'transparent',
                          }}
                        >
                          {t.status === 'in progress' && <Box w="6px" h="6px" borderRadius="full" style={{ background: statusStyle['in progress'].dot }} />}
                          {t.status === 'done' && (
                            <svg width="8" height="8" viewBox="0 0 12 12" aria-hidden="true">
                              <path d="M2.5 6.5l2.3 2.3 4.7-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </Box>
                        <Text
                          fontSize="13.5px"
                          truncate
                          style={{ color: t.status === 'done' ? ink.subtle : ink.text, textDecoration: t.status === 'done' ? 'line-through' : 'none' }}
                        >
                          {t.title}
                        </Text>
                        <Text ml="auto" fontSize="11.5px" flexShrink={0} style={{ color: ink.faint }}>{statusStyle[t.status].label}</Text>
                      </PanelRow>
                    ))}
                </VStack>
              </MotionBox>
            </AnimatePresence>
          </VStack>

          {/* How the agent gets in */}
          <HStack
            gap="8px"
            px="11px"
            h="38px"
            borderRadius="9px"
            fontFamily="mono"
            fontSize="12px"
            minW={0}
            style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${ink.line}` }}
          >
            <Text flexShrink={0} style={{ color: ink.accentText }}>›</Text>
            <Text truncate style={{ color: ink.text }}>/bluekit connect to the {context.name} context</Text>
            <Box as="span" display="inline-block" w="7px" h="13px" flexShrink={0} className="caret" style={{ background: ink.accentText }} />
          </HStack>
        </VStack>
      </Grid>
    </DemoWindow>
  );
}

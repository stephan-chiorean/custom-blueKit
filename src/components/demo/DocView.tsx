import { Fragment, type ReactNode } from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { EASE_OUT_EXPO, MotionBox, ink } from './kit';

/** A rendered markdown doc, as block data: what the app's editor shows for a file. */
export type DocBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'checks'; items: { text: string; done: boolean }[] }
  | { kind: 'steps'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'code'; lang: string; lines: string[] }
  | { kind: 'callout'; tone: 'question' | 'note'; text: string };

export interface DemoDoc {
  name: string;
  folder: string;
  title: string;
  tags: string[];
  blocks: DocBlock[];
}

/** `[[wikilinks]]` render as the app's dotted links. */
function inline(text: string): ReactNode {
  const parts = text.split(/(\[\[[^\]]+\]\]|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('[[')) {
      return (
        <Text
          as="span"
          key={i}
          style={{ color: ink.accentText, textDecoration: 'underline dotted', textUnderlineOffset: '3px' }}
        >
          {part.slice(2, -2)}
        </Text>
      );
    }
    if (part.startsWith('`')) {
      return (
        <Text as="span" key={i} fontFamily="mono" fontSize="0.9em" px="5px" py="1px" borderRadius="5px" style={{ background: ink.raised }}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Block({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case 'h2':
      return (
        <Text as="h3" fontSize="16px" fontWeight="700" mt="6px" letterSpacing="-0.01em" style={{ color: ink.strong }}>
          {block.text}
        </Text>
      );
    case 'p':
      return (
        <Text fontSize="14px" lineHeight="1.7" style={{ color: ink.text }}>
          {inline(block.text)}
        </Text>
      );
    case 'checks':
      return (
        <VStack align="stretch" gap="7px">
          {block.items.map((item) => (
            <HStack key={item.text} gap="10px" align="start">
              <Box
                mt="3px"
                w="15px"
                h="15px"
                borderRadius="4px"
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                  background: item.done ? ink.accent : 'transparent',
                  border: `1.5px solid ${item.done ? ink.accent : ink.lineStrong}`,
                }}
              >
                {item.done && (
                  <svg width="9" height="9" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 6.5l2.3 2.3 4.7-5" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Box>
              <Text
                fontSize="14px"
                lineHeight="1.5"
                style={{ color: item.done ? ink.subtle : ink.text, textDecoration: item.done ? 'line-through' : 'none' }}
              >
                {inline(item.text)}
              </Text>
            </HStack>
          ))}
        </VStack>
      );
    case 'steps':
      return (
        <VStack align="stretch" gap="6px">
          {block.items.map((item, i) => (
            <HStack key={item} gap="10px" align="start">
              <Text fontSize="13px" fontWeight="600" w="16px" flexShrink={0} lineHeight="1.6" style={{ color: ink.accentText }}>
                {i + 1}.
              </Text>
              <Text fontSize="14px" lineHeight="1.6" style={{ color: ink.text }}>{inline(item)}</Text>
            </HStack>
          ))}
        </VStack>
      );
    case 'table':
      return (
        <Box borderRadius="10px" overflowX="auto" style={{ border: `1px solid ${ink.line}` }}>
          <Box as="table" w="100%" style={{ borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: ink.surface }}>
                {block.head.map((h) => (
                  <Box as="th" key={h} textAlign="left" px="12px" py="8px" fontWeight="600" style={{ color: ink.strong }}>
                    {h}
                  </Box>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')} style={{ borderTop: `1px solid ${ink.line}` }}>
                  {row.map((cell, i) => (
                    <Box as="td" key={i} px="12px" py="8px" style={{ color: i === 0 ? ink.text : ink.subtle }}>
                      {inline(cell)}
                    </Box>
                  ))}
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      );
    case 'code':
      return (
        <Box borderRadius="10px" overflow="hidden" style={{ background: 'rgba(0, 0, 0, 0.32)', border: `1px solid ${ink.line}` }}>
          <Text fontFamily="mono" fontSize="11px" px="12px" pt="8px" style={{ color: ink.faint }}>
            {block.lang}
          </Text>
          <Box as="pre" m="0" px="12px" pt="4px" pb="10px" overflowX="auto" fontFamily="mono" fontSize="12.5px" lineHeight="1.65" style={{ color: ink.text }}>
            {block.lines.join('\n')}
          </Box>
        </Box>
      );
    case 'callout':
      return (
        <HStack
          align="start"
          gap="10px"
          px="12px"
          py="10px"
          borderRadius="10px"
          style={{
            background: block.tone === 'question' ? 'rgba(183, 119, 57, 0.12)' : ink.accentSoft,
            border: `1px solid ${block.tone === 'question' ? 'rgba(219, 163, 101, 0.25)' : 'rgba(66, 135, 245, 0.25)'}`,
          }}
        >
          <Text fontSize="14px" style={{ color: block.tone === 'question' ? '#DBA365' : ink.accentText }}>
            {block.tone === 'question' ? '?' : 'i'}
          </Text>
          <Text fontSize="13.5px" lineHeight="1.6" style={{ color: ink.text }}>{inline(block.text)}</Text>
        </HStack>
      );
  }
}

/** The doc itself: path, title, tags, then its blocks, fading in on each change. */
export function DocView({ doc, compact = false }: { doc: DemoDoc; compact?: boolean }) {
  return (
    <MotionBox
      key={doc.name}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <VStack align="stretch" gap={compact ? '12px' : '14px'}>
        <Text fontSize="12px" style={{ color: ink.faint }}>
          {doc.folder} / {doc.name}.md
        </Text>
        <Text as="h2" fontSize={compact ? '24px' : '28px'} fontWeight="700" letterSpacing="-0.02em" lineHeight="1.15" style={{ color: ink.strong }}>
          {doc.title}
        </Text>
        <HStack gap="6px" flexWrap="wrap">
          {doc.tags.map((t) => (
            <Text key={t} as="span" fontSize="11.5px" px="8px" py="2px" borderRadius="6px" style={{ color: ink.accentText, background: ink.accentSoft }}>
              {t}
            </Text>
          ))}
        </HStack>
        {doc.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </VStack>
    </MotionBox>
  );
}

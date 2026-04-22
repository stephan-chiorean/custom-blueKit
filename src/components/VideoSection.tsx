// Set to true to revert to the old card-grid layout
const USE_LEGACY = false;

import { Box, Container, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { VideoSectionLegacy } from "./VideoSectionLegacy";
import {
  BsBookmarkFill,
  BsBoxFill,
  BsClipboard2CheckFill,
  BsMapFill,
} from "react-icons/bs";
import type { IconType } from "react-icons";

type FeatureTab = {
  id: string;
  label: string;
  title: string;
  summary: string;
  enables: string[];
  inApp: string[];
  highlights: string[];
  icon: IconType;
  color: string;
  panelBg: string;
  panelBorder: string;
  panelGlow: string;
};

const features: FeatureTab[] = [
  {
    id: "tasks",
    label: "Tasks",
    title: "Tasks keep execution visible",
    summary:
      "Capture and prioritize work in project scope or workspace scope, then move it between In Progress and Backlog as reality changes.",
    enables: [
      "Create and edit tasks with title, description, tags, and priorities.",
      "Drag to reorder inside lanes or across lanes to update status quickly.",
      "Search by name/tag and run bulk complete or delete actions.",
    ],
    inApp: [
      "Dedicated In Progress and Backlog lanes with live task counts.",
      "Priority model for pinned, high, standard, long term, and nit.",
      "Fast add/edit dialogs with status-aware feedback.",
    ],
    highlights: ["In Progress + Backlog lanes", "Drag reorder", "Bulk actions"],
    icon: BsClipboard2CheckFill,
    color: "#60a5fa",
    panelBg: "rgba(14, 26, 54, 0.98)",
    panelBorder: "rgba(96, 165, 250, 0.32)",
    panelGlow: "rgba(96, 165, 250, 0.2)",
  },
  {
    id: "maps",
    label: "Maps",
    title: "Maps build fast context over project structure",
    summary:
      "Pin critical files and folders, attach notes for context, and keep map entries organized in groups or subgroups as projects grow.",
    enables: [
      "Create maps from files/folders and annotate them with context notes.",
      "Group maps into nested structures and drag entries between groups.",
      "Ungroup, rename, and reorganize maps without losing linked context.",
    ],
    inApp: [
      "Open maps in the current tab, a new tab, or a detached window.",
      "Search map names quickly and spot newly added entries.",
      "Manage groups with create subgroup, rename, and delete actions.",
    ],
    highlights: [
      "Notes + linked paths",
      "Groups + subgroups",
      "Open in new window",
    ],
    icon: BsMapFill,
    color: "#CD853F",
    panelBg: "rgba(30, 22, 14, 0.98)",
    panelBorder: "rgba(205, 133, 63, 0.32)",
    panelGlow: "rgba(205, 133, 63, 0.18)",
  },
  {
    id: "markers",
    label: "Markers",
    title: "Markers keep high-signal paths visible",
    summary:
      "Color-code important files and folders so they stay scannable, then filter markers by label, color, or entity type when you need focus.",
    enables: [
      "Set markers on files or folders with labels and optional descriptions.",
      "Filter markers by text, color, and file vs folder type.",
      "Edit or remove markers inline without leaving the list view.",
    ],
    inApp: [
      "Structured marker table with Name, Color, Linked Path, and Actions.",
      "One-click open for linked files directly from marker rows.",
      "Consistent marker palette for quick visual scanning.",
    ],
    highlights: [
      "Color coding",
      "File + folder markers",
      "Multi-filter search",
    ],
    icon: BsBookmarkFill,
    color: "#FA745A",
    panelBg: "rgba(32, 18, 16, 0.98)",
    panelBorder: "rgba(250, 116, 90, 0.32)",
    panelGlow: "rgba(250, 116, 90, 0.18)",
  },
  {
    id: "blocks",
    label: "Blocks",
    title: "Blocks package reusable knowledge",
    summary:
      "Capture portable knowledge units, group them logically, and reuse them across projects without rebuilding context from scratch.",
    enables: [
      "Create reusable blocks with names, tags, and linked resources.",
      "Drag blocks between groups or back to root for rapid re-organization.",
      "Copy blocks to other projects to bootstrap context instantly.",
    ],
    inApp: [
      "Search blocks by name or tags and open group-specific views.",
      "Add-to-project flow for sharing one block across many projects.",
      "Group management that preserves block content while reorganizing.",
    ],
    highlights: [
      "Reusable context units",
      "Cross-project copy",
      "Group drag/drop",
    ],
    icon: BsBoxFill,
    color: "#c084fc",
    panelBg: "rgba(24, 18, 42, 0.98)",
    panelBorder: "rgba(192, 132, 252, 0.32)",
    panelGlow: "rgba(192, 132, 252, 0.2)",
  },
];

const TAB_BAR_BG = "rgba(7, 10, 20, 0.99)";

function FeatureContent({ f }: { f: FeatureTab }) {
  return (
    <Grid
      position="relative"
      templateColumns={{ base: "1fr", xl: "minmax(0, 1.1fr) minmax(0, 1fr)" }}
      gap={{ base: "20px", md: "26px" }}
    >
      <VStack align="start" gap={{ base: "12px", md: "16px" }}>
        <HStack gap="12px" align="center">
          <Box
            w="40px"
            h="40px"
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            style={{
              background: `color-mix(in srgb, ${f.color} 12%, transparent)`,
              border: `1px solid ${f.panelBorder}`,
              color: f.color,
            }}
          >
            <f.icon size={18} />
          </Box>
          <Text
            color="white"
            fontSize={{ base: "21px", md: "27px", lg: "30px" }}
            fontWeight="700"
            letterSpacing="-0.02em"
            lineHeight="1.1"
          >
            {f.title}
          </Text>
        </HStack>

        <Text
          color="rgba(255,255,255,0.68)"
          fontSize={{ base: "15px", md: "16px" }}
          lineHeight="1.78"
          maxW="540px"
        >
          {f.summary}
        </Text>

        <HStack gap="7px" flexWrap="wrap">
          {f.highlights.map((item) => (
            <Box
              key={item}
              borderRadius="full"
              px="11px"
              py="5px"
              style={{
                border: `1px solid ${f.panelBorder}`,
                background: `color-mix(in srgb, ${f.color} 7%, rgba(255,255,255,0.04))`,
              }}
            >
              <Text
                color="rgba(255,255,255,0.78)"
                fontSize="12px"
                fontWeight="500"
                letterSpacing="0.01em"
              >
                {item}
              </Text>
            </Box>
          ))}
        </HStack>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0,1fr))" }}
        gap="10px"
      >
        {[
          { label: "What it enables", items: f.enables },
          { label: "In the app", items: f.inApp },
        ].map(({ label, items }) => (
          <Box
            key={label}
            borderRadius="12px"
            p={{ base: "14px", md: "15px" }}
            style={{
              border: `1px solid ${f.panelBorder}`,
              background: "rgba(0, 0, 0, 0.28)",
            }}
          >
            <Text
              fontFamily="mono"
              fontSize="10px"
              letterSpacing="0.12em"
              textTransform="uppercase"
              fontWeight="700"
              mb="10px"
              style={{ color: f.color }}
            >
              {label}
            </Text>
            <VStack align="start" gap="8px">
              {items.map((item) => (
                <HStack key={item} align="start" gap="8px">
                  <Box
                    mt="6px"
                    w="4px"
                    h="4px"
                    borderRadius="full"
                    flexShrink={0}
                    style={{ background: f.color }}
                  />
                  <Text
                    color="rgba(255,255,255,0.66)"
                    fontSize="13px"
                    lineHeight="1.65"
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export function VideoSection() {
  return USE_LEGACY ? <VideoSectionLegacy /> : <VideoSectionTabs />;
}

function VideoSectionTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id);
  const f = features.find((feat) => feat.id === activeTab) ?? features[0];

  return (
    <Box
      as="section"
      id="features"
      pt={{ base: "44px", md: "78px" }}
      pb={{ base: "72px", md: "108px" }}
    >
      <Container maxW="1280px" px={{ base: "16px", md: "28px", lg: "36px" }}>
        <VStack align="start" gap="12px" mb={{ base: "24px", md: "30px" }}>
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
          <Text
            as="h2"
            color="white"
            fontSize={{ base: "32px", md: "44px" }}
            letterSpacing="-0.02em"
            lineHeight="1.05"
          >
            Built for real engineering workflows.
          </Text>
        </VStack>

        {/* ── Desktop: browser/notebook tabs ─────────────────── */}
        <Box display={{ base: "none", md: "block" }}>
          {/*
            Seam trick:
            - tab bar bg = TAB_BAR_BG (very dark)
            - active tab bg = f.panelBg (feature tint, same as content)
            - active tab border-bottom color = f.panelBg (hides the bottom border)
            - active tab margin-bottom = -1px (overlaps content top edge by 1px)
            - content bg = f.panelBg (matches active tab exactly → no seam)
            Using inline style= for all tab colors to guarantee CSS specificity over Chakra defaults.
          */}
          <Box
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: `1px solid ${f.panelBorder}`,
              boxShadow: `0 40px 96px -40px ${f.panelGlow}, inset 0 1px 0 rgba(255,255,255,0.03)`,
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            {/* Tab strip */}
            <Box
              display="flex"
              alignItems="flex-end"
              gap="2px"
              px="10px"
              pt="6px"
              style={{
                background: TAB_BAR_BG,
                position: "relative",
                zIndex: 2,
              }}
            >
              {features.map((feat) => {
                const isActive = feat.id === activeTab;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setActiveTab(feat.id)}
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      padding: "9px 17px",
                      marginBottom: "-1px",
                      cursor: "pointer",
                      outline: "none",
                      appearance: "none",
                      WebkitAppearance: "none",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.42)",
                      background: isActive ? feat.panelBg : "transparent",
                      border: isActive
                        ? `1px solid ${feat.panelBorder}`
                        : "1px solid transparent",
                      borderBottom: isActive
                        ? `1px solid ${feat.panelBg}`
                        : "1px solid transparent",
                      transition:
                        "color 0.15s, background 0.15s, border-color 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        color: feat.color,
                        opacity: isActive ? 1 : 0.45,
                        transition: "opacity 0.15s",
                      }}
                    >
                      <feat.icon size={13} />
                    </span>
                    {feat.label}
                  </button>
                );
              })}
            </Box>

            {/* Content panel — bg must match active tab's panelBg exactly */}
            <Box
              position="relative"
              overflow="hidden"
              p={{ md: "22px", lg: "28px" }}
              style={{
                background: f.panelBg,
                transition: "background 0.2s",
                zIndex: 1,
              }}
            >
              {/* Depth gradient */}
              <Box
                aria-hidden
                position="absolute"
                inset="0"
                style={{
                  background:
                    "linear-gradient(140deg, transparent 0%, rgba(3,5,14,0.6) 52%, rgba(2,4,12,0.88) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Feature glow */}
              <Box
                aria-hidden
                position="absolute"
                inset="-10%"
                style={{
                  background: `radial-gradient(circle at 5% 5%, ${f.panelGlow} 0%, transparent 50%)`,
                  opacity: 0.9,
                  pointerEvents: "none",
                  transition: "background 0.2s",
                }}
              />
              <FeatureContent f={f} />
            </Box>
          </Box>
        </Box>

        {/* ── Mobile: pill selector + card ───────────────────── */}
        <Box display={{ base: "block", md: "none" }}>
          <Box
            display="flex"
            overflowX="auto"
            overscrollBehaviorX="contain"
            gap="7px"
            mb="14px"
            pb="2px"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
          >
            {features.map((feat) => {
              const isActive = feat.id === activeTab;
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => setActiveTab(feat.id)}
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    outline: "none",
                    appearance: "none",
                    WebkitAppearance: "none",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.48)",
                    background: isActive
                      ? feat.panelBg
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? `1px solid ${feat.panelBorder}`
                      : "1px solid rgba(255,255,255,0.09)",
                    boxShadow: isActive
                      ? `0 0 18px -4px ${feat.panelGlow}`
                      : "none",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ display: "inline-flex", color: feat.color }}>
                    <feat.icon size={13} />
                  </span>
                  {feat.label}
                </button>
              );
            })}
          </Box>

          <Box
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: `1px solid ${f.panelBorder}`,
              boxShadow: `0 24px 60px -24px ${f.panelGlow}`,
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <Box
              position="relative"
              overflow="hidden"
              p="18px"
              style={{ background: f.panelBg, transition: "background 0.2s" }}
            >
              <Box
                aria-hidden
                position="absolute"
                inset="0"
                style={{
                  background:
                    "linear-gradient(140deg, transparent 0%, rgba(3,5,14,0.6) 52%, rgba(2,4,12,0.88) 100%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                aria-hidden
                position="absolute"
                inset="-10%"
                style={{
                  background: `radial-gradient(circle at 5% 5%, ${f.panelGlow} 0%, transparent 50%)`,
                  opacity: 0.9,
                  pointerEvents: "none",
                  transition: "background 0.2s",
                }}
              />
              <FeatureContent f={f} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Suppress TS complaint about vendor-prefixed style prop used in JSX style object
declare module "react" {
  interface CSSProperties {
    WebkitAppearance?: string;
  }
}

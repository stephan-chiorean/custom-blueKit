import { Box, type BoxProps } from '@chakra-ui/react';

interface ShotProps extends BoxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Accent used for the top edge highlight and glow. */
  glow?: string;
}

/** A framed app screenshot: glass border, top highlight, soft glow. */
export function Shot({ src, alt, width, height, glow = 'rgba(66, 135, 245, 0.55)', ...rest }: ShotProps) {
  return (
    <Box
      position="relative"
      borderRadius={{ base: '14px', md: '18px' }}
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.1)"
      bg="rgba(255, 255, 255, 0.03)"
      boxShadow="0 30px 80px rgba(0, 0, 0, 0.5)"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: '12%',
        right: '12%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${glow}, transparent)`,
        zIndex: 1,
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </Box>
  );
}

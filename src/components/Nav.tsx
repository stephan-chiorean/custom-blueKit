import { Box, Container, HStack, Image, Link, Text } from '@chakra-ui/react';
import catLogo from '../assets/cat.svg';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
];

export function Nav() {
  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="72px"
      zIndex={30}
      bg="rgba(5, 13, 31, 0.82)"
      borderBottom="1px solid rgba(255, 255, 255, 0.06)"
      style={{ backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)' }}
    >
      <Container maxW="1280px" h="full" px={{ base: '16px', md: '28px', lg: '36px' }}>
        <HStack h="full" justify="space-between" gap="20px">
          <Link
            href="#top"
            aria-label="blueKit home"
            display="inline-flex"
            alignItems="center"
            gap="10px"
            _hover={{ textDecoration: 'none' }}
          >
            <Image src={catLogo} alt="BlueKit logo" boxSize="42px" />
            <Text fontSize="33px" fontWeight="700" letterSpacing="-0.018em" lineHeight={1}>
              <Text as="span" color="primary.500">
                blue
              </Text>
              <Text as="span" color="white">
                Kit
              </Text>
            </Text>
          </Link>

          <HStack ml="auto" align="center" gap={{ base: '14px', md: '20px', lg: '28px' }}>
            <HStack display={{ base: 'none', md: 'flex' }} gap={{ md: '20px', lg: '28px' }}>
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  color="rgba(255, 255, 255, 0.72)"
                  fontSize="16px"
                  fontWeight="500"
                  transition="color 0.2s"
                  _hover={{ color: 'white', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              ))}
            </HStack>

            <Link
              href="#download"
              color="rgba(255, 255, 255, 0.72)"
              fontSize="16px"
              fontWeight="500"
              whiteSpace="nowrap"
              transition="color 0.2s"
              _hover={{ color: 'white', textDecoration: 'none' }}
            >
              Download
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

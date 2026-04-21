import { Box } from '@chakra-ui/react';
import { Download } from './components/Download';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Nav } from './components/Nav';
import { VideoSection } from './components/VideoSection';

export default function App() {
  return (
    <>
      <Box className="orbs" aria-hidden="true">
        <Box className="orb orb-a" />
        <Box className="orb orb-b" />
        <Box className="orb orb-c" />
      </Box>

      <Nav />

      <Box as="main" position="relative" zIndex={1}>
        <Hero />
        <VideoSection />
        <HowItWorks />
        <Download />
      </Box>

      <Footer />
    </>
  );
}

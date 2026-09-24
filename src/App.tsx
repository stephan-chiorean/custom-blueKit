import { Box } from '@chakra-ui/react';
import { Agents } from './components/Agents';
import { Download } from './components/Download';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Nav } from './components/Nav';
import { Thesis } from './components/Thesis';

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
        <Thesis />
        <Agents />
        <Features />
        <HowItWorks />
        <Download />
      </Box>

      <Footer />
    </>
  );
}

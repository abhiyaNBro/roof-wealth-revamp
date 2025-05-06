
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import ContactSection from '@/components/home/ContactSection';
import { CursorFollower, ScrollAnimation } from '@/components/Animation';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Elite Roof - America\'s Premier Roof Restoration Experts';
  }, []);
  
  // Animated scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-roofing-primary to-roofing-accent z-[100]"
        style={{ scaleX, originX: 0 }}
      />
      
      <CursorFollower />
      <ScrollAnimation />
      <Navbar />
      
      <main className="flex-grow relative overflow-x-hidden">
        <HeroSection />
        <ServiceSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

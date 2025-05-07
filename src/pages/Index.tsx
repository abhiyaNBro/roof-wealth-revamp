
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

const FloatingElement = ({ delay, size, position }: { delay: number, size: number, position: string }) => {
  return (
    <motion.div
      className={`fixed ${position} w-${size} h-${size} rounded-full bg-gradient-to-r from-roofing-primary/10 to-roofing-accent/20 blur-3xl z-0`}
      animate={{
        y: ['-10px', '10px', '-10px'],
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
      }}
    />
  );
};

const Index = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Elite Roof - America\'s Premier Roof Restoration Experts';
  }, []);
  
  // Animated scroll progress indicator with enhanced spring physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-roofing-primary to-roofing-accent z-[100]"
        style={{ scaleX, transformOrigin: "0%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      
      {/* Background floating elements */}
      <FloatingElement delay={0} size={64} position="top-[10%] right-[15%]" />
      <FloatingElement delay={1.5} size={80} position="top-[60%] left-[5%]" />
      <FloatingElement delay={0.7} size={96} position="bottom-[30%] right-[10%]" />
      
      <CursorFollower />
      <ScrollAnimation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
      </motion.div>
      
      <main className="flex-grow relative overflow-x-hidden">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <ServiceSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <AboutSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <ProjectsSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <TestimonialSection />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <ContactSection />
        </motion.div>
      </main>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;

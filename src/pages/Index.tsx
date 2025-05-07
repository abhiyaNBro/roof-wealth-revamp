
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import ContactSection from '@/components/home/ContactSection';
import { CursorFollower, ScrollAnimation } from '@/components/Animation';
import ParallaxEffect from '@/components/ParallaxEffect';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Update page title
  useEffect(() => {
    document.title = 'American Quality Restoration - America\'s Premier Roof Restoration Experts';
  }, []);
  
  // Set loaded state after a delay to allow for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Animated scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-white overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate={isLoaded ? "animate" : "initial"}
    >
      {/* Animated progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-roofing-primary to-roofing-accent z-[100]"
        style={{ scaleX, originX: 0 }}
      />
      
      {/* Animated loading overlay */}
      <motion.div
        className="fixed inset-0 bg-white z-[200] flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onAnimationComplete={() => {
          const elem = document.querySelector('.loading-overlay');
          if (elem) elem.remove();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [0.8, 1.2, 1] }}
          transition={{ duration: 0.8 }}
          className="loading-overlay"
        >
          <img 
            src="/lovable-uploads/88a8d195-6b47-42cf-8014-3f88cb5bb8e8.png" 
            alt="American Quality Restoration Logo" 
            className="h-32 w-auto"
          />
          <motion.div 
            className="h-1 w-36 mt-8 bg-gray-200 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-roofing-primary to-roofing-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced cursor and scroll animations */}
      <CursorFollower />
      <ScrollAnimation />
      <Navbar />
      
      <main className="flex-grow relative overflow-x-hidden">
        {/* Main content sections */}
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute right-0 top-[35%] w-32 h-32 rounded-full bg-roofing-accent/5 -z-1"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute left-10 top-[65%] w-64 h-64 rounded-full bg-roofing-primary/5 -z-1"
            animate={{
              y: [0, 40, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <ParallaxEffect speed={0.1} direction="up">
            <ServiceSection />
          </ParallaxEffect>
          
          <ScrollReveal animation="fade-in">
            <AboutSection />
          </ScrollReveal>
          
          <ParallaxEffect speed={0.05} direction="down">
            <ProjectsSection />
          </ParallaxEffect>
          
          <ScrollReveal animation="fade-in" delay={200}>
            <TestimonialSection />
          </ScrollReveal>
          
          <ContactSection />
        </motion.div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;

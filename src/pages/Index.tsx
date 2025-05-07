
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

const FloatingElement = ({ delay, size, position, color }: { delay: number, size: number, position: string, color?: string }) => {
  return (
    <motion.div
      className={`fixed ${position} w-${size} h-${size} rounded-full ${color || 'bg-gradient-to-r from-roofing-primary/10 to-roofing-accent/20'} blur-3xl z-0`}
      animate={{
        y: ['-15px', '15px', '-15px'],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
      }}
    />
  );
};

// New component for the featured image in the left side
const FeatureImage = () => {
  return (
    <motion.div 
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className="absolute inset-0 border-4 border-roofing-primary rounded-lg"
          animate={{ 
            boxShadow: ["0 0 0 rgba(211,84,0,0.3)", "0 0 20px rgba(211,84,0,0.6)", "0 0 0 rgba(211,84,0,0.3)"] 
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="w-56 h-72 rounded-lg overflow-hidden"
        >
          <motion.img
            src="/lovable-uploads/300028b0-ac0f-42f6-8892-385ca559a97b.png"
            alt="American Quality Restoration"
            className="w-full h-full object-cover"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-roofing-primary font-bold text-sm"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="textPath"
                d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                fill="none"
              />
              <text fill="currentColor">
                <textPath xlinkHref="#textPath">
                  • QUALITY RESTORATION •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <>
      {/* Enhanced background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-roofing-primary/30"
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-roofing-accent/30"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </>
  );
};

const Index = () => {
  // Update page title
  useEffect(() => {
    document.title = 'American Quality Restoration - America\'s Premier Roof Restoration Experts';
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
      
      {/* Enhanced background floating elements */}
      <FloatingElement delay={0} size={64} position="top-[10%] right-[15%]" />
      <FloatingElement delay={1.5} size={80} position="bottom-[10%] left-[5%]" color="bg-gradient-to-r from-roofing-accent/10 to-roofing-primary/20" />
      <FloatingElement delay={0.7} size={96} position="top-[60%] right-[10%]" />
      <FloatingElement delay={1.2} size={72} position="bottom-[40%] left-[20%]" />
      
      {/* Add the featured image component */}
      <FeatureImage />
      
      <AnimatedBackground />
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>
        
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

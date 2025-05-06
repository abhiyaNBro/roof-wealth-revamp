
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[120%] top-[-10%] bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1632958042421-b109b9e20922?q=80&w=2071&auto=format&fit=crop')`, 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Expert Roof <span className="text-roofing-accent">Restoration</span> for Your Home
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Premium roofing solutions with unmatched quality and durability. Protect your investment with America's trusted roof restoration experts.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Button size="lg" className="bg-roofing-accent hover:bg-roofing-accent/90 text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-roofing-accent/40">
              Get Free Estimate
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-roofing-dark transition-all duration-300 transform hover:scale-105">
              Our Services
            </Button>
          </motion.div>
          <motion.div 
            className="mt-12 flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <motion.div 
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-4xl font-bold text-roofing-accent">25+</p>
              <p className="text-white">Years Experience</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-4xl font-bold text-roofing-accent">1500+</p>
              <p className="text-white">Projects Completed</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-4xl font-bold text-roofing-accent">98%</p>
              <p className="text-white">Customer Satisfaction</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <div className="w-10 h-16 border-2 border-white rounded-full flex justify-center">
          <motion.div 
            className="w-2 h-4 bg-roofing-accent rounded-full mt-2" 
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

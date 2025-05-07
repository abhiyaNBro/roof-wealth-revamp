
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const controls = useAnimation();
  
  // Float animation for decorative elements
  useEffect(() => {
    controls.start({
      y: [0, -15, 0],
      transition: { 
        duration: 6, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);
  
  // Parallax effect on scroll
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
  
  // Scroll-driven animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Animated shapes */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-roofing-accent/10 blur-3xl -top-20 -right-20 z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-roofing-primary/10 blur-3xl left-10 top-40 z-10"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [45, 0, 45],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Parallax Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[120%] top-[-10%] bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1632958042421-b109b9e20922?q=80&w=2071&auto=format&fit=crop')`, 
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      
      {/* Animated particles - subtle roof-themed elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              y: [0, 100],
              opacity: [0.7, 0],
              scale: [1, 0.3]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative h-full container mx-auto px-4 flex flex-col justify-center z-20"
      >
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
            Expert Roof <motion.span 
              className="text-roofing-accent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >Restoration</motion.span> for Your Home
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-roofing-accent hover:bg-roofing-accent/90 text-white transition-all duration-300 shadow-lg shadow-roofing-accent/40">
                Get Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-roofing-dark transition-all duration-300">
                Our Services
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-wrap gap-4 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <motion.div 
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-4xl font-bold text-roofing-accent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >25+</motion.p>
              <p className="text-white">Years Experience</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-4xl font-bold text-roofing-accent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >1500+</motion.p>
              <p className="text-white">Projects Completed</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-4xl font-bold text-roofing-accent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >98%</motion.p>
              <p className="text-white">Customer Satisfaction</p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-1/4 right-10 w-20 h-20 opacity-30"
          animate={controls}
        >
          <div className="w-full h-full bg-white/10 rounded-md rotate-45" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-16 h-16 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 180, 360],
            transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full border border-white/20 rounded-full" />
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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
        <motion.div
          className="text-white text-xs mt-2 flex items-center justify-center font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          SCROLL DOWN <ArrowDown size={12} className="ml-1" />
        </motion.div>
      </motion.div>
    </section>
  );
}

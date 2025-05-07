
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Enhanced parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const floatingAnimation = {
    y: ['-3px', '3px', '-3px'],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-roofing-accent/5 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-roofing-primary/10 rounded-full blur-3xl z-0"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      {/* Parallax Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[120%] top-[-10%] bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1632958042421-b109b9e20922?q=80&w=2071&auto=format&fit=crop')`, 
            y
          }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Expert Roof <motion.span 
              className="text-roofing-accent"
              animate={{ 
                textShadow: ['0 0 8px rgba(211,84,0,0.3)', '0 0 16px rgba(211,84,0,0.6)', '0 0 8px rgba(211,84,0,0.3)'] 
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Restoration
            </motion.span> for Your Home
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-lg"
          >
            Premium roofing solutions with unmatched quality and durability. Protect your investment with America's trusted roof restoration experts.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" className="bg-roofing-accent hover:bg-roofing-accent/90 text-white transition-all duration-300 shadow-lg shadow-roofing-accent/40">
                Get Free Estimate
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-roofing-dark transition-all duration-300">
                Our Services
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            className="mt-12 flex flex-wrap gap-8"
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              variants={itemVariants}
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p animate={floatingAnimation} className="text-4xl font-bold text-roofing-accent">25+</motion.p>
              <p className="text-white">Years Experience</p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p animate={floatingAnimation} className="text-4xl font-bold text-roofing-accent">1500+</motion.p>
              <p className="text-white">Projects Completed</p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-lg hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p animate={floatingAnimation} className="text-4xl font-bold text-roofing-accent">98%</motion.p>
              <p className="text-white">Customer Satisfaction</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.2,
            duration: 0.8
          }
        }}
      >
        <motion.div
          className="w-10 h-16 border-2 border-white rounded-full flex justify-center"
          animate={{
            boxShadow: ['0 0 0 rgba(255,255,255,0.3)', '0 0 8px rgba(255,255,255,0.6)', '0 0 0 rgba(255,255,255,0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-2 h-4 bg-roofing-accent rounded-full mt-2" 
            animate={{ 
              y: [0, 8, 0],
              backgroundColor: ['#D35400', '#F39C12', '#D35400']
            }}
            transition={{
              y: { duration: 1.5, repeat: Infinity },
              backgroundColor: { duration: 2, repeat: Infinity }
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

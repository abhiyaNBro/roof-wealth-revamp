
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const onMouseEnter = () => {
      setIsVisible(true);
    };
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    
    // Track hover state for buttons and links
    const onHoverStart = () => {
      setIsHovering(true);
    };
    
    const onHoverEnd = () => {
      setIsHovering(false);
    };
    
    const onMouseDown = () => {
      setIsClicking(true);
    };
    
    const onMouseUp = () => {
      setIsClicking(false);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
      });
    };
  }, [isVisible, isHovering, isClicking]);
  
  return (
    <motion.div 
      ref={cursorRef} 
      className="cursor-follower hidden md:block"
      animate={{ 
        x: mousePosition.x, 
        y: mousePosition.y, 
        scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering ? 'rgba(211, 84, 0, 0.7)' : 'rgba(139, 94, 60, 0.7)'
      }}
      transition={{ 
        type: "spring",
        damping: isClicking ? 25 : 15,
        stiffness: 150,
        mass: 0.1
      }}
    />
  );
}

export function ScrollAnimation() {
  useEffect(() => {
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScrollReveal);
    };
  }, []);
  
  // Add a floating particles effect 
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }>>([]);
  
  useEffect(() => {
    // Create particles only on non-mobile devices
    if (window.innerWidth > 768) {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 0.2,
        opacity: Math.random() * 0.5 + 0.1
      }));
      
      setParticles(newParticles);
    }
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-roofing-primary"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
              scale: 0
            }}
            animate={{
              y: [particle.y, particle.y - 200 - particle.speed * 400],
              opacity: [particle.opacity, 0],
              scale: [0, particle.size]
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function AnimateOnScroll({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({ children, speed = 0.2 }: { children: React.ReactNode, speed?: number }) {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div
      style={{ y: scrollY * speed }}
    >
      {children}
    </motion.div>
  );
}

export function useScrollEffect(ref: React.RefObject<HTMLElement>, callback: (progress: number) => void) {
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
      const visiblePercentage = visibleHeight / rect.height;
      
      if (visiblePercentage > 0) {
        callback(visiblePercentage);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, callback]);
}

// Add a new animation component for enhanced visual effects
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-roofing-primary/10 to-roofing-accent/5 blur-3xl"
        animate={{
          x: [0, 10, 0, -10, 0],
          y: [0, 15, 0, -15, 0],
          scale: [1, 1.05, 1, 0.95, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-roofing-accent/10 to-roofing-primary/5 blur-3xl"
        animate={{
          x: [0, -15, 0, 15, 0],
          y: [0, -10, 0, 10, 0],
          scale: [1, 0.9, 1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}

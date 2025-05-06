
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
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
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
      });
    };
  }, [isVisible, isHovering]);
  
  return (
    <motion.div 
      ref={cursorRef} 
      className="cursor-follower"
      animate={{ 
        x: mousePosition.x, 
        y: mousePosition.y, 
        scale: isHovering ? 1.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ 
        type: "spring",
        damping: 15,
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
  
  return null;
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

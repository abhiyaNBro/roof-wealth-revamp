
import { useEffect, useState, useRef } from 'react';

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    const onMouseEnter = () => {
      setIsVisible(true);
    };
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);
  
  return (
    <div 
      ref={cursorRef} 
      className="cursor-follower" 
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  );
}

export function ScrollAnimation() {
  useEffect(() => {
    const handleScroll = () => {
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
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return null;
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

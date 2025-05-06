
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'zoom-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  className,
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-' + animation);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold,
      }
    );
    
    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animation, delay, threshold]);
  
  return (
    <div 
      ref={ref} 
      className={cn("opacity-0", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;


import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxEffectProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0-1, where 0 is no effect and 1 is full effect
  direction?: 'up' | 'down';
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  className,
  speed = 0.2,
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const elementTop = ref.current.getBoundingClientRect().top + scrollY;
      const elementHeight = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate when element is in view
      if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
        const relativeScroll = scrollY + windowHeight - elementTop;
        const percentageScrolled = relativeScroll / (elementHeight + windowHeight);
        
        // Calculate transform based on direction
        const translateY = direction === 'up' 
          ? -1 * speed * percentageScrolled * 100
          : speed * percentageScrolled * 100;
          
        ref.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);
  
  return (
    <div ref={ref} className={cn('transition-transform duration-300', className)}>
      {children}
    </div>
  );
};

export default ParallaxEffect;

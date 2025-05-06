
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
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
      {/* Parallax Background */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[120%] top-[-10%] bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1632958042421-b109b9e20922?q=80&w=2071&auto=format&fit=crop')`, 
            filter: 'brightness(0.65)'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
            Expert Roof Restoration for Your Home
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Premium roofing solutions with unmatched quality and durability. Protect your investment with America's trusted roof restoration experts.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-roofing-accent hover:bg-roofing-primary text-white">
              Get Free Estimate
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-roofing-dark">
              Our Services
            </Button>
          </div>
          <div className="mt-12 flex space-x-10">
            <div className="text-center">
              <p className="text-4xl font-bold text-roofing-accent">25+</p>
              <p className="text-white">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-roofing-accent">1500+</p>
              <p className="text-white">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-roofing-accent">98%</p>
              <p className="text-white">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 border-2 border-white rounded-full flex justify-center">
          <div className="w-2 h-4 bg-white rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
}

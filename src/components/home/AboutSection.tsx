
import { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../ScrollReveal';

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const scrollPercent = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
        imageRef.current.style.transform = `scale(${1 + scrollPercent * 0.1})`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <ScrollReveal>
                <div ref={imageRef} className="overflow-hidden rounded-lg shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop" 
                    alt="Roofers working on a house" 
                    className="w-full h-auto transform transition-transform duration-1000"
                  />
                </div>
              </ScrollReveal>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-lg z-20 max-w-xs animate-float">
                <div className="flex items-center">
                  <div className="bg-roofing-accent/10 rounded-full p-3 mr-4">
                    <span className="font-bold text-xl text-roofing-accent">25+</span>
                  </div>
                  <p className="text-gray-700">Years of trusted service in the roofing industry</p>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -left-10 -top-10 w-64 h-64 bg-roofing-accent/10 rounded-full -z-10"></div>
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <ScrollReveal animation="fade-in-right">
              <p className="text-roofing-primary font-medium mb-2">ABOUT US</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">America's Premier Roof Restoration Experts</h2>
              <div className="w-24 h-1 bg-roofing-accent mb-6"></div>
              <p className="text-gray-700 mb-8">
                For over 25 years, Elite Roof has been providing exceptional roofing solutions to homeowners and businesses across America. Our team of skilled professionals is committed to delivering the highest quality craftsmanship and customer service.
              </p>
              
              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  'Certified and insured roofing professionals',
                  'Premium materials and state-of-the-art equipment',
                  'Comprehensive warranties on all services',
                  'Eco-friendly and energy-efficient solutions'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="rounded-full bg-green-100 p-1 mr-3">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-roofing-primary hover:bg-roofing-accent">
                  Learn More
                </Button>
                <Button size="lg" variant="outline" className="border-roofing-primary text-roofing-primary hover:bg-roofing-primary hover:text-white">
                  Meet Our Team
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

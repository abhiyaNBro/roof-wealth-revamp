
import { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../ScrollReveal';
import ParallaxEffect from '../ParallaxEffect';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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

  const features = [
    {
      title: 'Certified Professionals',
      description: 'Our team consists of certified and insured roofing professionals',
      icon: <Check className="w-5 h-5 text-green-600" />
    },
    {
      title: 'Premium Materials',
      description: 'We use premium materials and state-of-the-art equipment',
      icon: <Check className="w-5 h-5 text-green-600" />
    },
    {
      title: 'Comprehensive Warranties',
      description: 'All our services come with comprehensive warranties',
      icon: <Check className="w-5 h-5 text-green-600" />
    },
    {
      title: 'Eco-Friendly Solutions',
      description: 'We provide eco-friendly and energy-efficient solutions',
      icon: <Check className="w-5 h-5 text-green-600" />
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Section with Enhanced Animation */}
          <div className="relative order-2 lg:order-1">
            <ScrollReveal animation="fade-in-left" threshold={0.2}>
              <div className="relative z-10">
                <div ref={imageRef} className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-1000">
                  <img 
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop" 
                    alt="Roofers working on a house" 
                    className="w-full h-auto hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                
                {/* Floating Experience Card */}
                <ParallaxEffect speed={0.1} direction="up" className="absolute -bottom-10 -right-10 z-20">
                  <Card className="bg-white p-6 rounded-lg shadow-xl max-w-xs animate-float">
                    <CardContent className="p-0">
                      <div className="flex items-center">
                        <div className="bg-roofing-accent/10 rounded-full p-3 mr-4">
                          <span className="font-bold text-xl text-roofing-accent">25+</span>
                        </div>
                        <p className="text-gray-700 font-medium">Years of trusted service in the roofing industry</p>
                      </div>
                    </CardContent>
                  </Card>
                </ParallaxEffect>
                
                {/* Stats Card */}
                <ParallaxEffect speed={0.15} direction="down" className="absolute -top-8 -left-8 z-20">
                  <Card className="bg-roofing-primary text-white p-4 rounded-lg shadow-xl">
                    <CardContent className="p-0">
                      <p className="text-2xl font-bold">5000+</p>
                      <p className="text-sm">Satisfied Clients</p>
                    </CardContent>
                  </Card>
                </ParallaxEffect>
              </div>
            </ScrollReveal>
              
            {/* Background Decoration */}
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-roofing-accent/5 rounded-full -z-10"></div>
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-roofing-primary/5 rounded-full -z-10"></div>
          </div>
          
          {/* Content Section with Enhanced Text and Animations */}
          <div className="order-1 lg:order-2">
            <ScrollReveal animation="fade-in-right" delay={100}>
              <p className="text-roofing-primary font-medium mb-2 inline-block px-4 py-1 rounded-full bg-roofing-primary/10">ABOUT US</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-gradient">America's Premier Roof Restoration Experts</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-roofing-primary to-roofing-accent mb-8"></div>
              <p className="text-gray-700 mb-10 text-lg leading-relaxed">
                For over <span className="font-semibold text-roofing-primary">25 years</span>, Elite Roof has been providing exceptional roofing solutions to homeowners and businesses across America. Our team of skilled professionals is committed to delivering the highest quality craftsmanship and customer service.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => (
                  <ScrollReveal key={index} delay={index * 100} animation="zoom-in">
                    <div className="flex hover-lift bg-white p-4 rounded-lg shadow-md">
                      <div className="rounded-full bg-green-100 p-2 mr-4 self-start">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-roofing-primary to-roofing-accent text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  Learn More
                </Button>
                <Button size="lg" variant="outline" className="border-roofing-primary text-roofing-primary hover:bg-roofing-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
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

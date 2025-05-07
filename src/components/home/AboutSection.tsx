
import { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../ScrollReveal';
import ParallaxEffect from '../ParallaxEffect';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Image Section with Enhanced Animation */}
          <motion.div variants={itemVariants} className="relative order-2 lg:order-1">
            <div className="relative z-10">
              <motion.div 
                ref={imageRef} 
                className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-1000"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop" 
                  alt="Roofers working on a house" 
                  className="w-full h-auto"
                />
              </motion.div>
              
              {/* Floating Experience Card */}
              <ParallaxEffect speed={0.1} direction="up" className="absolute -bottom-10 -right-10 z-20">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Card className="bg-white p-6 rounded-lg shadow-xl max-w-xs">
                    <CardContent className="p-0">
                      <div className="flex items-center">
                        <motion.div 
                          className="bg-roofing-accent/10 rounded-full p-3 mr-4"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <span className="font-bold text-xl text-roofing-accent">25+</span>
                        </motion.div>
                        <p className="text-gray-700 font-medium">Years of trusted service in the roofing industry</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxEffect>
              
              {/* Stats Card */}
              <ParallaxEffect speed={0.15} direction="down" className="absolute -top-8 -left-8 z-20">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Card className="bg-roofing-primary text-white p-4 rounded-lg shadow-xl">
                    <CardContent className="p-0">
                      <motion.p 
                        className="text-2xl font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        5000+
                      </motion.p>
                      <p className="text-sm">Satisfied Clients</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxEffect>
            </div>
              
            {/* Background Decoration */}
            <motion.div 
              className="absolute -left-10 -bottom-10 w-64 h-64 bg-roofing-accent/5 rounded-full -z-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -right-20 -top-20 w-80 h-80 bg-roofing-primary/5 rounded-full -z-10"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Content Section with Enhanced Text and Animations */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <motion.p 
              className="text-roofing-primary font-medium mb-2 inline-block px-4 py-1 rounded-full bg-roofing-primary/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              ABOUT US
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-5xl font-serif font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              America's Premier Roof Restoration Experts
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-roofing-primary to-roofing-accent mb-8"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            <motion.p 
              className="text-gray-700 mb-10 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              For over <span className="font-semibold text-roofing-primary">25 years</span>, Elite Roof has been providing exceptional roofing solutions to homeowners and businesses across America. Our team of skilled professionals is committed to delivering the highest quality craftsmanship and customer service.
            </motion.p>
            
            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex hover-lift bg-white p-4 rounded-lg shadow-md"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="rounded-full bg-green-100 p-2 mr-4 self-start">
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-roofing-primary to-roofing-accent text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  Learn More
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-roofing-primary text-roofing-primary hover:bg-roofing-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                  Meet Our Team
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

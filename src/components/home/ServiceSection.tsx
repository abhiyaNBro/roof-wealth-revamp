
import { motion } from 'framer-motion';
import { Shield, Home, Settings, Star, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  index: number;
  highlight?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index, highlight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <motion.div 
        className={`bg-white rounded-lg shadow-lg p-8 border border-gray-100 h-full relative overflow-hidden ${highlight ? 'ring-2 ring-roofing-accent ring-offset-2' : ''}`}
        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-roofing-accent/5 rounded-full -mr-16 -mt-16 z-0 
                      transition-all duration-500 group-hover:bg-roofing-accent/10 group-hover:scale-150" />
        
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-roofing-primary/5 rounded-full -ml-12 -mb-12 z-0 
                      transition-all duration-500 group-hover:bg-roofing-primary/10" />
        
        <div className="relative z-10">
          <div className={`rounded-full ${highlight ? 'bg-roofing-primary/20' : 'bg-roofing-light'} p-4 inline-block mb-6 group-hover:bg-roofing-primary/10 transition-colors`}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              {icon}
            </motion.div>
          </div>
          <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-roofing-primary transition-colors">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <a href="#" className="text-roofing-primary font-medium inline-flex items-center relative overflow-hidden group">
            <span className="relative z-10">Learn More</span>
            <span className="absolute h-0.5 bg-roofing-primary w-0 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
            <motion.div
              className="ml-2 relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const services = [
  {
    icon: <Plane className="w-8 h-8 text-roofing-primary" />,
    title: "Free Drone Inspection",
    description: "Cutting-edge drone technology to inspect your roof safely and thoroughly without any cost to you.",
    highlight: true
  },
  {
    icon: <Home className="w-8 h-8 text-roofing-primary" />,
    title: "Roof Restoration",
    description: "Complete roof restoration services to bring your roof back to its original condition or better."
  },
  {
    icon: <Settings className="w-8 h-8 text-roofing-primary" />,
    title: "Roof Repairs",
    description: "Quick and reliable roof repair services to fix leaks, damage, and other roofing issues."
  },
  {
    icon: <Shield className="w-8 h-8 text-roofing-primary" />,
    title: "Roof Protection",
    description: "Premium protective coatings and treatments to extend the life of your roof and prevent damage."
  }
];

export default function ServiceSection() {
  const isMobile = useIsMobile();

  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: `url(/lovable-uploads/300028b0-ac0f-42f6-8892-385ca559a97b.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-roofing-accent/5 rounded-full opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-roofing-primary/5 rounded-full opacity-70"></div>
          
          <p className="text-roofing-primary font-medium mb-2 relative">OUR SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 relative">Complete Roofing Solutions</h2>
          
          <div className="relative">
            <div className="w-24 h-1 bg-roofing-accent mx-auto"></div>
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-roofing-primary"
              animate={{ width: ["0%", "60%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
              index={index}
              highlight={service.highlight}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button 
            className="bg-roofing-primary hover:bg-roofing-accent transition-all duration-300 transform hover:scale-105 shadow-lg shadow-roofing-primary/20"
          >
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

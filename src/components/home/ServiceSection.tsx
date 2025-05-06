
import ScrollReveal from '../ScrollReveal';
import { Shield, Home, Settings, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <ScrollReveal delay={delay} className="group">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:border-roofing-primary transition-all duration-300 hover:-translate-y-2">
        <div className="rounded-full bg-roofing-light p-4 inline-block mb-6 group-hover:bg-roofing-primary/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-roofing-primary transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="#" className="text-roofing-primary font-medium inline-flex items-center">
          Learn More
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </ScrollReveal>
  );
};

const services = [
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
  },
  {
    icon: <Star className="w-8 h-8 text-roofing-primary" />,
    title: "Roof Inspections",
    description: "Thorough roof inspections to identify potential issues before they become major problems."
  }
];

export default function ServiceSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-roofing-primary font-medium mb-2">OUR SERVICES</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Complete Roofing Solutions</h2>
            <div className="w-24 h-1 bg-roofing-accent mx-auto"></div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
              delay={index * 100}
            />
          ))}
        </div>
        
        <ScrollReveal>
          <div className="mt-16 text-center">
            <Button className="bg-roofing-primary hover:bg-roofing-accent">
              View All Services
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

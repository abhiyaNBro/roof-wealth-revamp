
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center"
        >
          <motion.img 
            src="/lovable-uploads/88a8d195-6b47-42cf-8014-3f88cb5bb8e8.png" 
            alt="American Quality Restoration Logo" 
            className="h-14 w-auto" 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={cn(
                'font-medium hover:text-roofing-accent transition-colors',
                isScrolled ? 'text-roofing-dark' : 'text-white'
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button className="bg-roofing-accent hover:bg-roofing-primary transition-colors">
              <Phone size={16} className="mr-2" />
              (555) 123-4567
            </Button>
          </motion.div>
        </nav>
        
        {/* Mobile Navigation Trigger */}
        <motion.button
          className={cn(
            'md:hidden rounded-full p-2 transition-colors',
            isScrolled 
              ? 'text-roofing-dark hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <motion.div
        className={cn(
          'fixed inset-0 bg-roofing-dark bg-opacity-95 z-50 flex flex-col transition-all duration-300 md:hidden',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1 } : { opacity: 0 }}
      >
        <div className="flex justify-end p-6">
          <button
            className="text-white hover:text-roofing-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col items-center justify-center flex-grow space-y-8 p-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-roofing-accent text-xl font-medium transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, x: 5 }}
            >
              {item.name}
            </motion.a>
          ))}
          <Button className="bg-roofing-accent hover:bg-roofing-primary transition-colors mt-4">
            <Phone size={16} className="mr-2" />
            (555) 123-4567
          </Button>
        </nav>
      </motion.div>
    </header>
  );
}

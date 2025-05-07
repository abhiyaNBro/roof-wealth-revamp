
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    console.log('Email would be sent to: americanqualityrestoration21@gmail.com');
    setEmail('');
    toast({
      title: "Newsletter Subscription",
      description: "Thank you for subscribing to our newsletter!",
      duration: 5000,
    });
  };

  const socialIcons = [
    { name: 'facebook', icon: <Facebook size={18} />, color: 'hover:bg-blue-600', link: 'https://facebook.com' },
    { name: 'twitter', icon: <Twitter size={18} />, color: 'hover:bg-sky-500', link: 'https://twitter.com' },
    { name: 'instagram', icon: <Instagram size={18} />, color: 'hover:bg-pink-600', link: 'https://instagram.com' },
    { name: 'youtube', icon: <Youtube size={18} />, color: 'hover:bg-red-600', link: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-roofing-dark text-white relative overflow-hidden">
      {/* Enhanced Background Design Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <motion.div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-roofing-primary"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-roofing-primary to-roofing-accent"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%'],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.img 
                src="/lovable-uploads/88a8d195-6b47-42cf-8014-3f88cb5bb8e8.png"
                alt="American Quality Restoration Logo" 
                className="h-14 w-auto mb-4" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
            <p className="text-gray-300 max-w-xs">
              Providing exceptional roof restoration services across America since 1995.
              We pride ourselves on quality workmanship and customer satisfaction.
            </p>
            <div className="flex space-x-4 pt-4">
              {/* Social Icons with enhanced animations */}
              {socialIcons.map((social) => (
                <motion.a 
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer" 
                  key={social.name}
                  className={`w-10 h-10 rounded-full bg-white/10 ${social.color} flex items-center justify-center transition-colors duration-300`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    y: { type: "spring", stiffness: 300 },
                    opacity: { duration: 0.5 }
                  }}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'About Us', 'Projects', 'Testimonials', 'Contact'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-roofing-accent transition-colors duration-300"
                  >
                    <motion.span 
                      whileHover={{ x: 5 }} 
                      className="inline-block"
                    >
                      {link}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-start"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-roofing-accent mr-3 mt-1" />
                <span className="text-gray-300">
                  2200 Perry Ave<br />
                  Edgewood, MD 21040
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-roofing-accent mr-3" />
                <span className="text-gray-300">(555) 123-4567</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-roofing-accent mr-3" />
                <span className="text-gray-300">americanqualityrestoration21@gmail.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-semibold">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter to receive the latest news and special offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden"
              >
                <Button className="w-full bg-roofing-accent hover:bg-roofing-primary">
                  Subscribe
                </Button>
                <motion.div
                  className="absolute inset-0 -z-10" 
                  animate={{
                    background: ['linear-gradient(90deg, rgba(211,84,0,0.5) 0%, rgba(211,84,0,0) 100%)', 
                                'linear-gradient(90deg, rgba(211,84,0,0) 0%, rgba(211,84,0,0.5) 100%)']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-gray-400 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} American Quality Restoration. All rights reserved.
          </motion.div>
          <div className="text-gray-400 text-sm">
            <motion.a 
              href="#" 
              className="hover:text-white mr-6"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-white"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

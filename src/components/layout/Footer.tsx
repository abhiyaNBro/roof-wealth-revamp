
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
    // You could add toast notification here
  };

  return (
    <footer className="bg-roofing-dark text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold">
              <span className="text-roofing-accent">Elite</span> Roof
            </h3>
            <p className="text-gray-300 max-w-xs">
              Providing exceptional roof restoration services across America since 1995.
              We pride ourselves on quality workmanship and customer satisfaction.
            </p>
            <div className="flex space-x-4 pt-4">
              {/* Social Icons */}
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  href="#"
                  key={social}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-roofing-accent flex items-center justify-center transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'About Us', 'Projects', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-roofing-accent transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-roofing-accent mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Roofing Way<br />
                  Construction City, USA 12345
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-roofing-accent mr-3" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-roofing-accent mr-3" />
                <span className="text-gray-300">info@eliteroofusa.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
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
              <Button className="w-full bg-roofing-accent hover:bg-roofing-primary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Elite Roof. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm">
            <a href="#" className="hover:text-white mr-6">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

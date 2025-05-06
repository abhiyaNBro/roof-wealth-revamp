
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent Successfully",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-roofing-primary/5 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-roofing-accent/10 rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-roofing-primary font-medium mb-2">CONTACT US</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Get In Touch With Our Team</h2>
            <div className="w-24 h-1 bg-roofing-accent mx-auto"></div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <ScrollReveal animation="fade-in-right" className="lg:col-span-1">
            <div className="bg-roofing-dark text-white rounded-xl p-8 h-full">
              <h3 className="text-2xl font-serif font-semibold mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-roofing-accent/20 rounded-full p-3 mr-4">
                    <MapPin className="w-5 h-5 text-roofing-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Location</h4>
                    <p className="text-gray-300">
                      123 Roofing Way<br />
                      Construction City, USA 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-roofing-accent/20 rounded-full p-3 mr-4">
                    <Phone className="w-5 h-5 text-roofing-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-gray-300">(555) 123-4567</p>
                    <p className="text-gray-300">(555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-roofing-accent/20 rounded-full p-3 mr-4">
                    <Mail className="w-5 h-5 text-roofing-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-gray-300">info@eliteroofusa.com</p>
                    <p className="text-gray-300">support@eliteroofusa.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
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
            </div>
          </ScrollReveal>
          
          {/* Contact Form */}
          <ScrollReveal animation="fade-in-left" className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-serif font-semibold mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Roof Restoration">Roof Restoration</option>
                      <option value="Roof Repair">Roof Repair</option>
                      <option value="Roof Protection">Roof Protection</option>
                      <option value="Roof Inspection">Roof Inspection</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your roofing needs..."
                    rows={5}
                    required
                    className="w-full"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-roofing-primary hover:bg-roofing-accent">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Map */}
        <ScrollReveal delay={200}>
          <div className="mt-16 rounded-xl overflow-hidden shadow-lg h-80 bg-gray-200">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600">Map placeholder - Google Maps would be integrated here</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

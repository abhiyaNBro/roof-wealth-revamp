
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import GoogleMapReact from 'google-map-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  service: z.string().min(1, { message: 'Please select a service' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

const MapMarker = () => (
  <div className="relative -translate-x-1/2 -translate-y-full">
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-roofing-accent rounded-full border-4 border-white shadow-lg" />
    <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
      <p className="font-semibold text-roofing-dark">Elite Roof HQ</p>
    </div>
  </div>
);

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log('Form submitted:', values);
    
    // Simulate API call
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormSubmitted(true);
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Default map center (Chicago)
  const defaultProps = {
    center: {
      lat: 41.8781,
      lng: -87.6298
    },
    zoom: 14
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-roofing-accent/10 rounded-full -translate-x-1/2 translate-y-1/2 -z-10"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-roofing-primary/5 rounded-full translate-x-1/2 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-roofing-primary font-medium mb-2">CONTACT US</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Get In Touch With Our Team</h2>
          <div className="w-24 h-1 bg-roofing-accent mx-auto relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-roofing-primary"
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-roofing-dark text-white rounded-xl p-8 h-full shadow-xl relative overflow-hidden"
            >
              {/* Abstract Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-roofing-primary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-roofing-accent/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-serif font-semibold mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="flex items-start group">
                    <div className="bg-roofing-accent/20 rounded-full p-3 mr-4 group-hover:bg-roofing-accent/30 transition-colors">
                      <MapPin className="w-5 h-5 text-roofing-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Our Location</h4>
                      <p className="text-gray-300">
                        123 Roofing Way<br />
                        Chicago, IL 60601
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start group">
                    <div className="bg-roofing-accent/20 rounded-full p-3 mr-4 group-hover:bg-roofing-accent/30 transition-colors">
                      <Phone className="w-5 h-5 text-roofing-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Call Us</h4>
                      <p className="text-gray-300">(555) 123-4567</p>
                      <p className="text-gray-300">(555) 987-6543</p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex items-start group">
                    <div className="bg-roofing-accent/20 rounded-full p-3 mr-4 group-hover:bg-roofing-accent/30 transition-colors">
                      <Mail className="w-5 h-5 text-roofing-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email Us</h4>
                      <p className="text-gray-300">info@eliteroofusa.com</p>
                      <p className="text-gray-300">support@eliteroofusa.com</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-12">
                  <h4 className="font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                      <motion.a 
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        href="#"
                        key={social}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-roofing-accent flex items-center justify-center transition-colors duration-300"
                      >
                        <span className="sr-only">{social}</span>
                        <div className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-serif font-semibold mb-6">Send Us a Message</h3>
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                >
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h4>
                  <p className="text-green-700 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <Button 
                    variant="outline" 
                    className="border-green-500 text-green-600 hover:bg-green-50" 
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Your Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John Smith"
                                className="w-full focus:ring-roofing-primary focus:border-roofing-primary"
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="john@example.com"
                                className="w-full focus:ring-roofing-primary focus:border-roofing-primary"
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="(555) 123-4567"
                                className="w-full focus:ring-roofing-primary focus:border-roofing-primary"
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Service Needed</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-roofing-primary focus:border-roofing-primary"
                                disabled={isSubmitting}
                              >
                                <option value="" disabled>Select a service</option>
                                <option value="Roof Restoration">Roof Restoration</option>
                                <option value="Roof Repair">Roof Repair</option>
                                <option value="Roof Protection">Roof Protection</option>
                                <option value="Roof Inspection">Roof Inspection</option>
                                <option value="Other">Other</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your roofing needs..."
                              rows={5}
                              className="w-full focus:ring-roofing-primary focus:border-roofing-primary"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-roofing-primary hover:bg-roofing-accent transition-colors shadow-lg shadow-roofing-primary/20"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Map */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl overflow-hidden shadow-xl h-96"
        >
          <div className="w-full h-full">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }} // You would need to add your Google Maps API key here
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              options={{
                styles: [
                  {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      { "color": "#8B5E3C" }
                    ]
                  },
                  {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                      { "color": "#F5F5F5" }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                      { "color": "#D1E5F5" }
                    ]
                  }
                ]
              }}
            >
              <MapMarker lat={41.8781} lng={-87.6298} />
            </GoogleMapReact>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

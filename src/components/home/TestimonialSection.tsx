
import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../ScrollReveal';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Johnson',
    position: 'Homeowner, Texas',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'Elite Roof restored our aging roof beautifully. Their team was professional, efficient, and left our property spotless. The roof looks brand new and has already withstood several heavy storms without issue.'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    position: 'Property Manager, California',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'As a property manager overseeing multiple buildings, I needed a reliable roofing partner. Elite Roof has consistently delivered exceptional service across all our properties, with transparent pricing and excellent communication.'
  },
  {
    id: 3,
    name: 'David Chen',
    position: 'Business Owner, Florida',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'When our commercial building needed roof restoration, Elite Roof worked around our business hours to minimize disruption. Their team was knowledgeable, efficient, and the quality of work exceeded our expectations.'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    position: 'Homeowner, New York',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    rating: 5,
    text: 'After a severe storm damaged our roof, Elite Roof came to the rescue. They helped with the insurance claim and restored our roof quickly. Their attention to detail and customer service is unmatched.'
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const nextSlide = () => {
    const next = (activeIndex + 1) % testimonials.length;
    goToSlide(next);
  };
  
  const prevSlide = () => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prev);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-roofing-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-roofing-accent/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-roofing-primary font-medium mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-roofing-accent mx-auto"></div>
          </div>
        </ScrollReveal>
        
        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonials */}
          <div 
            ref={testimonialsRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                    {/* Rating */}
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          fill={i < testimonial.rating ? "#D35400" : "none"} 
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-roofing-accent" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 text-lg mb-8 italic">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-lg">{testimonial.name}</p>
                        <p className="text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            disabled={isAnimating}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            disabled={isAnimating}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  activeIndex === index ? "bg-roofing-primary" : "bg-gray-300"
                )}
              ></button>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <ScrollReveal delay={200}>
          <div className="mt-16 text-center">
            <Button className="bg-roofing-primary hover:bg-roofing-accent">
              View All Reviews
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

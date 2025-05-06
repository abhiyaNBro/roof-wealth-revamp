
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import ContactSection from '@/components/home/ContactSection';
import { CursorFollower, ScrollAnimation } from '@/components/Animation';

const Index = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Elite Roof - America\'s Premier Roof Restoration Experts';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <CursorFollower />
      <ScrollAnimation />
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <ServiceSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

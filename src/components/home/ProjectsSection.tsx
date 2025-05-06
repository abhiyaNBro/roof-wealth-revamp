
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../ScrollReveal';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Colonial Home Restoration',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1593604572577-1c6c44fa246c?q=80&w=2069&auto=format&fit=crop',
    description: 'Complete roof restoration for a historic colonial home in New England.'
  },
  {
    id: 2,
    title: 'Modern Apartment Complex',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1580227974546-fbd48825d991?q=80&w=2042&auto=format&fit=crop',
    description: 'Roof replacement for a 12-unit apartment complex in Chicago.'
  },
  {
    id: 3,
    title: 'Shingle Repair Project',
    category: 'Repair',
    image: 'https://images.unsplash.com/photo-1535649168324-2473397db90c?q=80&w=2070&auto=format&fit=crop',
    description: 'Emergency shingle repair after storm damage in Florida.'
  },
  {
    id: 4,
    title: 'New Construction Project',
    category: 'Installation',
    image: 'https://images.unsplash.com/photo-1628082878598-ed1180d80d8c?q=80&w=1931&auto=format&fit=crop',
    description: 'New roof installation for a custom home build in Colorado.'
  },
  {
    id: 5,
    title: 'Tile Roof Restoration',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=2031&auto=format&fit=crop',
    description: 'Tile roof restoration for a Mediterranean-style home in California.'
  },
  {
    id: 6,
    title: 'Commercial Office Building',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1621614644749-564dd65d7378?q=80&w=1965&auto=format&fit=crop',
    description: 'Complete roof system for a 5-story office building in Texas.'
  },
];

const categories = ['All', 'Restoration', 'Repair', 'Installation', 'Commercial'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-roofing-primary font-medium mb-2">OUR PROJECTS</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Featured Roof Restoration Projects</h2>
            <div className="w-24 h-1 bg-roofing-accent mx-auto"></div>
          </div>
        </ScrollReveal>
        
        {/* Filter Buttons */}
        <ScrollReveal delay={100}>
          <div className="flex justify-center flex-wrap gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-5 py-2 rounded-full transition-all duration-300',
                  activeCategory === category
                    ? 'bg-roofing-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-roofing-primary/10'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-roofing-light text-roofing-primary text-sm rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-roofing-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <a href="#" className="text-roofing-primary font-medium inline-flex items-center">
                    View Project
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* View More Button */}
        <ScrollReveal delay={300}>
          <div className="mt-12 text-center">
            <Button className="bg-roofing-primary hover:bg-roofing-accent">
              View All Projects
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../ScrollReveal';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import ParallaxEffect from '../ParallaxEffect';
import { motion, useAnimation, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Colonial Home Restoration',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1593604572577-1c6c44fa246c?q=80&w=2069&auto=format&fit=crop',
    description: 'Complete roof restoration for a historic colonial home in New England.',
    location: 'Boston, MA',
    year: '2023'
  },
  {
    id: 2,
    title: 'Modern Apartment Complex',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1580227974546-fbd48825d991?q=80&w=2042&auto=format&fit=crop',
    description: 'Roof replacement for a 12-unit apartment complex in Chicago.',
    location: 'Chicago, IL',
    year: '2023'
  },
  {
    id: 3,
    title: 'Shingle Repair Project',
    category: 'Repair',
    image: 'https://images.unsplash.com/photo-1535649168324-2473397db90c?q=80&w=2070&auto=format&fit=crop',
    description: 'Emergency shingle repair after storm damage in Florida.',
    location: 'Miami, FL',
    year: '2022'
  },
  {
    id: 4,
    title: 'New Construction Project',
    category: 'Installation',
    image: 'https://images.unsplash.com/photo-1628082878598-ed1180d80d8c?q=80&w=1931&auto=format&fit=crop',
    description: 'New roof installation for a custom home build in Colorado.',
    location: 'Denver, CO',
    year: '2023'
  },
  {
    id: 5,
    title: 'Tile Roof Restoration',
    category: 'Restoration',
    image: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=2031&auto=format&fit=crop',
    description: 'Tile roof restoration for a Mediterranean-style home in California.',
    location: 'San Diego, CA',
    year: '2022'
  },
  {
    id: 6,
    title: 'Commercial Office Building',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1621614644749-564dd65d7378?q=80&w=1965&auto=format&fit=crop',
    description: 'Complete roof system for a 5-story office building in Texas.',
    location: 'Austin, TX',
    year: '2023'
  },
];

const categories = ['All', 'Restoration', 'Repair', 'Installation', 'Commercial'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const projectsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div 
        className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-gray-100/30 -z-10"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-roofing-primary/10 mb-3">
            <p className="text-roofing-primary font-medium">OUR PROJECTS</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-gradient">Featured Roof Restoration Projects</h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-roofing-primary to-roofing-accent mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our portfolio of successful roofing projects across America. From historic restorations 
            to modern installations, we deliver quality craftsmanship for every client.
          </p>
        </motion.div>
        
        {/* Filter Buttons with Animation */}
        <motion.div variants={itemVariants} className="flex justify-center flex-wrap gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-5 py-2 rounded-full transition-all duration-300 transform',
                activeCategory === category
                  ? 'bg-gradient-to-r from-roofing-primary to-roofing-accent text-white scale-105 shadow-md'
                  : 'bg-white text-gray-700 hover:bg-roofing-primary/10',
                index === 0 ? '' : 'ml-2'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects Grid with Enhanced Card Design */}
        <motion.div 
          ref={projectsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Card 
                className={cn(
                  "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500",
                  hoveredProject === project.id ? "transform -translate-y-2" : ""
                )}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div className="relative overflow-hidden h-64" whileHover={{ scale: 1.05 }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-1000 scale-100",
                      hoveredProject === project.id ? "scale-110" : ""
                    )}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"
                    whileHover={{ opacity: 0.9 }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <motion.span 
                      className="inline-block px-3 py-1 bg-roofing-accent/80 text-white text-sm rounded-full mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-light">{project.location}</span>
                      <span className="text-sm font-light">{project.year}</span>
                    </div>
                  </div>
                </motion.div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-roofing-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="pt-3 border-t border-gray-200">
                    <motion.a 
                      href="#" 
                      className="inline-flex items-center text-roofing-primary font-medium group-hover:translate-x-1 transition-transform"
                      whileHover={{ x: 5 }}
                    >
                      View Project
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View More Button with Enhanced Animation */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-gradient-to-r from-roofing-primary to-roofing-accent text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              View All Projects
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Statistics */}
        {!isMobile && (
          <>
            <ParallaxEffect speed={0.1} className="absolute -left-8 bottom-40">
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-lg rotate-3"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [3, 5, 3]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-3xl font-bold text-roofing-primary">250+</p>
                <p className="text-sm text-gray-600">Projects Completed</p>
              </motion.div>
            </ParallaxEffect>
            
            <ParallaxEffect speed={0.15} className="absolute right-8 top-1/4">
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-lg -rotate-3"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [-3, -5, -3]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-3xl font-bold text-roofing-accent">100%</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </motion.div>
            </ParallaxEffect>
          </>
        )}
      </motion.div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ArrowDown, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ChatWidget } from './components/ChatWidget';
import { Project, NavItem } from './types';

// Mock Data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Obsidian Tower",
    category: "Residential",
    year: "2024",
    imageUrl: "https://picsum.photos/seed/arch1/800/1200",
    description: "A monolithic structure rising from the dense urban fabric. Black concrete and tinted glass create a void in the skyline."
  },
  {
    id: 2,
    title: "Silence Pavilion",
    category: "Cultural",
    year: "2023",
    imageUrl: "https://picsum.photos/seed/arch2/800/1000",
    description: "Designed for auditory isolation. The brutalist geometry reflects sound outward, creating a sanctuary of absolute silence within."
  },
  {
    id: 3,
    title: "Nordic Cliffside",
    category: "Residential",
    year: "2023",
    imageUrl: "https://picsum.photos/seed/arch3/800/1200",
    description: "Cantilevered over a 200m drop. The structure anchors itself into the granite, becoming an extension of the mountain."
  },
  {
    id: 4,
    title: "Sector 7 Library",
    category: "Public",
    year: "2022",
    imageUrl: "https://picsum.photos/seed/arch4/800/1000",
    description: "A fortress for knowledge. Thick walls regulate temperature passively, protecting the archives from harsh desert climates."
  },
  {
    id: 5,
    title: "Neon Void",
    category: "Commercial",
    year: "2024",
    imageUrl: "https://picsum.photos/seed/arch5/800/1200",
    description: "Retail space reimagined as an art installation. Light serves as the primary material, carving spaces out of darkness."
  },
  {
    id: 6,
    title: "The Monolith",
    category: "Monument",
    year: "2021",
    imageUrl: "https://picsum.photos/seed/arch6/800/1000",
    description: "A tribute to the unknown. No windows, no doors visible from the facade. Entry is subterranean."
  }
];

const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Custom cursor logic could go here, but keeping it native for performance in this demo
  
  return (
    <div className="bg-[#050505] min-h-screen text-neutral-200 selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
        <a href="#" className="text-2xl font-bold tracking-[0.2em] font-mono z-50 relative">VOID</a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-xs uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 relative text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Fullscreen Menu */}
        <motion.div 
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? 'auto' : 'none' }}
          className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-light uppercase tracking-widest hover:text-neutral-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y }} className="w-full h-full relative">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://picsum.photos/seed/brutalist/1920/1080" 
              alt="Hero Architecture" 
              className="w-full h-full object-cover grayscale brightness-75"
            />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base font-mono text-neutral-300 mb-6 tracking-[0.5em] uppercase"
          >
            Est. 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-8 text-white mix-blend-overlay"
          >
            Constructing <br /> Silence
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="max-w-md mx-auto text-neutral-400 text-sm md:text-lg leading-relaxed font-light"
          >
            We explore the relationship between the void and the volume. Subtractive architecture for a noisy world.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 animate-bounce"
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <ArrowDown size={16} />
        </motion.div>
      </header>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-mono text-neutral-500 mb-8 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-[1px] bg-neutral-700"></span>
              Philosophy
            </h2>
            <p className="text-3xl md:text-5xl font-light leading-tight mb-8 text-neutral-200">
              "Architecture is not about filling space. It is about creating it."
            </p>
            <p className="text-neutral-400 leading-relaxed mb-8 max-w-md">
              Our studio rejects the ornamental. We believe in the honesty of materials—exposed concrete, raw steel, and light. Every line we draw is a deliberate act of subtraction, removing the unnecessary to reveal the essential.
            </p>
            <button className="border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300">
              Read Manifesto
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-neutral-800 z-0" />
            <img 
              src="https://picsum.photos/seed/concrete/800/800" 
              alt="Concrete texture details" 
              className="relative z-10 w-full aspect-square object-cover grayscale contrast-125"
            />
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white opacity-10">
            Selected Works
          </h2>
        </div>
        
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* Studio / Team */}
      <section id="studio" className="py-40 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-900/10 skew-x-12 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight mb-12">
            The Studio
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed mb-16">
            Located in a converted industrial bunker, our team of 15 architects and designers work in an environment that mirrors our output: focused, raw, and unyielding.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Awards", value: "24" },
              { label: "Projects", value: "112" },
              { label: "Countries", value: "08" },
              { label: "Years", value: "15" },
            ].map((stat, i) => (
              <div key={i} className="border-l border-neutral-800 p-6 text-left">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12">
              Let's<br/>Build
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-sm">
              We are selective with our projects. If you are ready to challenge the status quo, contact us.
            </p>
            <div className="flex gap-6 mt-12">
               <a href="#" className="hover:opacity-50 transition-opacity"><Instagram /></a>
               <a href="#" className="hover:opacity-50 transition-opacity"><Linkedin /></a>
               <a href="#" className="hover:opacity-50 transition-opacity"><Twitter /></a>
               <a href="#" className="hover:opacity-50 transition-opacity"><Mail /></a>
            </div>
          </div>

          <form className="space-y-8 mt-8 md:mt-0" onSubmit={(e) => e.preventDefault()}>
            <div className="border-b border-black py-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-transparent border-none focus:ring-0 placeholder:text-neutral-400 text-xl" 
              />
            </div>
            <div className="border-b border-black py-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border-none focus:ring-0 placeholder:text-neutral-400 text-xl" 
              />
            </div>
            <div className="border-b border-black py-4">
              <textarea 
                rows={4}
                placeholder="Project Brief" 
                className="w-full bg-transparent border-none focus:ring-0 placeholder:text-neutral-400 text-xl resize-none" 
              />
            </div>
            <button className="bg-black text-white px-12 py-5 uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors w-full md:w-auto">
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] py-12 px-6 md:px-12 border-t border-neutral-900 text-neutral-600 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase">
        <p>&copy; 2024 VOID Architecture. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Designed in total darkness.</p>
      </footer>

      {/* Gemini Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
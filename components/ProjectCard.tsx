import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="group relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 cursor-pointer"
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-neutral-400 mb-2 uppercase">{project.category}</p>
            <h3 className="text-2xl md:text-4xl font-light text-white uppercase tracking-tighter leading-none">
              {project.title}
            </h3>
          </div>
          <span className="text-neutral-500 text-sm font-mono">{project.year}</span>
        </div>
        
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="text-sm text-neutral-300 line-clamp-2 max-w-[80%]">
            {project.description}
          </p>
          <div className="p-2 rounded-full border border-white/30 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { ModelViewer } from './ModelViewer';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
        >
          {/* Main Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full h-full max-w-7xl bg-[#050505] border border-neutral-800 flex flex-col md:flex-row relative shadow-2xl overflow-hidden"
          >
             {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white hover:text-black border border-white/20 text-white transition-all rounded-full"
            >
              <X size={24} />
            </button>

            {/* 3D Viewer Area (Takes priority) */}
            <div className="w-full md:w-3/4 h-[60vh] md:h-full relative border-b md:border-b-0 md:border-r border-neutral-800">
               {/* Label */}
               <div className="absolute top-6 left-6 z-10 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></div>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/70">Live Render</span>
                  </div>
               </div>
               
               <ModelViewer modelUrl={project.modelUrl} />
            </div>

            {/* Project Details Panel */}
            <div className="w-full md:w-1/4 h-auto md:h-full overflow-y-auto bg-[#0a0a0a] p-8 flex flex-col">
              <div className="mb-auto">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-4">{project.year} — {project.category}</span>
                <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tighter text-white mb-6 leading-none">
                  {project.title}
                </h2>
                <div className="w-12 h-[1px] bg-neutral-700 mb-6"></div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="space-y-4">
                  <div className="bg-neutral-900/50 p-4 border border-neutral-800">
                    <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Materiality</h4>
                    <p className="text-white text-xs">Reinforced Concrete, Black Steel, Glass</p>
                  </div>
                  <div className="bg-neutral-900/50 p-4 border border-neutral-800">
                     <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Structure</h4>
                     <p className="text-white text-xs">Post-tensioned slab system</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 pt-8 border-t border-neutral-800">
                <button className="w-full py-3 border border-neutral-700 hover:bg-white hover:text-black hover:border-white transition-all text-xs uppercase tracking-[0.2em] text-neutral-300">
                  Download Schematics
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import Lanyard from "@/components/react-bits/lanyard";

export function ProjectsSlide() {
  const { wrappedData } = useStory();
  const { projects } = wrappedData;
  
  // Get top 3 projects
  const topProject = projects[0];

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-0 right-0 z-20 text-center space-y-2 px-6"
      >
        <p className="mono-caption text-[var(--red-primary)]">What You Shilled</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
          Your Shills
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          {topProject.name} - {topProject.totalMentions} mentions
        </p>
      </motion.div>
      
      {/* Lanyard Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0"
      >
        <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} fov={20} transparent={true} />
      </motion.div>
      
      {/* Footer with other projects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-0 right-0 z-20 px-6"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-white/50 text-sm mb-4">
            Drag it! Also shilled:
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {projects.slice(1, 3).map((project) => (
              <div
                key={project.name}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <span className="text-white/70 text-sm">{project.name}</span>
                <span className="text-[var(--red-primary)] text-xs ml-2">
                  {project.totalMentions}x
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

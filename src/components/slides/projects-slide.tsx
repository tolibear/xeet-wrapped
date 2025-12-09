"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { ProjectCard } from "@/components/ui";
import { Beams } from "@/components/backgrounds";

export function ProjectsSlide() {
  const { wrappedData } = useStory();
  const { projects } = wrappedData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Beams lightColor="#FF0033" beamNumber={8} speed={2} rotation={-10} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-5xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">Projects You Boosted</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Technologies and tools you championed
            </h1>
          </motion.div>
          
          {/* Projects grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
              >
                <ProjectCard 
                  project={project}
                  className={index === 0 ? "md:col-span-2 ring-1 ring-[var(--red-primary)]/30" : ""}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Footer insight */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center text-white/50 text-sm"
          >
            You mentioned {projects.length} project{projects.length !== 1 ? "s" : ""} throughout the year
          </motion.p>
        </div>
      </div>
    </div>
  );
}

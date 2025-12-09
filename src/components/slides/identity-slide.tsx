"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { PersonaChip } from "@/components/ui";
import { LightPillars } from "@/components/backgrounds";

export function IdentitySlide() {
  const { wrappedData } = useStory();
  const { identity } = wrappedData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <LightPillars />
      
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-8"
        role="region"
        aria-label="Your identity and persona"
      >
        <motion.div
          className="text-center space-y-8 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section label */}
          <motion.p 
            variants={itemVariants}
            className="mono-caption text-[var(--red-primary)]"
          >
            You, in one sentence
          </motion.p>
          
          {/* Main headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold headline-condensed text-white leading-tight"
          >
            {identity.oneSentence}
          </motion.h1>
          
          {/* Persona chips */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 pt-4"
            variants={containerVariants}
          >
            {identity.personaChips.map((chip, index) => (
              <motion.div
                key={chip}
                variants={chipVariants}
                custom={index}
              >
                <PersonaChip 
                  label={chip} 
                  variant={index === 0 ? "highlight" : "default"}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Era badge */}
          {wrappedData.era && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="pt-6"
            >
              <span className="inline-block px-5 py-2.5 rounded-full bg-[var(--red-primary)]/10 border border-[var(--red-primary)]/30 mono-caption text-[var(--red-primary)]">
                {wrappedData.era}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

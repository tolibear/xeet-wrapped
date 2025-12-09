"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { Silk } from "@/components/backgrounds";

export function BootSlide() {
  const { wrappedData } = useStory();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  const handleVariants = {
    hidden: { opacity: 0, filter: "blur(20px)", scale: 0.9 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)", 
      scale: 1,
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Silk color="#FF0033" speed={3} scale={1.2} noiseIntensity={1.2} />
      
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-8"
        role="region"
        aria-label="Boot sequence"
      >
        <motion.div
          className="text-center space-y-8 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Loading text */}
          <motion.div 
            variants={textVariants} 
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <p className="mono-caption text-white/50">initializing</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold headline-condensed text-white">
              Compiling your year...
            </h1>
          </motion.div>
          
          {/* Animated progress bar */}
          <motion.div 
            variants={textVariants}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--red-primary), var(--red-secondary))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              />
            </div>
            <motion.div 
              className="mt-3 flex justify-between text-xs mono-caption text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>Scanning timeline</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                transition={{ duration: 1.5, delay: 1.5 }}
              >
                ████████
              </motion.span>
            </motion.div>
          </motion.div>
          
          {/* Handle reveal */}
          <motion.div
            variants={handleVariants}
            transition={{ duration: 1, delay: 2.5 }}
            className="pt-8"
          >
            <p className="mono-caption text-white/40 mb-2">analyzing</p>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold headline-condensed">
              <span className="text-[var(--red-primary)]">@</span>
              <span className="text-white">{wrappedData.user.handle}</span>
            </div>
          </motion.div>
          
          {/* Year tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.5 }}
            className="pt-4"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mono-caption text-white/60">
              2024 Wrapped
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

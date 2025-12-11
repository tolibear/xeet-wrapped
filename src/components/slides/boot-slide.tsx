"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { Silk } from "@/components/backgrounds";

export function BootSlide() {
  const { wrappedData } = useStory();
  const { user, stats, timeline } = wrappedData;

  // Find the most active month
  const mostActiveMonth = timeline.activity.reduce((max, month) => 
    month.value > max.value ? month : max
  );

  // Get personalized intro based on activity
  const getPersonalizedIntro = () => {
    if (stats.totalXeets > 4000) {
      return "You didn't just show up on X this year.";
    } else if (stats.totalXeets > 2000) {
      return "2024 was your year on X.";
    } else if (stats.totalXeets > 500) {
      return "You made your mark on X this year.";
    }
    return "You showed up on X this year.";
  };

  const getPersonalizedSubtext = () => {
    if (stats.daysActive > 300) {
      return `${stats.daysActive} days active, ${stats.totalXeets.toLocaleString()} posts, and a whole lot of ${mostActiveMonth.label} energy.`;
    } else if (stats.totalXeets > 3000) {
      return `${stats.totalXeets.toLocaleString()} posts across ${stats.daysActive} days. You had a lot to say.`;
    }
    return `${stats.totalXeets.toLocaleString()} posts, ${stats.replies.toLocaleString()} replies, and ${stats.threads} threads later...`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    },
  };

  const handleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Silk color="#FF0033" speed={3} scale={1.2} noiseIntensity={1.2} />
      
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-8"
        role="region"
        aria-label="Your year intro"
      >
        <motion.div
          className="text-center space-y-10 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div 
            variants={textVariants}
            className="space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)] tracking-wider">
              HEY @{user.handle.toUpperCase()}
            </p>
          </motion.div>
          
          {/* Main headline */}
          <motion.div
            variants={textVariants}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold headline-condensed text-white leading-tight">
              {getPersonalizedIntro()}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              {getPersonalizedSubtext()}
            </p>
          </motion.div>
          
          {/* Call to action */}
          <motion.div
            variants={handleVariants}
            className="pt-8"
          >
            <p className="text-lg md:text-xl text-white/50 font-medium">
              Let's take a look back.
            </p>
          </motion.div>
          
          {/* Year badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="pt-6"
          >
            <span className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/10 mono-caption text-white/60 text-sm">
              YOUR 2024 WRAPPED
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

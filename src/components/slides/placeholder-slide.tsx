"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useStory } from "@/components/story";

interface PlaceholderSlideProps {
  slideNumber: number;
  title: string;
  subtitle?: string;
  backgroundColor?: string;
}

function PlaceholderSlide({
  slideNumber,
  title,
  subtitle,
  backgroundColor = "from-black via-zinc-900 to-black",
}: PlaceholderSlideProps) {
  const { wrappedData } = useStory();

  return (
    <div className={`h-full w-full bg-gradient-to-br ${backgroundColor} flex items-center justify-center`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto px-8 text-center"
      >
        <GlassPanel elevation="medium" glow className="p-12">
          <div className="space-y-6">
            <div className="mono-caption text-red-primary">
              Slide {slideNumber + 1}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold headline-condensed text-white">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl md:text-2xl text-white/60">
                {subtitle}
              </p>
            )}
            
            <div className="pt-4 text-white/40 mono-caption text-sm">
              @{wrappedData.user.handle} • 2024 Wrapped
            </div>
          </div>
        </GlassPanel>
        
        <div className="mt-8 text-white/30 mono-caption text-xs">
          Coming soon in Phase 5
        </div>
      </motion.div>
    </div>
  );
}

// Placeholder slides for Phase 5 implementation (slides 8-10)
export function TerminalSlide() {
  return (
    <PlaceholderSlide
      slideNumber={8}
      title="Terminal Log"
      subtitle="System diagnostics complete"
      backgroundColor="from-green-950/30 via-black to-black"
    />
  );
}

export function AchievementsSlide() {
  return (
    <PlaceholderSlide
      slideNumber={9}
      title="Achievements"
      subtitle="Milestones unlocked this year"
      backgroundColor="from-black via-amber-950/20 to-black"
    />
  );
}

export function FinalPosterSlide() {
  return (
    <PlaceholderSlide
      slideNumber={10}
      title="Your 2024 Wrapped"
      subtitle="Share your story with the world"
      backgroundColor="from-red-950/30 via-black to-purple-950/30"
    />
  );
}

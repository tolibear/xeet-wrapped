"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStory } from "@/components/story";
import { GlassPanel } from "@/components/ui";
import { Beams } from "@/components/backgrounds";
import { TimelineChart } from "./timeline-chart";

type CategoryKey = "activity" | "engagement" | "growth";

const categories: { key: CategoryKey; label: string; color: string }[] = [
  { key: "activity", label: "Activity", color: "var(--red-primary)" },
  { key: "engagement", label: "Engagement", color: "#06b6d4" },
  { key: "growth", label: "Growth", color: "#a855f7" },
];

export function TimelineSlide() {
  const { wrappedData } = useStory();
  const { timeline } = wrappedData;
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("activity");

  const activeData = timeline[activeCategory];
  const activeColor = categories.find(c => c.key === activeCategory)?.color || "var(--red-primary)";
  
  // Calculate peak for display
  const peakValue = Math.max(...activeData.map(d => d.value));
  const peakMonth = activeData.find(d => d.value === peakValue)?.label || "";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Beams lightColor="#FF0033" beamNumber={10} speed={1.5} rotation={15} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2"
          >
            <p className="mono-caption text-[var(--red-primary)]">Timeline Arc</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Your year in motion
            </h1>
          </motion.div>
          
          {/* Category toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center"
          >
            <GlassPanel elevation="thin" className="inline-flex p-1 gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`
                    px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300
                    ${activeCategory === cat.key 
                      ? "bg-white/10 text-white shadow-lg" 
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }
                  `}
                  style={{
                    boxShadow: activeCategory === cat.key 
                      ? `0 0 20px ${cat.color}40` 
                      : "none",
                  }}
                >
                  <span 
                    className="inline-block w-2 h-2 rounded-full mr-1 md:mr-2"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.label}
                </button>
              ))}
            </GlassPanel>
          </motion.div>
          
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <GlassPanel elevation="medium" className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TimelineChart 
                    data={activeData} 
                    color={activeColor}
                    showPeak={true}
                  />
                </motion.div>
              </AnimatePresence>
            </GlassPanel>
          </motion.div>
          
          {/* Peak annotation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <GlassPanel elevation="thin" className="inline-flex items-center gap-3 px-5 py-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="mono-caption text-white/50 text-xs">Peak moment</p>
                <p className="text-white font-medium">
                  <span style={{ color: activeColor }}>{peakValue.toLocaleString()}</span>
                  {" "}in {peakMonth}
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

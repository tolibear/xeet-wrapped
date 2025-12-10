"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { GlassPanel } from "@/components/ui";
import { Beams } from "@/components/backgrounds";
import { TimelineChart } from "./timeline-chart";

const categories = [
  { key: "activity", label: "Activity", color: "#FF0033", emoji: "📝" },
  { key: "engagement", label: "Engagement", color: "#06b6d4", emoji: "💬" },
  { key: "growth", label: "Growth", color: "#a855f7", emoji: "📈" },
] as const;

export function TimelineSlide() {
  const { wrappedData } = useStory();
  const { timeline } = wrappedData;

  // Prepare datasets for multi-line chart
  const datasets = [
    { data: timeline.activity, color: "#FF0033", label: "Activity" },
    { data: timeline.engagement, color: "#06b6d4", label: "Engagement" },
    { data: timeline.growth, color: "#a855f7", label: "Growth" },
  ];

  // Calculate peaks for each category
  const peaks = categories.map((cat) => {
    const data = timeline[cat.key];
    const peakValue = Math.max(...data.map(d => d.value));
    const peakMonth = data.find(d => d.value === peakValue)?.label || "";
    return {
      ...cat,
      value: peakValue,
      month: peakMonth,
    };
  });

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Beams lightColor="#FF0033" beamNumber={10} speed={1.5} rotation={15} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl space-y-6">
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
          
          {/* Chart with all 3 lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <GlassPanel elevation="medium" className="p-6 md:p-8">
              <TimelineChart 
                datasets={datasets}
                showPeak={true}
              />
            </GlassPanel>
          </motion.div>
          
          {/* Peak stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          >
            {peaks.map((peak, index) => (
              <motion.div
                key={peak.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.1, duration: 0.4 }}
              >
                <GlassPanel elevation="thin" className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{peak.emoji}</span>
                    <div className="flex-1">
                      <p className="mono-caption text-white/50 text-xs">{peak.label}</p>
                      <p className="text-white font-medium text-sm md:text-base">
                        <span style={{ color: peak.color }}>{peak.value.toLocaleString()}</span>
                        {" "}
                        <span className="text-white/60 text-xs">in {peak.month}</span>
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

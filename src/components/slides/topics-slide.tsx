"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStory } from "@/components/story";
import { TopicBubble, XeetCard, GlassPanel } from "@/components/ui";
import { Iridescence } from "@/components/backgrounds";
import type { TopicCluster } from "@/lib/types";

export function TopicsSlide() {
  const { wrappedData } = useStory();
  const { topics } = wrappedData;
  
  const [selectedTopic, setSelectedTopic] = useState<TopicCluster | null>(null);

  const getBubbleSize = (count: number, allClusters: TopicCluster[]) => {
    const maxCount = Math.max(...allClusters.map(c => c.count));
    const minCount = Math.min(...allClusters.map(c => c.count));
    const normalized = (count - minCount) / (maxCount - minCount);
    
    if (normalized > 0.66) return "lg";
    if (normalized > 0.33) return "md";
    return "sm";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Iridescence color={[1, 0.2, 0.2]} speed={0.8} amplitude={0.15} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">What You Talked About</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Topics that defined your year
            </h1>
          </motion.div>
          
          {/* Topic cloud */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-3 md:gap-4 py-8"
          >
            {topics.clusters.map((cluster) => (
              <TopicBubble
                key={cluster.name}
                name={cluster.name}
                count={cluster.count}
                color={cluster.color}
                size={getBubbleSize(cluster.count, topics.clusters)}
                onClick={() => setSelectedTopic(cluster)}
              />
            ))}
          </motion.div>
          
          {/* Signature phrase and emoji */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center space-y-3"
          >
            <p className="text-white/60 text-sm">Your signature phrase:</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">{topics.signatureEmoji}</span>
              <span className="text-2xl md:text-3xl font-bold text-[var(--red-primary)]">
                "{topics.signaturePhrase}"
              </span>
              <span className="text-4xl">{topics.signatureEmoji}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Topic detail popover */}
      <AnimatePresence>
        {selectedTopic && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 cursor-pointer"
            />
            
            {/* Modal - full screen on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-6"
            >
              <div className="w-full h-full md:h-auto md:max-w-2xl overflow-y-auto">
                <GlassPanel elevation="thick" glow className="p-4 md:p-6 space-y-4 h-full md:h-auto overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {selectedTopic.name}
                    </h3>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="mono-caption text-white/60 text-sm">
                    {selectedTopic.count} posts in this topic
                  </p>
                  
                  <div className="space-y-3">
                    {selectedTopic.exampleXeets.map((xeet) => (
                      <XeetCard key={xeet.id} xeet={xeet} />
                    ))}
                  </div>
                </GlassPanel>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

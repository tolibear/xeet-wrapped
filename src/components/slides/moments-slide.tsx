"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { XeetCard, GlassPanel } from "@/components/ui";
import { Plasma } from "@/components/backgrounds";

const metrics = [
  { key: "mostLiked", label: "Most Liked", emoji: "❤️", color: "#FF0033" },
  { key: "mostReposted", label: "Most Reposted", emoji: "🔁", color: "#06b6d4" },
  { key: "mostReplied", label: "Most Replied", emoji: "💬", color: "#a855f7" },
] as const;

export function MomentsSlide() {
  const { wrappedData } = useStory();
  const { topMoments } = wrappedData;

  const posts = [
    { xeet: topMoments.mostLiked[0], metric: metrics[0] },
    { xeet: topMoments.mostReposted[0], metric: metrics[1] },
    { xeet: topMoments.mostReplied[0], metric: metrics[2] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Plasma color="#FF0033" speed={0.8} scale={1} opacity={0.9} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-5xl space-y-6 md:space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">2025 Bangers</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Your top 3 posts
            </h1>
          </motion.div>
          
          {/* Three posts grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {posts.map((post, index) => (
              <motion.div 
                key={post.xeet.id} 
                variants={cardVariants}
                className="flex flex-col gap-3"
              >
                {/* Metric Badge */}
                <GlassPanel elevation="thin" className="inline-flex items-center gap-2 px-4 py-2 self-start">
                  <span className="text-xl">{post.metric.emoji}</span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: post.metric.color }}
                  >
                    {post.metric.label}
                  </span>
                </GlassPanel>
                
                {/* Post Card */}
                <XeetCard 
                  xeet={post.xeet}
                  className="ring-1 ring-white/10 hover:ring-white/20 transition-all"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

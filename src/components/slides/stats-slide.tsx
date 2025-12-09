"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { StatCard } from "@/components/ui";
import { Aurora } from "@/components/backgrounds";

export function StatsSlide() {
  const { wrappedData } = useStory();
  const { stats } = wrappedData;

  const statItems = [
    { label: "Total Posts", value: stats.totalXeets.toLocaleString(), icon: "📝" },
    { label: "Replies Sent", value: stats.replies.toLocaleString(), icon: "💬" },
    { label: "Threads Written", value: stats.threads.toLocaleString(), icon: "🧵" },
    { label: "Media Posted", value: stats.mediaPosts.toLocaleString(), icon: "📸" },
    { label: "Days Active", value: stats.daysActive.toLocaleString(), icon: "📅" },
    { label: "Longest Streak", value: `${stats.longestStreak} days`, icon: "🔥" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.3, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Aurora colorStops={["#FF0033", "#990000", "#FF0033"]} amplitude={1.2} blend={0.6} speed={0.8} />
      
      <div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12"
        role="region"
        aria-label="Year at a glance statistics"
      >
        <div className="w-full max-w-5xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">Your Year at a Glance</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              You shipped{" "}
              <span className="text-[var(--red-primary)]">
                {stats.totalXeets.toLocaleString()}
              </span>{" "}
              thoughts to the timeline
            </h1>
          </motion.div>
          
          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {statItems.map((stat, index) => (
              <motion.div key={stat.label} variants={cardVariants}>
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  icon={<span className="text-xl md:text-2xl">{stat.icon}</span>}
                  className={index === 0 ? "md:col-span-1 ring-1 ring-[var(--red-primary)]/30" : ""}
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
            That&apos;s approximately {Math.round(stats.totalXeets / 365)} posts per day on average
          </motion.p>
        </div>
      </div>
    </div>
  );
}

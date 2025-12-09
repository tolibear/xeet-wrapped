"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { AchievementBadge } from "@/components/ui";
import { Plasma } from "@/components/backgrounds";

export function AchievementsSlide() {
  const { wrappedData } = useStory();
  const { achievements } = wrappedData;

  // Separate unlocked and locked achievements
  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  // Sort by rarity for display (legendary first)
  const sortByRarity = (a: typeof achievements[0], b: typeof achievements[0]) => {
    const rarityOrder = { legendary: 0, rare: 1, common: 2 };
    const aOrder = rarityOrder[a.rarity || "common"];
    const bOrder = rarityOrder[b.rarity || "common"];
    return aOrder - bOrder;
  };

  const sortedUnlocked = [...unlockedAchievements].sort(sortByRarity);
  const sortedLocked = [...lockedAchievements].sort(sortByRarity);
  const allAchievements = [...sortedUnlocked, ...sortedLocked];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Plasma color="#CC0000" speed={0.6} scale={1.2} opacity={0.85} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-6xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">
              Achievements Unlocked
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Your 2024 Milestones
            </h1>
            <p className="text-lg text-white/60">
              {unlockedAchievements.length} of {achievements.length} earned
            </p>
          </motion.div>

          {/* Trophy shelf - grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {allAchievements.map((achievement, index) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>

          {/* Mystery hint for locked badges */}
          {lockedAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: allAchievements.length * 0.1 }}
              className="text-center pt-4"
            >
              <div className="inline-block px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-sm text-white/60">
                  🔒 Keep posting to unlock more achievements in 2025
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

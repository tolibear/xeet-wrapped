"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { Achievement } from "@/lib/types";

export type AchievementBadgeProps = {
  achievement: Achievement;
  index?: number;
  className?: string;
};

const rarityColors = {
  common: {
    glow: "rgba(156, 163, 175, 0.3)",
    border: "rgba(156, 163, 175, 0.5)",
    text: "text-gray-400",
  },
  rare: {
    glow: "rgba(59, 130, 246, 0.4)",
    border: "rgba(59, 130, 246, 0.6)",
    text: "text-blue-400",
  },
  legendary: {
    glow: "rgba(234, 179, 8, 0.5)",
    border: "rgba(234, 179, 8, 0.7)",
    text: "text-yellow-400",
  },
};

export function AchievementBadge({
  achievement,
  index = 0,
  className,
}: AchievementBadgeProps) {
  const { icon, title, description, unlocked, rarity = "common" } = achievement;
  const colors = rarityColors[rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={cn("relative group", className)}
    >
      {/* Badge container */}
      <div
        className={cn(
          "relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300",
          unlocked
            ? "bg-white/10 border border-white/20 hover:scale-105"
            : "bg-white/5 border border-white/10"
        )}
        style={{
          boxShadow: unlocked
            ? `0 0 30px ${colors.glow}, inset 0 0 20px rgba(255,255,255,0.05)`
            : "none",
        }}
      >
        {/* Locked overlay */}
        {!unlocked && (
          <div className="absolute inset-0 backdrop-blur-sm bg-black/40 rounded-2xl flex items-center justify-center">
            <div className="text-4xl">🔒</div>
          </div>
        )}

        {/* Trophy shine effect for unlocked badges */}
        {unlocked && (
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div
              className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-trophy-shine"
              style={{ left: "-33%" }}
            />
          </div>
        )}

        {/* Content */}
        <div className={cn("relative space-y-3", !unlocked && "blur-sm")}>
          {/* Icon */}
          <div className="text-5xl text-center">{icon}</div>

          {/* Title */}
          <h3
            className={cn(
              "text-lg font-bold text-center headline-condensed",
              unlocked ? "text-white" : "text-white/40"
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm text-center",
              unlocked ? "text-white/70" : "text-white/30"
            )}
          >
            {description}
          </p>

          {/* Rarity indicator */}
          {unlocked && (
            <div className="flex justify-center pt-2">
              <span
                className={cn(
                  "mono-caption text-xs px-3 py-1 rounded-full border",
                  colors.text
                )}
                style={{
                  borderColor: colors.border,
                  backgroundColor: `${colors.glow}`,
                }}
              >
                {rarity}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

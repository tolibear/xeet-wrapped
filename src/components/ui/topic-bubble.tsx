"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export type TopicBubbleProps = {
  name: string;
  count: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
};

export function TopicBubble({
  name,
  count,
  color = "#FF0033",
  size = "md",
  onClick,
  className,
}: TopicBubbleProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const scaleByCount = size === "lg" ? 1.2 : size === "md" ? 1 : 0.85;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative rounded-full backdrop-blur-[12px] border font-medium transition-all cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        sizeStyles[size],
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        borderColor: `${color}50`,
        color: "white",
        scale: scaleByCount,
        boxShadow: `0 0 20px ${color}30`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: scaleByCount }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2">
        <span>{name}</span>
        <span
          className="mono-caption text-xs opacity-60"
          style={{ color: "white" }}
        >
          {count}
        </span>
      </div>
    </motion.button>
  );
}

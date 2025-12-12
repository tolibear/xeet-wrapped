"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

export interface DockIconProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

/**
 * DockIcon - Individual icon in the navigation dock
 * Shows chapter icon with glow effect when active
 */
export function DockIcon({ icon: Icon, label, isActive, onClick, index }: DockIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center",
        "transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-red-primary/50 rounded-full",
        // Size
        "w-12 h-12 md:w-14 md:h-14",
        // Glass background
        "backdrop-blur-md",
        isActive ? "bg-white/20" : "bg-white/5",
        // Border
        isActive ? "border-2 border-red-primary/60" : "border border-white/10",
        // Hover
        "hover:bg-white/15 hover:scale-110"
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Go to ${label}`}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Icon */}
      <Icon
        className={cn(
          "transition-colors duration-300",
          isActive ? "text-red-primary" : "text-white/60"
        )}
        size={20}
        strokeWidth={2}
      />

      {/* Active glow */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            boxShadow: "0 0 20px rgba(255, 0, 51, 0.6)",
          }}
        />
      )}

      {/* Tooltip on desktop */}
      <div className="hidden md:block absolute left-full ml-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="px-3 py-1.5 rounded-lg bg-black/90 border border-white/10 backdrop-blur-sm">
          <span className="text-xs text-white/90 whitespace-nowrap mono-caption">
            {label}
          </span>
        </div>
      </div>
    </motion.button>
  );
}


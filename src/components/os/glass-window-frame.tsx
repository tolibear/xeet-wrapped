"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface GlassWindowFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * GlassWindowFrame - Full-screen container for chapter content
 * Provides structure without visual interference for immersive experience
 */
export function GlassWindowFrame({ children, className }: GlassWindowFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden",
        // Always full-screen
        "w-full h-full",
        className
      )}
      style={{
        // Safe area insets
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}


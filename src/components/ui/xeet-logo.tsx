"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface XeetLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function XeetLogo({ size = "md", className }: XeetLogoProps) {
  const heightMap = {
    sm: 24,
    md: 32,
    lg: 48,
  };

  const height = heightMap[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn("fixed top-6 left-6 z-50", className)}
    >
      <img
        src="/Logos/logo.svg"
        alt="Xeet"
        style={{
          height: `${height}px`,
          width: "auto",
          filter: "drop-shadow(0 0 15px rgba(255, 0, 51, 0.5))",
        }}
      />
    </motion.div>
  );
}



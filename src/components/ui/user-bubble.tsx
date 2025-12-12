"use client";

import { motion } from "framer-motion";
import { AvatarFrame } from "./avatar-frame";
import { GlassPanel } from "./glass-panel";
import { cn } from "@/lib/utils/cn";

export interface UserBubbleProps {
  avatar: string;
  handle: string;
  displayName?: string;
  className?: string;
}

export function UserBubble({
  avatar,
  handle,
  displayName,
  className,
}: UserBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("fixed top-6 right-6 z-50", className)}
    >
      <GlassPanel elevation="medium" className="px-4 py-3">
        <div className="flex items-center gap-3">
          <AvatarFrame src={avatar} alt={handle} size="sm" />
          <div className="flex flex-col min-w-0">
            <div className="text-sm font-semibold text-white truncate">
              {displayName || handle}
            </div>
            <div className="text-xs text-white/60 truncate">@{handle}</div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}




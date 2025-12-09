"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { TerminalGradient } from "@/components/backgrounds";
import { cn } from "@/lib/utils/cn";

export function TerminalSlide() {
  const { wrappedData } = useStory();
  const { user, stats, era } = wrappedData;

  // Generate terminal logs
  const logs = [
    { type: "system", text: "SYSTEM DIAGNOSTICS INITIALIZED..." },
    { type: "info", text: `> Loading profile: @${user.handle}` },
    { type: "success", text: `✓ Profile loaded successfully` },
    { type: "info", text: `> Analyzing activity patterns...` },
    { type: "data", text: `  └─ Total posts: ${stats.totalXeets.toLocaleString()}` },
    { type: "data", text: `  └─ Replies sent: ${stats.replies.toLocaleString()}` },
    { type: "data", text: `  └─ Threads created: ${stats.threads.toLocaleString()}` },
    { type: "data", text: `  └─ Days active: ${stats.daysActive}/${365}` },
    { type: "success", text: `✓ Analysis complete` },
    { type: "info", text: `> Computing engagement metrics...` },
    { type: "data", text: `  └─ Longest streak: ${stats.longestStreak} days` },
    { type: "data", text: `  └─ Media posts: ${stats.mediaPosts.toLocaleString()}` },
    { type: "success", text: `✓ Metrics computed` },
    { type: "warning", text: `⚠ WARNING: Excessive vibes detected` },
    { type: "warning", text: `⚠ NOTICE: Above-average community engagement` },
    { type: "info", text: `> Generating era classification...` },
    { type: "era", text: era || "The Active Era" },
    { type: "success", text: `✓ Classification complete` },
    { type: "system", text: "═══════════════════════════════" },
    { type: "system", text: "DIAGNOSTICS COMPLETE • 2024" },
  ];

  const getLogColor = (type: string) => {
    switch (type) {
      case "system":
        return "text-green-400";
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      case "info":
        return "text-cyan-400";
      case "data":
        return "text-white/70";
      case "era":
        return "text-red-400 font-bold text-lg";
      default:
        return "text-white";
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <TerminalGradient />

      {/* CRT overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Screen curvature effect */}
        <div
          className="absolute inset-4 rounded-3xl"
          style={{
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Terminal header */}
            <div className="mb-6 pb-4 border-b border-green-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-green-400 text-sm">
                  xeet-diagnostics.terminal
                </div>
              </div>
              <div className="font-mono text-xs text-green-500/60">
                Running system analysis on @{user.handle} • Year 2024
              </div>
            </div>

            {/* Terminal content with CRT effect */}
            <div
              className={cn(
                "bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-green-500/20",
                "shadow-[0_0_30px_rgba(34,197,94,0.1)]"
              )}
            >
              <div className="space-y-1 font-mono text-sm">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className={cn(getLogColor(log.type))}
                  >
                    {log.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: logs.length * 0.1,
                  }}
                  className="inline-block w-2 h-4 bg-green-400 ml-1"
                />
              </div>
            </div>

            {/* Bottom stamp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: logs.length * 0.1 + 0.5 }}
              className="mt-6 text-center"
            >
              <div className="inline-block px-6 py-2 bg-red-500/20 border border-red-500/50 rounded-lg transform -rotate-2">
                <div className="font-bold text-red-400 text-lg mono-caption">
                  APPROVED • YEAR COMPLETE
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

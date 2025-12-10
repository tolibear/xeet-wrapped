"use client";

import { motion } from "framer-motion";
import { Silk } from "@/components/backgrounds";
import { GlassPanel, RedButton } from "@/components/ui";

interface AuthLandingProps {
  onSignIn: () => void;
}

export function AuthLanding({ onSignIn }: AuthLandingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <Silk color="#FF0033" speed={2} scale={1.3} noiseIntensity={1.0} />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          <GlassPanel elevation="thick" glow className="p-8 md:p-12">
            <div className="space-y-8 text-center">
              {/* Title */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold headline-condensed text-white">
                  Xeet wrapped
                </h1>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="mono-caption text-white/60 text-xs">
                    2025
                  </span>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-lg text-white/80">
                  Connect your Twitter account to begin unlocking your 2025 Xeet
                  wrapped
                </p>
                <p className="text-sm text-white/50">
                  unwrap your gift at the end
                </p>
              </motion.div>

              {/* Requirement badge */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <svg
                    className="w-4 h-4 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-white/60">
                    minimum 250 followers
                  </span>
                </div>
              </motion.div>

              {/* Sign in button */}
              <motion.div variants={itemVariants} className="pt-4">
                <RedButton
                  onClick={onSignIn}
                  className="w-full py-4 text-lg font-semibold"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Connect with Twitter</span>
                  </div>
                </RedButton>
              </motion.div>

              {/* Footer note */}
              <motion.div
                variants={itemVariants}
                className="pt-4 text-xs text-white/40"
              >
                <p>Demo mode • No actual authentication required</p>
              </motion.div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}


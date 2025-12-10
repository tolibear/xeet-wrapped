"use client";

import { motion } from "framer-motion";
import { useStory } from "./use-story";
import { cn } from "@/lib/utils/cn";

export function ProgressRail() {
  const { currentSlide, totalSlides, jumpToSlide } = useStory();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => jumpToSlide(index)}
              className={cn(
                "flex-1 h-1 rounded-full transition-all duration-300 overflow-hidden",
                "hover:h-1.5 focus:outline-none focus:ring-2 focus:ring-red-primary/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={cn(
                  "h-full transition-all duration-300",
                  index < currentSlide && "bg-white/40",
                  index === currentSlide && "bg-red-primary",
                  index > currentSlide && "bg-white/10"
                )}
              >
                {index === currentSlide && (
                  <motion.div
                    className="h-full bg-red-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


"use client";

import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import { StoryProvider } from "./story-context";
import { ProgressRail } from "./progress-rail";
import { DesktopHint } from "@/components/ui";
import type { XeetWrappedData, NavigationDirection } from "@/lib/types";

interface StoryContainerProps {
  wrappedData: XeetWrappedData;
  slides: ReactNode[];
  autoAdvance?: boolean;
  autoAdvanceDuration?: number; // in seconds
}

export function StoryContainer({
  wrappedData,
  slides,
  autoAdvance = false,
  autoAdvanceDuration = 5,
}: StoryContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<NavigationDirection>("next");
  const [reducedMotion, setReducedMotion] = useState(false);
  const router = useRouter();
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Auto-advance logic
  useEffect(() => {
    if (!autoAdvance || isPaused || currentSlide >= totalSlides - 1) {
      return;
    }

    autoAdvanceTimerRef.current = setTimeout(() => {
      nextSlide();
    }, autoAdvanceDuration * 1000);

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [currentSlide, isPaused, autoAdvance, autoAdvanceDuration, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection("next");
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection("previous");
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const jumpToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides && index !== currentSlide) {
        setDirection(index > currentSlide ? "next" : "previous");
        setCurrentSlide(index);
      }
    },
    [currentSlide, totalSlides]
  );

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Temporarily pause on interaction, then resume
  const handleInteraction = useCallback(() => {
    if (!autoAdvance) return;

    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  }, [autoAdvance]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          handleInteraction();
          nextSlide();
          break;
        case "ArrowLeft":
        case "Backspace":
          e.preventDefault();
          handleInteraction();
          previousSlide();
          break;
        case "Escape":
          e.preventDefault();
          router.push("/");
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          const slideIndex = parseInt(e.key, 10);
          if (slideIndex < totalSlides) {
            handleInteraction();
            jumpToSlide(slideIndex);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, jumpToSlide, router, totalSlides, handleInteraction]);

  // Touch/swipe gesture handling
  const handlePanEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50;
      const { offset, velocity } = info;

      handleInteraction();

      if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500) {
        if (offset.x > 0) {
          // Swipe right = previous
          previousSlide();
        } else {
          // Swipe left = next
          nextSlide();
        }
      }
    },
    [nextSlide, previousSlide, handleInteraction]
  );

  // Click zones for navigation (left 1/3 = previous, right 2/3 = next)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickZone = x / rect.width;

      handleInteraction();

      if (clickZone < 0.33) {
        previousSlide();
      } else {
        nextSlide();
      }
    },
    [nextSlide, previousSlide, handleInteraction]
  );

  // Transition variants
  const getTransitionVariants = () => {
    if (reducedMotion) {
      // Simple fade for reduced motion
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }

    // Full transitions
    const slideDistance = 100;
    return {
      enter: {
        x: direction === "next" ? slideDistance : -slideDistance,
        opacity: 0,
        scale: 0.95,
      },
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
      },
      exit: {
        x: direction === "next" ? -slideDistance : slideDistance,
        opacity: 0,
        scale: 0.95,
      },
    };
  };

  const variants = getTransitionVariants();

  const contextValue = {
    currentSlide,
    totalSlides,
    wrappedData,
    nextSlide,
    previousSlide,
    jumpToSlide,
    isPaused,
    togglePause,
    direction,
  };

  return (
    <StoryProvider value={contextValue}>
      <div className="fixed inset-0 bg-background overflow-hidden">
        <ProgressRail />
        
        <motion.div
          className="h-screen w-screen cursor-pointer"
          onPanEnd={handlePanEnd}
          onClick={handleClick}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reducedMotion ? 0.2 : 0.4,
                ease: "easeInOut",
              }}
              className="h-full w-full"
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Desktop hint banner for mobile users */}
        <DesktopHint />

        {/* Debug info (optional, remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 left-4 text-xs mono-caption text-white/40 pointer-events-none">
            Slide {currentSlide + 1} / {totalSlides}
            {isPaused && " (Paused)"}
          </div>
        )}
      </div>
    </StoryProvider>
  );
}

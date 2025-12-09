"use client";

import { useState, useEffect } from "react";

export interface MobileDetection {
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useMobile(): MobileDetection {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    prefersReducedMotion: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const isMobile = width < MOBILE_BREAKPOINT;
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
      
      // Check for touch support
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error - msMaxTouchPoints is legacy IE
        navigator.msMaxTouchPoints > 0;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setDetection({
        isMobile,
        isTablet,
        prefersReducedMotion,
        isTouchDevice,
      });
    };

    // Initial check
    checkMobile();

    // Listen for window resize
    window.addEventListener("resize", checkMobile);

    // Listen for reduced motion preference changes
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => checkMobile();
    motionMediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionMediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return detection;
}

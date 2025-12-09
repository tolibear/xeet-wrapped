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
const MOTION_STORAGE_KEY = "xeet-wrapped-reduced-motion";

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

      // Check for reduced motion preference (OS level)
      const osPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Check for manual override in localStorage
      const manualOverride = localStorage.getItem(MOTION_STORAGE_KEY);
      const hasManualOverride = manualOverride !== null;
      const manualReducedMotion = manualOverride === "true";

      // Manual override takes precedence over OS preference
      const prefersReducedMotion = hasManualOverride 
        ? manualReducedMotion 
        : osPreference;

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

    // Listen for reduced motion preference changes (OS level)
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => checkMobile();
    motionMediaQuery.addEventListener("change", handleMotionChange);

    // Listen for localStorage changes (manual toggle)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === MOTION_STORAGE_KEY) {
        checkMobile();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Also listen for same-window storage events via custom event
    const handleCustomStorageChange = () => checkMobile();
    window.addEventListener("motion-toggle", handleCustomStorageChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionMediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("motion-toggle", handleCustomStorageChange);
    };
  }, []);

  return detection;
}

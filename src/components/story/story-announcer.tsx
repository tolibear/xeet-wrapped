"use client";

import { useEffect, useState } from "react";
import { useStory } from "./use-story";

// Slide titles for screen reader announcements
const SLIDE_TITLES = [
  "Boot Sequence",
  "Identity",
  "Year at a Glance",
  "Timeline",
  "Top Moments",
  "Topics",
  "Projects",
  "Friends",
  "Terminal Log",
  "Achievements",
  "Final Poster",
];

/**
 * Invisible component that announces slide changes to screen readers
 * Uses ARIA live region with polite announcement strategy
 */
export function StoryAnnouncer() {
  const { currentSlide, totalSlides } = useStory();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // Update announcement when slide changes
    const slideNumber = currentSlide + 1;
    const slideTitle = SLIDE_TITLES[currentSlide] || `Slide ${slideNumber}`;
    const newAnnouncement = `${slideTitle}. Slide ${slideNumber} of ${totalSlides}`;
    
    setAnnouncement(newAnnouncement);
  }, [currentSlide, totalSlides]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}



"use client";

import { createContext, ReactNode } from "react";
import type { XeetWrappedData, NavigationDirection } from "@/lib/types";

export interface StoryContextValue {
  currentSlide: number;
  totalSlides: number;
  wrappedData: XeetWrappedData;
  nextSlide: () => void;
  previousSlide: () => void;
  jumpToSlide: (index: number) => void;
  isPaused: boolean;
  togglePause: () => void;
  direction: NavigationDirection;
  reducedMotion: boolean;
}

export const StoryContext = createContext<StoryContextValue | null>(null);

interface StoryProviderProps {
  children: ReactNode;
  value: StoryContextValue;
}

export function StoryProvider({ children, value }: StoryProviderProps) {
  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}

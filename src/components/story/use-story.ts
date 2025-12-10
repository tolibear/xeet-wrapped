"use client";

import { useContext } from "react";
import { StoryContext, StoryContextValue } from "./story-context";

export function useStory(): StoryContextValue {
  const context = useContext(StoryContext);
  
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  
  return context;
}


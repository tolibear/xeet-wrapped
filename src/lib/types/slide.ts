// Slide-specific types for story navigation

export type SlideId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type TransitionType = "fade" | "slideLeft" | "slideRight" | "scale";

export type NavigationDirection = "next" | "previous" | "jump";

export interface SlideConfig {
  id: SlideId;
  title: string;
  duration?: number; // Auto-advance duration in ms (optional)
  transitionType?: TransitionType;
  backgroundColor?: string;
}

export interface SlideProps {
  isActive: boolean;
  direction: NavigationDirection;
}


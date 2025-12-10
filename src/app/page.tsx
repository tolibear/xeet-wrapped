"use client";

import { useState } from "react";
import { StoryContainer } from "@/components/story";
import {
  BootSlide,
  IdentitySlide,
  StatsSlide,
  TimelineSlide,
  MomentsSlide,
  ProjectsSlide,
  FriendsSlide,
  TerminalSlide,
  FinalPosterSlide,
} from "@/components/slides";
import { AuthLanding } from "@/components/auth-landing";
import { PERSONA_ELON } from "@/lib/mock-data/personas";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const wrappedData = PERSONA_ELON;

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  // Show auth landing if not authenticated
  if (!isAuthenticated) {
    return <AuthLanding onSignIn={handleSignIn} />;
  }

  // Define all slides in order - Terminal slide happens right after auth
  const slides = [
    <TerminalSlide key="slide-0" />,
    <BootSlide key="slide-1" />,
    <IdentitySlide key="slide-2" />,
    <StatsSlide key="slide-3" />,
    <TimelineSlide key="slide-4" />,
    <MomentsSlide key="slide-5" />,
    <ProjectsSlide key="slide-6" />,
    <FriendsSlide key="slide-7" />,
    <FinalPosterSlide key="slide-8" />,
  ];

  return (
    <StoryContainer
      wrappedData={wrappedData}
      slides={slides}
      autoAdvance={false}
      autoAdvanceDuration={5}
    />
  );
}

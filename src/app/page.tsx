"use client";

import { useState, useRef, useEffect } from "react";
import { StoryContainer } from "@/components/story";
import {
  BootSlide,
  IdentitySlide,
  StatsSlide,
  TimelineSlide,
  MomentsSlide,
  ProjectsSlide,
  FriendsSlide,
  FinalPosterSlide,
} from "@/components/slides";
import { AuthLanding } from "@/components/auth-landing";
import { PERSONA_ELON } from "@/lib/mock-data/personas";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const wrappedData = PERSONA_ELON;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const startMusic = () => {
    if (!audioRef.current && !musicStarted) {
      const audio = new Audio('/assets/audio/music/Neon Dreams.mp3');
      audio.volume = 0;
      audio.loop = true;
      audioRef.current = audio;
      setMusicStarted(true);
      
      // Play with error handling
      audio.play().catch((error) => {
        console.log('Audio autoplay prevented:', error);
      });

      // Fade in from 0 to 0.5 over 3 seconds
      let currentVolume = 0;
      const targetVolume = 0.5;
      const fadeInDuration = 3000; // 3 seconds
      const steps = 60; // 60 steps for smooth fade
      const volumeIncrement = targetVolume / steps;
      const intervalTime = fadeInDuration / steps;

      const fadeInterval = setInterval(() => {
        currentVolume += volumeIncrement;
        if (currentVolume >= targetVolume) {
          currentVolume = targetVolume;
          clearInterval(fadeInterval);
        }
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      }, intervalTime);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Show auth landing if not authenticated
  if (!isAuthenticated) {
    return (
      <AuthLanding 
        onSignIn={handleSignIn} 
        username={wrappedData.user.handle}
        onMusicStart={startMusic}
      />
    );
  }

  // Define all slides in order
  const slides = [
    <BootSlide key="slide-0" />,
    <IdentitySlide key="slide-1" />,
    <StatsSlide key="slide-2" />,
    <TimelineSlide key="slide-3" />,
    <MomentsSlide key="slide-4" />,
    <ProjectsSlide key="slide-5" />,
    <FriendsSlide key="slide-6" />,
    <FinalPosterSlide key="slide-7" />,
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

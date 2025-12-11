"use client";

import { useState, useRef, useEffect } from "react";
import { StoryContainer } from "@/components/story";
import {
  BootSlide,
  IdentitySlide,
  StatsSlide,
  TimelineSlide,
  MomentsSlide,
  FriendsSlide,
  FinalPosterSlide,
} from "@/components/slides";
import { AuthLanding } from "@/components/auth-landing";
import { PERSONA_ELON } from "@/lib/mock-data/personas";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const wrappedData = PERSONA_ELON;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolumeRef = useRef<number>(0.5); // Store previous volume for unmuting

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
          previousVolumeRef.current = currentVolume;
        }
      }, intervalTime);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      // Unmute: restore previous volume (or default to 0.5 if somehow 0)
      const volumeToRestore = previousVolumeRef.current > 0 ? previousVolumeRef.current : 0.5;
      audioRef.current.volume = volumeToRestore;
      setIsMuted(false);
    } else {
      // Mute: save current volume (if > 0) and set to 0
      const currentVolume = audioRef.current.volume;
      if (currentVolume > 0) {
        previousVolumeRef.current = currentVolume;
      }
      audioRef.current.volume = 0;
      setIsMuted(true);
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
        isMuted={isMuted}
        onToggleMute={toggleMute}
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
    <FriendsSlide key="slide-5" />,
    <FinalPosterSlide key="slide-6" />,
  ];

  return (
    <StoryContainer
      wrappedData={wrappedData}
      slides={slides}
      autoAdvance={false}
      autoAdvanceDuration={5}
      isMuted={isMuted}
      onToggleMute={toggleMute}
    />
  );
}

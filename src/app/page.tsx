import { StoryContainer } from "@/components/story";
import {
  BootSlide,
  IdentitySlide,
  StatsSlide,
  TimelineSlide,
  MomentsSlide,
  TopicsSlide,
  ProjectsSlide,
  FriendsSlide,
  TerminalSlide,
  AchievementsSlide,
  FinalPosterSlide,
} from "@/components/slides";
import { PERSONA_ELON } from "@/lib/mock-data/personas";

export default function HomePage() {
  const wrappedData = PERSONA_ELON;

  // Define all slides in order (matching Phase 1 plan: 11 slides total)
  const slides = [
    <BootSlide key="slide-0" />,
    <IdentitySlide key="slide-1" />,
    <StatsSlide key="slide-2" />,
    <TimelineSlide key="slide-3" />,
    <MomentsSlide key="slide-4" />,
    <TopicsSlide key="slide-5" />,
    <ProjectsSlide key="slide-6" />,
    <FriendsSlide key="slide-7" />,
    <TerminalSlide key="slide-8" />,
    <AchievementsSlide key="slide-9" />,
    <FinalPosterSlide key="slide-10" />,
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

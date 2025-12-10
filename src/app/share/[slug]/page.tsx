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
} from "@/components/slides";
import { ShareFinalSlide } from "@/components/slides/share-final-slide";
import { PERSONA_ELON } from "@/lib/mock-data/personas";

export default async function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // All shared links display the Elon Musk persona
  const wrappedData = PERSONA_ELON;
  
  // Await params as required by Next.js
  await params;

  // Define all slides in order (using share final slide instead of regular final slide)
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
    <ShareFinalSlide key="slide-10" />,
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

"use client";

import { cn } from "@/lib/utils/cn";
import { AvatarFrame } from "./avatar-frame";
import { PersonaChip } from "./persona-chip";
import type { XeetWrappedData } from "@/lib/types";

export type PosterPreviewProps = {
  wrappedData: XeetWrappedData;
  aspectRatio?: "story" | "landscape";
  className?: string;
};

export function PosterPreview({
  wrappedData,
  aspectRatio = "story",
  className,
}: PosterPreviewProps) {
  const { user, identity, stats, friends, topics, era } = wrappedData;
  
  // Select top stats to display
  const topStats = [
    { label: "Posts", value: stats.totalXeets.toLocaleString() },
    { label: "Replies", value: stats.replies.toLocaleString() },
    { label: "Threads", value: stats.threads.toLocaleString() },
    { label: "Days Active", value: stats.daysActive.toLocaleString() },
  ];

  // Get top 3-4 friends
  const topFriends = friends.innerCircle.slice(0, 3);

  return (
    <div
      id="poster-preview"
      className={cn(
        "relative overflow-hidden rounded-3xl",
        aspectRatio === "story" ? "aspect-[9/16]" : "aspect-[16/9]",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-purple-950/40" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
          }}
        />
      </div>

      {/* Content */}
      <div className={cn(
        "relative h-full flex flex-col justify-between p-8",
        aspectRatio === "landscape" && "flex-row items-center gap-8"
      )}>
        {/* Header section */}
        <div className={cn(
          "space-y-6",
          aspectRatio === "landscape" && "flex-1"
        )}>
          {/* Avatar and name */}
          <div className="flex items-center gap-4">
            <AvatarFrame
              src={user.avatar}
              alt={user.handle}
              size="lg"
            />
            <div>
              <div className="text-xl font-bold text-white">
                @{user.handle}
              </div>
              <div className="mono-caption text-red-primary text-xs">
                2024 Wrapped
              </div>
            </div>
          </div>

          {/* Era */}
          {era && (
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-lg font-semibold text-white">{era}</span>
            </div>
          )}

          {/* Persona chips */}
          <div className="flex flex-wrap gap-2">
            {identity.personaChips.slice(0, 4).map((chip, i) => (
              <PersonaChip key={i} label={chip} />
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className={cn(
          "grid grid-cols-2 gap-4",
          aspectRatio === "landscape" && "flex-1"
        )}>
          {topStats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl font-bold headline-condensed text-white">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mono-caption">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer section */}
        <div className={cn(
          "space-y-4",
          aspectRatio === "landscape" && "flex-1"
        )}>
          {/* Signature phrase */}
          {topics.signaturePhrase && (
            <div className="text-center">
              <div className="text-lg text-white/80 italic">
                "{topics.signaturePhrase}" {topics.signatureEmoji}
              </div>
            </div>
          )}

          {/* Friends */}
          {topFriends.length > 0 && (
            <div className="space-y-2">
              <div className="mono-caption text-white/60 text-xs text-center">
                Connected with
              </div>
              <div className="flex justify-center gap-2">
                {topFriends.map((friend, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20"
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.handle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Brand */}
          <div className="text-center space-y-1">
            <div className="text-red-primary font-bold text-lg">
              Xeet Wrapped
            </div>
            <div className="mono-caption text-white/40 text-xs">
              Your year in review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

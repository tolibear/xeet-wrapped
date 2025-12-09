import { AvatarFrame } from "./avatar-frame";
import { GlassPanel } from "./glass-panel";
import { cn } from "@/lib/utils/cn";
import type { Friend } from "@/lib/types";

export type FriendTileProps = {
  friend: Friend;
  className?: string;
};

export function FriendTile({ friend, className }: FriendTileProps) {
  // Truncate long handles on mobile
  const displayHandle = friend.handle.length > 12 
    ? `${friend.handle.slice(0, 12)}...` 
    : friend.handle;

  return (
    <GlassPanel elevation="thin" className={cn("p-3 md:p-5", className)}>
      <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
        {/* Avatar */}
        <AvatarFrame src={friend.avatar} alt={friend.displayName || friend.handle} size="md" />

        {/* Name and handle */}
        <div className="space-y-0.5 md:space-y-1 w-full">
          {friend.displayName && (
            <h4 className="text-white font-semibold text-xs md:text-sm truncate px-1">
              {friend.displayName}
            </h4>
          )}
          <p className="mono-caption text-xs text-white/60 truncate px-1">
            @{displayHandle}
          </p>
        </div>

        {/* Relationship badge */}
        <div className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-[var(--red-primary)]/10 border border-[var(--red-primary)]/30">
          <span className="text-[10px] md:text-xs text-[var(--red-primary)]">
            {friend.relationship}
          </span>
        </div>

        {/* Interaction count */}
        <div className="text-[10px] md:text-xs text-white/40 mono-caption">
          {friend.interactions} interactions
        </div>
      </div>
    </GlassPanel>
  );
}

import { GlassPanel } from "./glass-panel";
import { cn } from "@/lib/utils/cn";
import type { Xeet } from "@/lib/types";

export type XeetCardProps = {
  xeet: Xeet;
  className?: string;
};

export function XeetCard({ xeet, className }: XeetCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Truncate content if too long
  const displayContent =
    xeet.content.length > 180
      ? xeet.content.slice(0, 180) + "..."
      : xeet.content;

  return (
    <GlassPanel elevation="medium" className={cn("p-6", className)}>
      <div className="space-y-4">
        {/* Content */}
        <p className="text-white text-base leading-relaxed">{displayContent}</p>

        {/* Engagement stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-white/60">
            <span>❤️</span>
            <span className="mono-caption text-xs">
              {formatNumber(xeet.likes)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <span>🔁</span>
            <span className="mono-caption text-xs">
              {formatNumber(xeet.reposts)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <span>💬</span>
            <span className="mono-caption text-xs">
              {formatNumber(xeet.replies)}
            </span>
          </div>
          <div className="ml-auto mono-caption text-xs text-white/40">
            {formatDate(xeet.timestamp)}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

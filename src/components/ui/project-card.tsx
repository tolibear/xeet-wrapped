import Image from "next/image";
import { GlassPanel } from "./glass-panel";
import { cn } from "@/lib/utils/cn";
import type { Project } from "@/lib/types";

export type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getJourneyLength = () => {
    const first = new Date(project.firstMention);
    const last = new Date(project.lastMention);
    const diffMonths =
      (last.getFullYear() - first.getFullYear()) * 12 +
      last.getMonth() -
      first.getMonth();
    return Math.max(1, diffMonths);
  };

  const journeyMonths = getJourneyLength();

  return (
    <GlassPanel elevation="medium" className={cn("p-6", className)}>
      <div className="space-y-4">
        {/* Header with logo and mentions badge */}
        <div className="flex items-start justify-between gap-4">
          {project.logo && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white/10 border border-white/10">
              <Image
                src={project.logo}
                alt={project.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate">
              {project.name}
            </h3>
          </div>
          <div className="flex-shrink-0 px-3 py-1 rounded-full bg-[var(--red-primary)]/20 border border-[var(--red-primary)]/30">
            <span className="mono-caption text-xs text-[var(--red-primary)]">
              {project.totalMentions} mentions
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 line-clamp-2">
          {project.description}
        </p>

        {/* Journey arc */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs mono-caption text-white/40">
            <span>First mention</span>
            <span>Latest</span>
          </div>
          
          {/* Progress bar showing journey */}
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--red-primary)] to-purple-500 rounded-full"
              style={{ width: "100%" }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{formatDate(project.firstMention)}</span>
            <span className="mono-caption text-white/40">
              {journeyMonths} {journeyMonths === 1 ? "month" : "months"}
            </span>
            <span>{formatDate(project.lastMention)}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

import { ReactNode } from "react";
import { GlassPanel } from "./glass-panel";
import { cn } from "@/lib/utils/cn";

export type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <GlassPanel elevation="medium" className={cn("p-4 md:p-6", className)}>
      <div className="flex flex-col gap-1 md:gap-2">
        {icon && <div className="text-[var(--red-primary)] mb-0.5 md:mb-1">{icon}</div>}
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
          {value}
        </div>
        <div className="mono-caption text-xs md:text-sm text-white/60">{label}</div>
      </div>
    </GlassPanel>
  );
}

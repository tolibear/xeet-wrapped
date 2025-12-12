import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

export type GlassPanelProps = {
  children: ReactNode;
  elevation?: "thin" | "medium" | "thick";
  glow?: boolean;
  className?: string;
};

export function GlassPanel({
  children,
  elevation = "medium",
  glow = false,
  className,
}: GlassPanelProps) {
  const elevationStyles = {
    thin: "backdrop-blur-[8px] bg-white/5",
    medium: "backdrop-blur-[16px] bg-white/8",
    thick: "backdrop-blur-[24px] bg-white/12",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border",
        elevationStyles[elevation],
        glow
          ? "border-[rgba(255,0,51,0.3)] shadow-[0_0_20px_rgba(255,0,51,0.4)]"
          : "border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}




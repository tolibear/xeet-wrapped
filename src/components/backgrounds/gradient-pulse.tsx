"use client";

import { cn } from "@/lib/utils/cn";

type GradientPulseProps = {
  className?: string;
};

export function GradientPulse({ className }: GradientPulseProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      
      {/* Pulsing red glow - center bottom */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-30 animate-pulse-slow"
        style={{
          background: "radial-gradient(ellipse at center, var(--red-primary) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      
      {/* Secondary subtle pulse - top right */}
      <div 
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20 animate-pulse-slower"
        style={{
          background: "radial-gradient(circle at center, var(--red-secondary) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </div>
  );
}

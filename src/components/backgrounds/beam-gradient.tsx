"use client";

import { cn } from "@/lib/utils/cn";

type BeamGradientProps = {
  className?: string;
};

export function BeamGradient({ className }: BeamGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-purple-950/20" />
      
      {/* Diagonal beam 1 */}
      <div 
        className="absolute -top-1/2 -left-1/4 w-[150%] h-32 rotate-[25deg] animate-beam-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)",
          filter: "blur(20px)",
        }}
      />
      
      {/* Diagonal beam 2 */}
      <div 
        className="absolute top-1/4 -left-1/4 w-[150%] h-24 rotate-[25deg] animate-beam-2"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,0,51,0.2), transparent)",
          filter: "blur(30px)",
        }}
      />
      
      {/* Diagonal beam 3 */}
      <div 
        className="absolute top-2/3 -left-1/4 w-[150%] h-20 rotate-[25deg] animate-beam-3"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.15), transparent)",
          filter: "blur(25px)",
        }}
      />
      
      {/* Horizontal accent line */}
      <div 
        className="absolute top-1/2 left-0 w-full h-[1px] opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, var(--red-primary), transparent)",
        }}
      />
      
      {/* Corner glow */}
      <div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-30"
        style={{
          background: "radial-gradient(circle at bottom right, rgba(168,85,247,0.4), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}




"use client";

import { cn } from "@/lib/utils/cn";

type TerminalGradientProps = {
  className?: string;
};

export function TerminalGradient({ className }: TerminalGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base dark background with green tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/30 to-black" />
      
      {/* CRT glow effect - green */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full animate-pulse-slower"
        style={{
          background: "radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Red warning glow */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] rounded-full animate-pulse-slow"
        style={{
          background: "radial-gradient(circle at center, rgba(239,68,68,0.1) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* CRT scanline overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 animate-scanline"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(34,197,94,0.05) 51%)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>
      
      {/* Horizontal scanlines (static) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  );
}


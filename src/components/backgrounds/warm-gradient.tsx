"use client";

import { cn } from "@/lib/utils/cn";

type WarmGradientProps = {
  className?: string;
};

export function WarmGradient({ className }: WarmGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/20 via-black to-purple-950/20" />
      
      {/* Warm yellow glow - top left */}
      <div 
        className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full animate-flow-1"
        style={{
          background: "radial-gradient(circle at center, rgba(234,179,8,0.2) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Soft purple glow - bottom right */}
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-[65%] h-[65%] rounded-full animate-flow-2"
        style={{
          background: "radial-gradient(circle at center, rgba(168,85,247,0.25) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />
      
      {/* Amber accent - center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full animate-flow-3"
        style={{
          background: "radial-gradient(circle at center, rgba(251,191,36,0.15) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      
      {/* Pink accent - mid left */}
      <div 
        className="absolute top-1/3 left-1/4 w-[40%] h-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(236,72,153,0.18) 0%, transparent 65%)",
          filter: "blur(75px)",
          animation: "warmPulse 6s ease-in-out infinite",
        }}
      />
      
      {/* Violet accent - mid right */}
      <div 
        className="absolute bottom-1/3 right-1/4 w-[35%] h-[35%] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(139,92,246,0.2) 0%, transparent 60%)",
          filter: "blur(65px)",
          animation: "warmPulse 7s ease-in-out infinite 1s",
        }}
      />
      
      <style jsx>{`
        @keyframes warmPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils/cn";

type OrganicGradientProps = {
  className?: string;
};

export function OrganicGradient({ className }: OrganicGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-pink-950/20 to-black" />
      
      {/* Organic flowing blob 1 - pink */}
      <div 
        className="absolute top-0 left-1/4 w-[60%] h-[60%] rounded-full animate-flow-1"
        style={{
          background: "radial-gradient(circle at center, rgba(236,72,153,0.25) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      
      {/* Organic flowing blob 2 - purple */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] rounded-full animate-flow-2"
        style={{
          background: "radial-gradient(circle at center, rgba(168,85,247,0.3) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Organic flowing blob 3 - red */}
      <div 
        className="absolute top-1/2 left-0 w-[45%] h-[45%] rounded-full animate-flow-3"
        style={{
          background: "radial-gradient(circle at center, rgba(255,0,51,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Organic flowing blob 4 - deep purple */}
      <div 
        className="absolute bottom-0 left-1/3 w-[40%] h-[40%] rounded-full animate-flow-1"
        style={{
          background: "radial-gradient(circle at center, rgba(147,51,234,0.25) 0%, transparent 65%)",
          filter: "blur(75px)",
          animationDelay: "1.5s",
          animationDuration: "20s",
        }}
      />
    </div>
  );
}



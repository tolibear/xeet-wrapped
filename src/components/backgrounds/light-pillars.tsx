"use client";

import { cn } from "@/lib/utils/cn";

type LightPillarsProps = {
  className?: string;
};

export function LightPillars({ className }: LightPillarsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-black" />
      
      {/* Light pillars container */}
      <div className="absolute inset-0 flex justify-center items-end opacity-40">
        {/* Pillar 1 - left */}
        <div 
          className="absolute left-[15%] bottom-0 w-[2px] h-[80%] animate-pillar-1"
          style={{
            background: "linear-gradient(to top, var(--red-primary), transparent)",
            boxShadow: "0 0 40px 10px rgba(255,0,51,0.3)",
          }}
        />
        
        {/* Pillar 2 - center-left */}
        <div 
          className="absolute left-[35%] bottom-0 w-[3px] h-[90%] animate-pillar-2"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)",
            boxShadow: "0 0 60px 15px rgba(255,255,255,0.2)",
          }}
        />
        
        {/* Pillar 3 - center */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[4px] h-full animate-pillar-3"
          style={{
            background: "linear-gradient(to top, var(--red-primary), rgba(255,255,255,0.5), transparent)",
            boxShadow: "0 0 80px 20px rgba(255,0,51,0.4)",
          }}
        />
        
        {/* Pillar 4 - center-right */}
        <div 
          className="absolute right-[35%] bottom-0 w-[3px] h-[85%] animate-pillar-4"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)",
            boxShadow: "0 0 50px 12px rgba(255,255,255,0.15)",
          }}
        />
        
        {/* Pillar 5 - right */}
        <div 
          className="absolute right-[15%] bottom-0 w-[2px] h-[70%] animate-pillar-5"
          style={{
            background: "linear-gradient(to top, var(--red-secondary), transparent)",
            boxShadow: "0 0 35px 8px rgba(204,0,0,0.3)",
          }}
        />
      </div>
      
      {/* Top fade overlay */}
      <div 
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
        }}
      />
    </div>
  );
}



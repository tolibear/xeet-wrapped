"use client";

import { cn } from "@/lib/utils/cn";

type BlindsGradientProps = {
  className?: string;
};

export function BlindsGradient({ className }: BlindsGradientProps) {
  // Create 8 vertical blinds with staggered animations
  const blinds = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 via-black to-black" />
      
      {/* Vertical blinds */}
      <div className="absolute inset-0 flex">
        {blinds.map((index) => (
          <div
            key={index}
            className="flex-1 relative"
            style={{
              animation: `blindReveal 2s ease-out ${index * 0.1}s infinite alternate`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, 
                  rgba(34,197,94,${0.05 + index * 0.02}) 0%, 
                  transparent 50%, 
                  rgba(168,85,247,${0.05 + index * 0.015}) 100%
                )`,
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Overlay glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle at center, rgba(34,197,94,0.3) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      
      <style jsx>{`
        @keyframes blindReveal {
          0% {
            opacity: 0.3;
            transform: scaleY(0.95);
          }
          100% {
            opacity: 0.7;
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}



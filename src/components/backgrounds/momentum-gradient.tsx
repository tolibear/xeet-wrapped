"use client";

import { cn } from "@/lib/utils/cn";

type MomentumGradientProps = {
  className?: string;
};

export function MomentumGradient({ className }: MomentumGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950/20 to-black" />
      
      {/* Forward-moving gradient wave 1 */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.3) 50%, transparent 100%)",
          animation: "momentum-wave-1 8s ease-in-out infinite",
        }}
      />
      
      {/* Forward-moving gradient wave 2 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(251,146,60,0.25) 50%, transparent 100%)",
          animation: "momentum-wave-2 10s ease-in-out infinite 1s",
        }}
      />
      
      {/* Amber accent glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(245,158,11,0.25) 0%, transparent 60%)",
          filter: "blur(80px)",
          animation: "momentum-pulse 4s ease-in-out infinite",
        }}
      />
      
      {/* Orange accent glow */}
      <div 
        className="absolute bottom-1/3 left-1/4 w-[45%] h-[45%] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(249,115,22,0.3) 0%, transparent 65%)",
          filter: "blur(70px)",
          animation: "momentum-pulse 5s ease-in-out infinite 1s",
        }}
      />
      
      {/* Diagonal streak effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-20"
        style={{
          background: "linear-gradient(135deg, transparent 40%, rgba(251,146,60,0.15) 50%, transparent 60%)",
          animation: "momentum-streak 12s linear infinite",
        }}
      />
      
      <style jsx>{`
        @keyframes momentum-wave-1 {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes momentum-wave-2 {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes momentum-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes momentum-streak {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
      `}</style>
    </div>
  );
}

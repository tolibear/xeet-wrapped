"use client";

import { cn } from "@/lib/utils/cn";

type FlowingGradientProps = {
  className?: string;
};

export function FlowingGradient({ className }: FlowingGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base dark */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Flowing gradient blob 1 */}
      <div 
        className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full animate-flow-1"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Flowing gradient blob 2 */}
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full animate-flow-2"
        style={{
          background: "radial-gradient(circle at center, var(--red-primary) 0%, transparent 50%)",
          filter: "blur(80px)",
          opacity: 0.4,
        }}
      />
      
      {/* Flowing gradient blob 3 */}
      <div 
        className="absolute top-1/3 right-1/4 w-[50%] h-[50%] rounded-full animate-flow-3"
        style={{
          background: "radial-gradient(circle at center, rgba(168,85,247,0.4) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      
      {/* Subtle grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

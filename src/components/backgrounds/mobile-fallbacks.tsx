"use client";

import { cn } from "@/lib/utils/cn";

// CSS fallback for Silk - Animated radial gradient with noise
export function SilkFallback({ 
  color = "#FF0033",
  className 
}: { 
  color?: string; 
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <div 
        className="absolute inset-0 animate-pulse-slower"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)`,
        }}
      />
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `radial-gradient(circle at 30% 60%, ${color}30, transparent 50%)`,
        }}
      />
      <div 
        className="absolute inset-0 animate-pulse-slower"
        style={{
          background: `radial-gradient(circle at 70% 40%, ${color}25, transparent 60%)`,
        }}
      />
    </div>
  );
}

// CSS fallback for Aurora - Multi-stop linear gradient with animation
export function AuroraFallback({ 
  colorStops = ["#FF0033", "#990000", "#FF0033"],
  className 
}: { 
  colorStops?: string[];
  className?: string;
}) {
  const gradientStops = colorStops.map((color, i) => {
    const position = (i / (colorStops.length - 1)) * 100;
    return `${color}40 ${position}%`;
  }).join(", ");

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 animate-flow-1"
        style={{
          background: `linear-gradient(135deg, ${gradientStops})`,
          opacity: 0.6,
        }}
      />
      <div 
        className="absolute inset-0 animate-flow-2"
        style={{
          background: `linear-gradient(-45deg, ${gradientStops})`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}

// CSS fallback for Plasma - Radial gradient pulse effect
export function PlasmaFallback({ 
  color = "#FF0033",
  className 
}: { 
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 animate-pulse-slower"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${color}50, transparent 50%)`,
        }}
      />
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `radial-gradient(ellipse at 70% 70%, ${color}40, transparent 50%)`,
        }}
      />
      <div 
        className="absolute inset-0 animate-pulse-slower"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${color}35, transparent 60%)`,
        }}
      />
    </div>
  );
}

// CSS fallback for Beams - Linear gradient streaks
export function BeamsFallback({ 
  lightColor = "#FF0033",
  className 
}: { 
  lightColor?: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 animate-beam-1"
        style={{
          background: `linear-gradient(25deg, transparent 30%, ${lightColor}40 50%, transparent 70%)`,
        }}
      />
      <div 
        className="absolute inset-0 animate-beam-2"
        style={{
          background: `linear-gradient(25deg, transparent 40%, ${lightColor}30 60%, transparent 80%)`,
        }}
      />
      <div 
        className="absolute inset-0 animate-beam-3"
        style={{
          background: `linear-gradient(25deg, transparent 20%, ${lightColor}25 50%, transparent 75%)`,
        }}
      />
    </div>
  );
}

// CSS fallback for Iridescence - Multi-color gradient shimmer
export function IridescenceFallback({ 
  color = [1, 0.2, 0.2],
  className 
}: { 
  color?: number[];
  className?: string;
}) {
  // Convert RGB array [0-1] to hex
  const toHex = (value: number) => Math.round(value * 255).toString(16).padStart(2, '0');
  const hexColor = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 animate-flow-1"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${hexColor}50, ${hexColor}30, ${hexColor}40, ${hexColor}50)`,
          opacity: 0.5,
        }}
      />
      <div 
        className="absolute inset-0 animate-flow-3"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${hexColor}40, transparent 70%)`,
        }}
      />
    </div>
  );
}



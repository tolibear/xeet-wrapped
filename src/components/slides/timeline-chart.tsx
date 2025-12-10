"use client";

import { motion } from "framer-motion";
import type { DataPoint } from "@/lib/types";

type TimelineChartProps = {
  data: DataPoint[];
  color?: string;
  showPeak?: boolean;
};

export function TimelineChart({ 
  data, 
  color = "var(--red-primary)",
  showPeak = true,
}: TimelineChartProps) {
  if (data.length === 0) return null;

  const values = data.map(d => d.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;
  
  // Chart dimensions
  const width = 100;
  const height = 50;
  const padding = { top: 5, right: 2, bottom: 8, left: 2 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Calculate points
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.value - minValue) / range) * chartHeight;
    return { x, y, value: d.value, label: d.label };
  });
  
  // Create path
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  
  // Find peak point
  const peakIndex = values.indexOf(maxValue);
  const peakPoint = points[peakIndex];
  
  // Create area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  return (
    <div className="w-full">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <motion.path
          d={areaD}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        
        {/* Main line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="1"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ delay: 1.5 + i * 0.05, duration: 0.2 }}
          />
        ))}
        
        {/* Peak indicator */}
        {showPeak && peakPoint && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.3 }}
          >
            <circle
              cx={peakPoint.x}
              cy={peakPoint.y}
              r="2"
              fill={color}
            />
            <circle
              cx={peakPoint.x}
              cy={peakPoint.y}
              r="3"
              fill="none"
              stroke={color}
              strokeWidth="0.3"
              opacity="0.5"
            />
          </motion.g>
        )}
        
        {/* Month labels */}
        {points.filter((_, i) => i % 2 === 0 || i === points.length - 1).map((point, i) => (
          <motion.text
            key={i}
            x={point.x}
            y={height - 1}
            textAnchor="middle"
            className="fill-white/40"
            style={{ fontSize: "2.5px", fontFamily: "var(--font-geist-mono)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
          >
            {point.label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}


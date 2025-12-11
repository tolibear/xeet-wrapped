"use client";

import { motion } from "framer-motion";
import type { DataPoint } from "@/lib/types";

type Dataset = {
  data: DataPoint[];
  color: string;
  label: string;
};

type TimelineChartProps = {
  datasets: Dataset[];
  showPeak?: boolean;
};

export function TimelineChart({ 
  datasets,
  showPeak = true,
}: TimelineChartProps) {
  if (datasets.length === 0 || datasets[0].data.length === 0) return null;

  // Chart dimensions
  const width = 100;
  const height = 50;
  const padding = { top: 5, right: 2, bottom: 8, left: 2 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Calculate points for each dataset independently (separate Y-axis scales)
  const datasetsWithPoints = datasets.map((dataset, dsIndex) => {
    // Each dataset gets its own min/max for independent scaling
    const values = dataset.data.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    const points = dataset.data.map((d, i) => {
      const x = padding.left + (i / (dataset.data.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((d.value - minValue) / range) * chartHeight;
      return { x, y, value: d.value, label: d.label };
    });
    
    const pathD = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    
    const peakValue = Math.max(...values);
    const peakIndex = values.indexOf(peakValue);
    const peakPoint = points[peakIndex];
    
    return {
      ...dataset,
      points,
      pathD,
      peakPoint,
      dsIndex,
    };
  });

  // Use first dataset's labels for x-axis
  const labelPoints = datasetsWithPoints[0].points;

  return (
    <div className="w-full">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradient definitions for each line */}
        <defs>
          {datasetsWithPoints.map((dataset) => (
            <linearGradient 
              key={`lineGradient-${dataset.dsIndex}`}
              id={`lineGradient-${dataset.dsIndex}`} 
              x1="0%" y1="0%" x2="100%" y2="0%"
            >
              <stop offset="0%" stopColor={dataset.color} stopOpacity="0.5" />
              <stop offset="50%" stopColor={dataset.color} stopOpacity="1" />
              <stop offset="100%" stopColor={dataset.color} stopOpacity="0.5" />
            </linearGradient>
          ))}
        </defs>
        
        {/* Render each line */}
        {datasetsWithPoints.map((dataset) => (
          <g key={`line-${dataset.dsIndex}`}>
            {/* Main line */}
            <motion.path
              d={dataset.pathD}
              fill="none"
              stroke={`url(#lineGradient-${dataset.dsIndex})`}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: dataset.dsIndex * 0.2 }}
            />
            
            {/* Data points */}
            {dataset.points.map((point, i) => (
              <motion.circle
                key={`point-${dataset.dsIndex}-${i}`}
                cx={point.x}
                cy={point.y}
                r="0.8"
                fill={dataset.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 1.5 + dataset.dsIndex * 0.2 + i * 0.05, duration: 0.2 }}
              />
            ))}
            
            {/* Peak indicator */}
            {showPeak && dataset.peakPoint && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + dataset.dsIndex * 0.1, duration: 0.3 }}
              >
                <circle
                  cx={dataset.peakPoint.x}
                  cy={dataset.peakPoint.y}
                  r="1.5"
                  fill={dataset.color}
                />
                <circle
                  cx={dataset.peakPoint.x}
                  cy={dataset.peakPoint.y}
                  r="2.5"
                  fill="none"
                  stroke={dataset.color}
                  strokeWidth="0.3"
                  opacity="0.5"
                />
              </motion.g>
            )}
          </g>
        ))}
        
        {/* Month labels */}
        {labelPoints.filter((_, i) => i % 2 === 0 || i === labelPoints.length - 1).map((point, i) => (
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



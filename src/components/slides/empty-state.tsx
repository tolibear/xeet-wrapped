"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

/**
 * Reusable empty state component for slides with missing or empty data
 * Maintains consistent design system appearance
 */
export function EmptyState({
  title,
  description,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex items-center justify-center px-6 py-12", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassPanel elevation="medium" className="p-8 md:p-12">
          <div className="text-center space-y-4">
            {/* Icon */}
            {icon && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                  {icon}
                </div>
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold headline-condensed text-white"
            >
              {title}
            </motion.h2>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-white/60 text-sm md:text-base"
              >
                {description}
              </motion.p>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}

/**
 * Error state variant with error styling
 */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this section. Please try refreshing the page.",
  className,
}: Omit<EmptyStateProps, "icon">) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-primary"
        >
          <path
            d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      className={className}
    />
  );
}

/**
 * No data state variant
 */
export function NoDataState({
  title = "No data available",
  description = "There's nothing to show here yet.",
  className,
}: Omit<EmptyStateProps, "icon">) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon="📭"
      className={className}
    />
  );
}



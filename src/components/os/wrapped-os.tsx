"use client";

import { ReactNode } from "react";
import { GlassWindowFrame } from "./glass-window-frame";
import { Dock } from "./dock";
import { ChapterCapture } from "./chapter-capture";

export interface WrappedOSProps {
  children: ReactNode;
  currentChapter: number;
  totalChapters: number;
  onChapterChange: (index: number) => void;
  chapterName: string;
  userHandle: string;
}

/**
 * WrappedOS - Top-level OS container
 * Wraps all chapters in a premium glass window with dock navigation
 */
export function WrappedOS({
  children,
  currentChapter,
  totalChapters,
  onChapterChange,
  chapterName,
  userHandle,
}: WrappedOSProps) {
  return (
    <div className="fixed inset-0 bg-background overflow-hidden flex items-center justify-center">
      {/* Glass Window Frame */}
      <GlassWindowFrame>
        {/* Chapter Capture Button */}
        <ChapterCapture
          chapterName={chapterName}
          captureElementId="chapter-content"
          userHandle={userHandle}
        />

        {/* Chapter Content (swipeable) */}
        <div id="chapter-content" className="h-full w-full">
          {children}
        </div>
      </GlassWindowFrame>

      {/* Navigation Dock */}
      <Dock
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        onChapterChange={onChapterChange}
      />

      {/* Diagnostics Drawer - Placeholder for Phase 10 */}
      {/* Will be implemented later as a hidden easter egg */}
    </div>
  );
}


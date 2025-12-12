"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Download, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { generatePoster, downloadPoster } from "@/lib/utils/poster-generator";
import { copyToClipboard } from "@/lib/utils/clipboard";

export interface ChapterCaptureProps {
  chapterName: string;
  captureElementId: string;
  userHandle: string;
}

/**
 * ChapterCapture - Capture and share any chapter as an image
 * Small camera icon in top-right corner of frame
 */
export function ChapterCapture({
  chapterName,
  captureElementId,
  userHandle,
}: ChapterCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);
    try {
      const blobUrl = await generatePoster(captureElementId, "story", 2);
      if (blobUrl) {
        setCapturedImage(blobUrl);
        setShowShareMenu(true);
      }
    } catch (error) {
      console.error("Failed to capture chapter:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDownload = () => {
    if (capturedImage) {
      const filename = `xeet-wrapped-2024-${userHandle}-${chapterName
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;
      downloadPoster(capturedImage, filename);
      setShowShareMenu(false);
    }
  };

  const handleCopyLink = async () => {
    // In a real implementation, this would copy a share link
    // For now, we'll just copy a placeholder
    const shareUrl = `https://xeet.com/${userHandle}/wrapped/2024`;
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Capture Button */}
      <motion.button
        onClick={handleCapture}
        disabled={isCapturing}
        className={cn(
          "fixed top-6 right-6 z-50",
          "w-12 h-12 rounded-full",
          "backdrop-blur-lg bg-black/30 border border-white/10",
          "flex items-center justify-center",
          "transition-all duration-300",
          "hover:bg-white/15 hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-red-primary/50",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Capture chapter"
      >
        <Camera
          className={cn(
            "text-white/80 transition-transform",
            isCapturing && "animate-pulse"
          )}
          size={20}
        />
      </motion.button>

      {/* Share Menu Modal */}
      <AnimatePresence>
        {showShareMenu && capturedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowShareMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview */}
              <div className="mb-6">
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={capturedImage}
                    alt={`${chapterName} capture`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Share {chapterName}
              </h3>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-red-primary hover:bg-red-secondary transition-colors text-white font-medium"
                >
                  <Download size={20} />
                  Download Image
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-medium border border-white/10"
                >
                  {copied ? (
                    <>
                      <Check size={20} className="text-green-400" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={20} />
                      Copy Share Link
                    </>
                  )}
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowShareMenu(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Close"
              >
                <span className="text-white text-xl leading-none">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


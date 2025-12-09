"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { PosterPreview, RedButton } from "@/components/ui";
import { Silk } from "@/components/backgrounds";
import { generateAndDownloadPoster } from "@/lib/utils/poster-generator";
import { copyToClipboard, generateShareLink, generateCaption } from "@/lib/utils/clipboard";

type ActionState = "idle" | "loading" | "success" | "error";

export function FinalPosterSlide() {
  const { wrappedData } = useStory();
  const [storyState, setStoryState] = useState<ActionState>("idle");
  const [landscapeState, setLandscapeState] = useState<ActionState>("idle");
  const [linkState, setLinkState] = useState<ActionState>("idle");
  const [captionState, setCaptionState] = useState<ActionState>("idle");
  const [currentAspectRatio, setCurrentAspectRatio] = useState<"story" | "landscape">("story");

  const handleDownload = async (aspectRatio: "story" | "landscape") => {
    const setState = aspectRatio === "story" ? setStoryState : setLandscapeState;
    setState("loading");

    // Temporarily switch aspect ratio for rendering
    setCurrentAspectRatio(aspectRatio);
    
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 100));

    const success = await generateAndDownloadPoster(
      "poster-preview",
      aspectRatio,
      wrappedData.user.handle
    );

    setState(success ? "success" : "error");
    
    // Reset to story aspect ratio after download
    setCurrentAspectRatio("story");

    if (success) {
      // Trigger haptic feedback on mobile
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(50);
      }
      setTimeout(() => setState("idle"), 3000);
    } else {
      setTimeout(() => setState("idle"), 4000);
    }
  };

  const handleCopyLink = async () => {
    setLinkState("loading");
    const link = generateShareLink(wrappedData.user.handle);
    const success = await copyToClipboard(link);
    setLinkState(success ? "success" : "error");

    // Trigger haptic feedback on mobile
    if (success && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(30);
    }

    if (success) {
      setTimeout(() => setLinkState("idle"), 3000);
    } else {
      setTimeout(() => setLinkState("idle"), 4000);
    }
  };

  const handleCopyCaption = async () => {
    setCaptionState("loading");
    const caption = generateCaption(
      wrappedData.user.handle,
      wrappedData.era,
      {
        label: "Total Posts",
        value: wrappedData.stats.totalXeets.toLocaleString(),
      }
    );
    const success = await copyToClipboard(caption);
    setCaptionState(success ? "success" : "error");

    // Trigger haptic feedback on mobile
    if (success && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(30);
    }

    if (success) {
      setTimeout(() => setCaptionState("idle"), 3000);
    } else {
      setTimeout(() => setCaptionState("idle"), 4000);
    }
  };

  const getButtonText = (
    state: ActionState, 
    defaultText: string, 
    successText: string,
    errorText: string = "Failed - Try Again"
  ) => {
    switch (state) {
      case "loading":
        return "Processing...";
      case "success":
        return successText;
      case "error":
        return errorText;
      default:
        return defaultText;
    }
  };

  const getButtonVariant = (state: ActionState): "solid" | "outline" => {
    return state === "error" ? "outline" : "solid";
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Silk color="#FF0033" speed={2} scale={1} noiseIntensity={1.3} />

      <div 
        className="relative z-10 h-full flex items-center justify-center px-6 py-12 overflow-y-auto"
        role="region"
        aria-label="Share your story"
      >
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-3">
              <motion.p 
                className="mono-caption text-[var(--red-primary)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Your 2024 Wrapped
              </motion.p>
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                Share Your Story
              </motion.h1>
              <motion.p 
                className="text-lg text-white/60"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Download and share your year in review
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Poster Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center order-1 lg:order-1"
              >
                <div className="w-full max-w-sm lg:max-w-md animate-curtain-open">
                  <PosterPreview
                    wrappedData={wrappedData}
                    aspectRatio={currentAspectRatio}
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 lg:space-y-6 order-2 lg:order-2"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white headline-condensed">
                    Download Options
                  </h2>
                  
                  {/* Download Story Format */}
                  <div className="space-y-2">
                    <motion.div
                      animate={storyState === "success" ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <RedButton
                        onClick={() => handleDownload("story")}
                        disabled={storyState === "loading"}
                        className="w-full relative overflow-hidden"
                        variant={storyState === "error" ? "outline" : "solid"}
                      >
                        {getButtonText(storyState, "📱 Download Story (9:16)", "✓ Downloaded!", "❌ Download Failed")}
                        {storyState === "success" && (
                          <motion.div
                            className="absolute inset-0 bg-green-500/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.6 }}
                          />
                        )}
                      </RedButton>
                    </motion.div>
                    <p className="text-xs text-white/40 text-center">
                      1080×1920 • Perfect for Instagram/X stories
                    </p>
                  </div>

                  {/* Download Landscape Format */}
                  <div className="space-y-2">
                    <motion.div
                      animate={landscapeState === "success" ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <RedButton
                        onClick={() => handleDownload("landscape")}
                        disabled={landscapeState === "loading"}
                        className="w-full relative overflow-hidden"
                        variant={landscapeState === "error" ? "outline" : "solid"}
                      >
                        {getButtonText(landscapeState, "💻 Download Landscape (16:9)", "✓ Downloaded!", "❌ Download Failed")}
                        {landscapeState === "success" && (
                          <motion.div
                            className="absolute inset-0 bg-green-500/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.6 }}
                          />
                        )}
                      </RedButton>
                    </motion.div>
                    <p className="text-xs text-white/40 text-center">
                      1600×900 • Perfect for desktop wallpapers
                    </p>
                  </div>

                  {/* Helpful hint */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="pt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    <p className="text-xs text-white/60 text-center">
                      💡 <span className="text-white/80">Tip:</span> Best shared on X (Twitter) and Instagram
                    </p>
                  </motion.div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white headline-condensed">
                    Share Options
                  </h2>

                  {/* Copy Share Link */}
                  <motion.div
                    animate={linkState === "success" ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <RedButton
                      onClick={handleCopyLink}
                      disabled={linkState === "loading"}
                      className="w-full relative overflow-hidden"
                      variant="outline"
                    >
                      {getButtonText(linkState, "🔗 Copy Share Link", "✓ Copied to Clipboard!", "❌ Copy Failed")}
                      {linkState === "success" && (
                        <motion.div
                          className="absolute inset-0 bg-green-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </RedButton>
                  </motion.div>

                  {/* Copy Caption */}
                  <motion.div
                    animate={captionState === "success" ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <RedButton
                      onClick={handleCopyCaption}
                      disabled={captionState === "loading"}
                      className="w-full relative overflow-hidden"
                      variant="outline"
                    >
                      {getButtonText(captionState, "📝 Copy Caption", "✓ Copied to Clipboard!", "❌ Copy Failed")}
                      {captionState === "success" && (
                        <motion.div
                          className="absolute inset-0 bg-green-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </RedButton>
                  </motion.div>

                  {/* Share hint */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="pt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                  >
                    <p className="text-xs text-white/60 text-center">
                      🌐 <span className="text-white/80">Share link shows a beautiful demo</span>
                    </p>
                  </motion.div>
                </div>

                {/* Footer note */}
                <div className="pt-4 text-center">
                  <p className="text-sm text-white/50">
                    Made with ❤️ by the Xeet team
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { PosterPreview, RedButton } from "@/components/ui";
import { Silk } from "@/components/backgrounds";
import { generateAndDownloadPoster } from "@/lib/utils/poster-generator";
import { copyToClipboard, generateShareLink, generateCaption } from "@/lib/utils/clipboard";

type ActionState = "idle" | "loading" | "success";

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

    setState(success ? "success" : "idle");
    
    // Reset to story aspect ratio after download
    setCurrentAspectRatio("story");

    if (success) {
      setTimeout(() => setState("idle"), 2000);
    }
  };

  const handleCopyLink = async () => {
    setLinkState("loading");
    const link = generateShareLink(wrappedData.user.handle);
    const success = await copyToClipboard(link);
    setLinkState(success ? "success" : "idle");

    if (success) {
      setTimeout(() => setLinkState("idle"), 2000);
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
    setCaptionState(success ? "success" : "idle");

    if (success) {
      setTimeout(() => setCaptionState("idle"), 2000);
    }
  };

  const getButtonText = (state: ActionState, defaultText: string, successText: string) => {
    switch (state) {
      case "loading":
        return "Processing...";
      case "success":
        return successText;
      default:
        return defaultText;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Silk color="#FF0033" speed={2} scale={1} noiseIntensity={1.3} />

      <div className="relative z-10 h-full flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-3">
              <p className="mono-caption text-[var(--red-primary)]">
                Your 2024 Wrapped
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
                Share Your Story
              </h1>
              <p className="text-lg text-white/60">
                Download and share your year in review
              </p>
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
                    <RedButton
                      onClick={() => handleDownload("story")}
                      disabled={storyState === "loading"}
                      className="w-full"
                      variant="solid"
                    >
                      {getButtonText(storyState, "📱 Download Story (9:16)", "✓ Downloaded!")}
                    </RedButton>
                    <p className="text-xs text-white/40 text-center">
                      1080×1920 • Perfect for Instagram/X stories
                    </p>
                  </div>

                  {/* Download Landscape Format */}
                  <div className="space-y-2">
                    <RedButton
                      onClick={() => handleDownload("landscape")}
                      disabled={landscapeState === "loading"}
                      className="w-full"
                      variant="solid"
                    >
                      {getButtonText(landscapeState, "💻 Download Landscape (16:9)", "✓ Downloaded!")}
                    </RedButton>
                    <p className="text-xs text-white/40 text-center">
                      1600×900 • Perfect for desktop wallpapers
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white headline-condensed">
                    Share Options
                  </h2>

                  {/* Copy Share Link */}
                  <RedButton
                    onClick={handleCopyLink}
                    disabled={linkState === "loading"}
                    className="w-full"
                    variant="outline"
                  >
                    {getButtonText(linkState, "🔗 Copy Share Link", "✓ Copied to Clipboard!")}
                  </RedButton>

                  {/* Copy Caption */}
                  <RedButton
                    onClick={handleCopyCaption}
                    disabled={captionState === "loading"}
                    className="w-full"
                    variant="outline"
                  >
                    {getButtonText(captionState, "📝 Copy Caption", "✓ Copied to Clipboard!")}
                  </RedButton>
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

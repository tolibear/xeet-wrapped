"use client";

import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { PosterPreview, RedButton } from "@/components/ui";
import { Silk } from "@/components/backgrounds";

export function ShareFinalSlide() {
  const { wrappedData } = useStory();

  const handleCreateYourOwn = () => {
    // Navigate to home page to create their own wrapped
    window.location.href = "/";
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
                Shared Wrapped
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
                @{wrappedData.user.handle}'s 2024 Wrapped
              </h1>
              <p className="text-lg text-white/60">
                {wrappedData.era || "A year to remember"}
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
                    aspectRatio="story"
                  />
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 order-2 lg:order-2"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white headline-condensed">
                    Create Your Own Wrapped
                  </h2>
                  <p className="text-white/70 text-lg">
                    Discover your year on X with a beautiful, personalized story just like this one.
                  </p>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <p className="text-white font-semibold">Beautiful story slides</p>
                        <p className="text-white/60 text-sm">Premium backgrounds and animations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <p className="text-white font-semibold">Your year in stats</p>
                        <p className="text-white/60 text-sm">Posts, engagement, achievements, and more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎨</span>
                      <div>
                        <p className="text-white font-semibold">Shareable posters</p>
                        <p className="text-white/60 text-sm">Download and share across social media</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <RedButton
                      onClick={handleCreateYourOwn}
                      className="w-full"
                      variant="solid"
                    >
                      🚀 Create Your Wrapped
                    </RedButton>
                  </div>
                </div>

                {/* Footer note */}
                <div className="pt-4 text-center border-t border-white/10">
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

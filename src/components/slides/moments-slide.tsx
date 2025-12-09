"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useStory } from "@/components/story";
import { CategoryTabs, XeetCard } from "@/components/ui";
import { Plasma } from "@/components/backgrounds";
import { useMobile } from "@/lib/hooks/use-mobile";

export function MomentsSlide() {
  const { wrappedData } = useStory();
  const { topMoments } = wrappedData;
  const { isMobile } = useMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "liked", label: "Most Liked" },
    { id: "reposted", label: "Most Reposted" },
    { id: "replied", label: "Most Replied" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const getActiveXeets = () => {
    switch (activeTab) {
      case "liked":
        return topMoments.mostLiked;
      case "reposted":
        return topMoments.mostReposted;
      case "replied":
        return topMoments.mostReplied;
      default:
        return topMoments.mostLiked;
    }
  };

  const activeXeets = getActiveXeets();

  // Reset current index when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentIndex(0);
  };

  // Handle swipe on mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile) return;
    
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < activeXeets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
    exit: { 
      opacity: 0, 
      y: -20,
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Plasma color="#FF0033" speed={0.8} scale={1} opacity={0.9} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">Top Moments</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Posts that resonated the most
            </h1>
          </motion.div>
          
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <CategoryTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </motion.div>
          
          {/* Mobile: Horizontal carousel */}
          {isMobile ? (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${currentIndex}`}
                  ref={containerRef}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <XeetCard 
                    xeet={activeXeets[currentIndex]}
                    className={currentIndex === 0 ? "ring-1 ring-[var(--red-primary)]/30" : ""}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Pagination dots */}
              <div className="flex justify-center gap-2 mt-4">
                {activeXeets.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? "w-6 bg-[var(--red-primary)]" 
                        : "w-2 bg-white/30"
                    }`}
                    aria-label={`Go to post ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Counter */}
              <p className="text-center text-white/40 text-sm mt-3 mono-caption">
                {currentIndex + 1} / {activeXeets.length}
              </p>
            </div>
          ) : (
            /* Desktop: Vertical stack */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                {activeXeets.map((xeet, index) => (
                  <motion.div key={xeet.id} variants={cardVariants}>
                    <XeetCard 
                      xeet={xeet}
                      className={index === 0 ? "ring-1 ring-[var(--red-primary)]/30" : ""}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStory } from "@/components/story";
import { CategoryTabs, FriendTile } from "@/components/ui";
import { Silk } from "@/components/backgrounds";
import type { Friend } from "@/lib/types";

export function FriendsSlide() {
  const { wrappedData } = useStory();
  const { friends } = wrappedData;

  const tabs = [
    { id: "new", label: "New Mutuals" },
    { id: "inner", label: "Inner Circle" },
    { id: "mentioned", label: "Most Mentioned" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const getActiveFriends = (): Friend[] => {
    switch (activeTab) {
      case "new":
        return friends.newMutuals;
      case "inner":
        return friends.innerCircle;
      case "mentioned":
        return friends.mostMentioned;
      default:
        return friends.newMutuals;
    }
  };

  const activeFriends = getActiveFriends();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -20,
    },
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Silk color="#CC4400" speed={4} scale={1} noiseIntensity={1.5} />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-6xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="mono-caption text-[var(--red-primary)]">Friends You Made</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-condensed text-white">
              Connections that mattered
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
              onTabChange={setActiveTab}
            />
          </motion.div>
          
          {/* Friend tiles grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
            >
              {activeFriends.slice(0, 6).map((friend, index) => (
                <motion.div key={friend.handle} variants={tileVariants} className="md:block">
                  <FriendTile 
                    friend={friend}
                    className={index === 0 ? "ring-1 ring-[var(--red-primary)]/30" : ""}
                  />
                </motion.div>
              ))}
              {/* Show more on desktop */}
              {activeFriends.slice(6, 10).map((friend, index) => (
                <motion.div key={friend.handle} variants={tileVariants} className="hidden md:block">
                  <FriendTile friend={friend} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Footer insight */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center text-white/50 text-sm"
          >
            {activeTab === "new" && `${friends.newMutuals.length} new connections this year`}
            {activeTab === "inner" && `${friends.innerCircle.length} people in your inner circle`}
            {activeTab === "mentioned" && `${friends.mostMentioned.length} people you mentioned most`}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

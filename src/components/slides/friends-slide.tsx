"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStory } from "@/components/story";
import { CategoryTabs } from "@/components/ui";
import ChromaGrid, { type ChromaItem } from "@/components/react-bits/chroma-grid";
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

  // Convert Friend data to ChromaItem format
  const chromaItems: ChromaItem[] = activeFriends.map((friend, index) => ({
    image: friend.avatar,
    title: friend.displayName || friend.handle,
    subtitle: friend.relationship,
    handle: `@${friend.handle}`,
    borderColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][index % 6],
    gradient: [
      'linear-gradient(145deg,#4F46E5,#000)',
      'linear-gradient(210deg,#10B981,#000)',
      'linear-gradient(165deg,#F59E0B,#000)',
      'linear-gradient(195deg,#EF4444,#000)',
      'linear-gradient(225deg,#8B5CF6,#000)',
      'linear-gradient(135deg,#06B6D4,#000)'
    ][index % 6],
    url: `https://twitter.com/${friend.handle}`
  }));

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-0 right-0 z-50 text-center space-y-3 px-6"
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
        className="absolute top-32 left-0 right-0 z-50 flex justify-center px-6"
      >
        <CategoryTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </motion.div>
      
      {/* ChromaGrid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pt-48 pb-20"
      >
        <ChromaGrid 
          items={chromaItems}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </motion.div>
      
      {/* Footer insight */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-0 right-0 z-50 text-center text-white/50 text-sm px-6"
      >
        {activeTab === "new" && `${friends.newMutuals.length} new connections this year`}
        {activeTab === "inner" && `${friends.innerCircle.length} people in your inner circle`}
        {activeTab === "mentioned" && `${friends.mostMentioned.length} people you mentioned most`}
      </motion.p>
    </div>
  );
}

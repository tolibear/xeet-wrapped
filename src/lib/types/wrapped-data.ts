// Core data types for Xeet Wrapped experience

export interface User {
  handle: string;
  avatar: string;
  bio: string;
  displayName?: string;
}

export type Tone = "humor" | "serious" | "helpful" | "chaotic";

export interface Identity {
  oneSentence: string;
  personaChips: string[];
  tone: Tone;
}

export interface Stats {
  totalXeets: number;
  replies: number;
  threads: number;
  mediaPosts: number;
  daysActive: number;
  longestStreak: number;
}

export interface DataPoint {
  date: Date;
  value: number;
  label?: string;
}

export interface Timeline {
  activity: DataPoint[];
  engagement: DataPoint[];
  growth: DataPoint[];
  peakDay: Date;
}

export interface Xeet {
  id: string;
  content: string;
  timestamp: Date;
  likes: number;
  reposts: number;
  replies: number;
  mediaUrl?: string;
}

export interface TopicCluster {
  name: string;
  count: number;
  exampleXeets: Xeet[];
  color?: string;
}

export interface Topics {
  clusters: TopicCluster[];
  signaturePhrase: string;
  signatureEmoji: string;
}

export interface Project {
  name: string;
  description: string;
  firstMention: Date;
  lastMention: Date;
  totalMentions: number;
  logo?: string;
  url?: string;
}

export interface Friend {
  handle: string;
  avatar: string;
  displayName?: string;
  relationship: string;
  interactions: number;
}

export interface Friends {
  newMutuals: Friend[];
  innerCircle: Friend[];
  mostMentioned: Friend[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity?: "common" | "rare" | "legendary";
}

export interface XeetWrappedData {
  user: User;
  identity: Identity;
  stats: Stats;
  timeline: Timeline;
  topMoments: {
    mostLiked: Xeet[];
    mostReposted: Xeet[];
    mostReplied: Xeet[];
  };
  topics: Topics;
  projects: Project[];
  friends: Friends;
  achievements: Achievement[];
  era?: string; // e.g., "The Builder Era", "Chaos Agent"
}

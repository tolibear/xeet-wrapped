// Pre-built persona profiles for consistent demo experiences

import type { XeetWrappedData } from "../types";

export const PERSONA_BUILDER: XeetWrappedData = {
  user: {
    handle: "builder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=builder",
    bio: "Building in public • Indie hacker • Always shipping",
    displayName: "The Builder",
  },
  identity: {
    oneSentence: "A relentless builder shipping code and sharing the journey",
    personaChips: ["Indie Hacker", "Open Source", "Maker", "Tech Lead", "Early Adopter"],
    tone: "serious",
  },
  stats: {
    totalXeets: 3847,
    replies: 1923,
    threads: 127,
    mediaPosts: 456,
    daysActive: 342,
    longestStreak: 67,
  },
  timeline: {
    activity: [
      { date: new Date(2024, 0, 1), value: 150, label: "Jan" },
      { date: new Date(2024, 1, 1), value: 180, label: "Feb" },
      { date: new Date(2024, 2, 1), value: 210, label: "Mar" },
      { date: new Date(2024, 3, 1), value: 280, label: "Apr" },
      { date: new Date(2024, 4, 1), value: 350, label: "May" },
      { date: new Date(2024, 5, 1), value: 320, label: "Jun" },
      { date: new Date(2024, 6, 1), value: 300, label: "Jul" },
      { date: new Date(2024, 7, 1), value: 290, label: "Aug" },
      { date: new Date(2024, 8, 1), value: 340, label: "Sep" },
      { date: new Date(2024, 9, 1), value: 380, label: "Oct" },
      { date: new Date(2024, 10, 1), value: 420, label: "Nov" },
      { date: new Date(2024, 11, 1), value: 400, label: "Dec" },
    ],
    engagement: [
      { date: new Date(2024, 0, 1), value: 500, label: "Jan" },
      { date: new Date(2024, 1, 1), value: 650, label: "Feb" },
      { date: new Date(2024, 2, 1), value: 800, label: "Mar" },
      { date: new Date(2024, 3, 1), value: 1200, label: "Apr" },
      { date: new Date(2024, 4, 1), value: 1500, label: "May" },
      { date: new Date(2024, 5, 1), value: 1400, label: "Jun" },
      { date: new Date(2024, 6, 1), value: 1300, label: "Jul" },
      { date: new Date(2024, 7, 1), value: 1250, label: "Aug" },
      { date: new Date(2024, 8, 1), value: 1450, label: "Sep" },
      { date: new Date(2024, 9, 1), value: 1600, label: "Oct" },
      { date: new Date(2024, 10, 1), value: 1800, label: "Nov" },
      { date: new Date(2024, 11, 1), value: 1700, label: "Dec" },
    ],
    growth: [
      { date: new Date(2024, 0, 1), value: 50, label: "Jan" },
      { date: new Date(2024, 1, 1), value: 80, label: "Feb" },
      { date: new Date(2024, 2, 1), value: 120, label: "Mar" },
      { date: new Date(2024, 3, 1), value: 200, label: "Apr" },
      { date: new Date(2024, 4, 1), value: 350, label: "May" },
      { date: new Date(2024, 5, 1), value: 280, label: "Jun" },
      { date: new Date(2024, 6, 1), value: 150, label: "Jul" },
      { date: new Date(2024, 7, 1), value: 180, label: "Aug" },
      { date: new Date(2024, 8, 1), value: 250, label: "Sep" },
      { date: new Date(2024, 9, 1), value: 320, label: "Oct" },
      { date: new Date(2024, 10, 1), value: 400, label: "Nov" },
      { date: new Date(2024, 11, 1), value: 380, label: "Dec" },
    ],
    peakDay: new Date(2024, 10, 15),
  },
  topMoments: {
    mostLiked: [
      {
        id: "1",
        content: "Just launched my SaaS! 6 months of nights and weekends. \n\nHere's what I learned about building solo: 🧵",
        timestamp: new Date(2024, 4, 15),
        likes: 4234,
        reposts: 823,
        replies: 267,
      },
      {
        id: "2",
        content: "My indie project just hit $10k MRR. Started with $0 marketing budget.\n\nHere's the entire playbook:",
        timestamp: new Date(2024, 8, 3),
        likes: 3891,
        reposts: 756,
        replies: 234,
      },
      {
        id: "3",
        content: "Shipped 12 products this year. 11 failed. But that 1 success changed everything.",
        timestamp: new Date(2024, 11, 1),
        likes: 2947,
        reposts: 512,
        replies: 198,
      },
    ],
    mostReposted: [
      {
        id: "4",
        content: "Build in public is not about showing your code.\n\nIt's about sharing the journey, the struggles, the small wins.\n\nPeople connect with the story.",
        timestamp: new Date(2024, 6, 20),
        likes: 1823,
        reposts: 1247,
        replies: 145,
      },
      {
        id: "5",
        content: "Your side project doesn't need:\n- Perfect code\n- VC funding\n- A huge audience\n\nIt needs:\n- To solve a problem\n- To ship\n- To exist",
        timestamp: new Date(2024, 3, 10),
        likes: 2145,
        reposts: 987,
        replies: 176,
      },
      {
        id: "6",
        content: "The best time to start was yesterday.\nThe second best time is now.\n\nStop planning, start building. 🚀",
        timestamp: new Date(2024, 1, 5),
        likes: 1567,
        reposts: 834,
        replies: 123,
      },
    ],
    mostReplied: [
      {
        id: "7",
        content: "What's the #1 thing you wish you knew before starting your side project?\n\nI'll go first:",
        timestamp: new Date(2024, 7, 12),
        likes: 892,
        reposts: 234,
        replies: 567,
      },
      {
        id: "8",
        content: "Drop your current side project below 👇\n\nI'll RT and help you get some eyes on it.",
        timestamp: new Date(2024, 9, 8),
        likes: 1234,
        reposts: 345,
        replies: 489,
      },
      {
        id: "9",
        content: "Building a landing page this weekend.\n\nWhat's your favorite tool? And why?",
        timestamp: new Date(2024, 2, 22),
        likes: 678,
        reposts: 145,
        replies: 423,
      },
    ],
  },
  topics: {
    clusters: [
      {
        name: "Indie Hacking",
        count: 487,
        exampleXeets: [],
        color: "hsl(280, 70%, 60%)",
      },
      {
        name: "Web Development",
        count: 356,
        exampleXeets: [],
        color: "hsl(200, 70%, 60%)",
      },
      {
        name: "Building in Public",
        count: 289,
        exampleXeets: [],
        color: "hsl(340, 70%, 60%)",
      },
      {
        name: "Product Launch",
        count: 234,
        exampleXeets: [],
        color: "hsl(120, 70%, 60%)",
      },
      {
        name: "Startup Life",
        count: 178,
        exampleXeets: [],
        color: "hsl(60, 70%, 60%)",
      },
    ],
    signaturePhrase: "let's ship it",
    signatureEmoji: "🚀",
  },
  projects: [
    {
      name: "Next.js",
      description: "The React Framework",
      firstMention: new Date(2024, 0, 15),
      lastMention: new Date(2024, 11, 20),
      totalMentions: 89,
    },
    {
      name: "Vercel",
      description: "Deploy instantly",
      firstMention: new Date(2024, 1, 3),
      lastMention: new Date(2024, 11, 18),
      totalMentions: 67,
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS",
      firstMention: new Date(2024, 2, 10),
      lastMention: new Date(2024, 11, 15),
      totalMentions: 54,
    },
  ],
  friends: {
    newMutuals: [
      {
        handle: "devfriend1",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devfriend1",
        displayName: "Sarah",
        relationship: "Fellow builder",
        interactions: 234,
      },
      {
        handle: "maker2",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maker2",
        displayName: "Alex",
        relationship: "Launch buddy",
        interactions: 189,
      },
    ],
    innerCircle: [
      {
        handle: "bestcoder",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bestcoder",
        displayName: "Jordan",
        relationship: "Code review buddy",
        interactions: 567,
      },
      {
        handle: "designpro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=designpro",
        displayName: "Taylor",
        relationship: "Design feedback",
        interactions: 423,
      },
    ],
    mostMentioned: [
      {
        handle: "techguru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru",
        displayName: "Morgan",
        relationship: "Inspiration",
        interactions: 156,
      },
    ],
  },
  achievements: [
    {
      id: "streak-legend",
      title: "Streak Legend",
      description: "Posted 67 days in a row",
      icon: "⚡",
      unlocked: true,
      rarity: "legendary",
    },
    {
      id: "viral-moment",
      title: "Viral Moment",
      description: "Got over 4k likes on a post",
      icon: "🔥",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: "thread-master",
      title: "Thread Master",
      description: "Created 127 threads",
      icon: "🧵",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Shipped before dawn",
      icon: "🌅",
      unlocked: true,
      rarity: "common",
    },
  ],
  era: "The Builder Era",
};

// Add more personas as needed
export const PERSONAS = {
  builder: PERSONA_BUILDER,
};

export function getPersona(handle: string): XeetWrappedData | null {
  return PERSONAS[handle as keyof typeof PERSONAS] || null;
}

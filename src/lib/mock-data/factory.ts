// Mock data factory for Xeet Wrapped

import type {
  User,
  Identity,
  Stats,
  Timeline,
  DataPoint,
  Xeet,
  Topics,
  TopicCluster,
  Project,
  Friends,
  Friend,
  Achievement,
  XeetWrappedData,
} from "../types";

// Utility: Generate random number in range
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Utility: Random item from array
const randomItem = <T>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

// Utility: Random sample from array
const randomSample = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
};

// Generate user profile
export function generateUser(handle?: string): User {
  const handles = ["builder", "connector", "thinker", "memester", "testuser"];
  const selectedHandle = handle || randomItem(handles);
  
  return {
    handle: selectedHandle,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedHandle}`,
    bio: "Your 2024 on X, wrapped.",
    displayName: selectedHandle.charAt(0).toUpperCase() + selectedHandle.slice(1),
  };
}

// Generate identity/persona
export function generateIdentity(tone?: "humor" | "serious" | "helpful" | "chaotic"): Identity {
  const sentences = [
    "A builder shipping in public, one tweet at a time",
    "The friend who replies to everyone's posts",
    "Writing threads that make people think",
    "Here for the memes and the chaos",
    "Sharing knowledge, building community",
  ];
  
  const chipSets = [
    ["Builder", "Tech Enthusiast", "Maker", "Open Source", "Early Adopter"],
    ["Community Builder", "Connector", "Friend to All", "Reply King", "Supportive"],
    ["Thought Leader", "Writer", "Analyst", "Deep Thinker", "Thread Master"],
    ["Shitposter", "Meme Lord", "Chaos Agent", "Vibes Only", "Unhinged"],
    ["Teacher", "Helpful", "Problem Solver", "Patient", "Knowledge Sharer"],
  ];
  
  const selectedTone = tone || randomItem(["humor", "serious", "helpful", "chaotic"] as const);
  const chipIndex = ["humor", "serious", "helpful", "chaotic"].indexOf(selectedTone);
  
  return {
    oneSentence: sentences[chipIndex] || sentences[0],
    personaChips: randomSample(chipSets[chipIndex] || chipSets[0], randomInt(3, 5)),
    tone: selectedTone,
  };
}

// Generate stats
export function generateStats(): Stats {
  return {
    totalXeets: randomInt(500, 5000),
    replies: randomInt(300, 3000),
    threads: randomInt(20, 200),
    mediaPosts: randomInt(100, 1000),
    daysActive: randomInt(200, 365),
    longestStreak: randomInt(7, 90),
  };
}

// Generate timeline data
export function generateTimeline(): Timeline {
  const now = new Date();
  const months = 12;
  const activity: DataPoint[] = [];
  const engagement: DataPoint[] = [];
  const growth: DataPoint[] = [];
  
  for (let i = 0; i < months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    
    activity.push({
      date,
      value: randomInt(30, 200),
      label: date.toLocaleString("default", { month: "short" }),
    });
    
    engagement.push({
      date,
      value: randomInt(100, 2000),
      label: date.toLocaleString("default", { month: "short" }),
    });
    
    growth.push({
      date,
      value: randomInt(-50, 500),
      label: date.toLocaleString("default", { month: "short" }),
    });
  }
  
  // Find peak day
  const peakIndex = activity.reduce(
    (maxIdx, point, idx, arr) =>
      point.value > arr[maxIdx].value ? idx : maxIdx,
    0
  );
  
  return {
    activity,
    engagement,
    growth,
    peakDay: activity[peakIndex].date,
  };
}

// Generate xeets
export function generateXeets(count: number = 3): Xeet[] {
  const sampleContent = [
    "Just shipped a new feature! 🚀 The community feedback has been incredible.",
    "Hot take: building in public is the best way to grow an audience in 2024.",
    "Coffee → Code → Ship → Repeat ☕️",
    "This is why we can't have nice things 😂",
    "Long thread incoming 🧵\n\n1/ Let me tell you about...",
    "GM everyone! What are you building today?",
    "Just hit 10k followers! Thank you all for being here 🙏",
    "Reminder: your side project doesn't need to be perfect to launch",
    "Why is debugging always at 2am? Every. Single. Time.",
    "The best advice I got this year: ship fast, iterate faster.",
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `xeet-${i}-${Date.now()}`,
    content: randomItem(sampleContent),
    timestamp: new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000),
    likes: randomInt(10, 5000),
    reposts: randomInt(5, 1000),
    replies: randomInt(2, 500),
  }));
}

// Generate topics
export function generateTopics(): Topics {
  const topicNames = [
    "Web Development",
    "AI & Machine Learning",
    "Startup Life",
    "Design",
    "Product Management",
    "Career Advice",
    "Memes & Humor",
    "Book Recommendations",
  ];
  
  const clusters: TopicCluster[] = randomSample(topicNames, randomInt(4, 6)).map(
    (name) => ({
      name,
      count: randomInt(10, 150),
      exampleXeets: generateXeets(2),
      color: `hsl(${randomInt(0, 360)}, 70%, 60%)`,
    })
  );
  
  const phrases = [
    "let's ship it",
    "hot take",
    "build in public",
    "just vibing",
    "this slaps",
    "no cap",
  ];
  
  const emojis = ["🚀", "🔥", "💯", "🎯", "✨", "🧵", "☕️"];
  
  return {
    clusters,
    signaturePhrase: randomItem(phrases),
    signatureEmoji: randomItem(emojis),
  };
}

// Generate projects
export function generateProjects(count: number = 3): Project[] {
  const projectNames = [
    { name: "Next.js", desc: "The React Framework for Production" },
    { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
    { name: "Vercel", desc: "Deploy with zero configuration" },
    { name: "Supabase", desc: "Open source Firebase alternative" },
    { name: "Prisma", desc: "Next-generation ORM for Node.js" },
    { name: "TypeScript", desc: "JavaScript with syntax for types" },
    { name: "React", desc: "A JavaScript library for building UIs" },
  ];
  
  return randomSample(projectNames, count).map((proj) => ({
    name: proj.name,
    description: proj.desc,
    firstMention: new Date(Date.now() - randomInt(60, 365) * 24 * 60 * 60 * 1000),
    lastMention: new Date(Date.now() - randomInt(0, 30) * 24 * 60 * 60 * 1000),
    totalMentions: randomInt(5, 50),
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${proj.name}`,
  }));
}

// Generate friends
export function generateFriends(): Friends {
  const generateFriendList = (count: number, prefix: string): Friend[] => {
    return Array.from({ length: count }, (_, i) => ({
      handle: `${prefix}${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${prefix}${i}`,
      displayName: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} ${i + 1}`,
      relationship: randomItem([
        "New mutual",
        "Reply friend",
        "Thread buddy",
        "Community member",
      ]),
      interactions: randomInt(10, 500),
    }));
  };
  
  return {
    newMutuals: generateFriendList(randomInt(4, 8), "newpal"),
    innerCircle: generateFriendList(randomInt(3, 6), "bestie"),
    mostMentioned: generateFriendList(randomInt(4, 7), "friend"),
  };
}

// Generate achievements
export function generateAchievements(): Achievement[] {
  const allAchievements = [
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Posted before 6am at least 10 times",
      icon: "🌅",
      rarity: "common" as const,
    },
    {
      id: "night-owl",
      title: "Night Owl",
      description: "Posted after midnight 50+ times",
      icon: "🦉",
      rarity: "common" as const,
    },
    {
      id: "viral-moment",
      title: "Viral Moment",
      description: "A post got over 1000 likes",
      icon: "🔥",
      rarity: "rare" as const,
    },
    {
      id: "thread-master",
      title: "Thread Master",
      description: "Created 20+ threads this year",
      icon: "🧵",
      rarity: "rare" as const,
    },
    {
      id: "community-builder",
      title: "Community Builder",
      description: "Made 50+ new mutuals",
      icon: "🤝",
      rarity: "legendary" as const,
    },
    {
      id: "reply-king",
      title: "Reply King",
      description: "Sent over 1000 replies",
      icon: "💬",
      rarity: "rare" as const,
    },
    {
      id: "streak-legend",
      title: "Streak Legend",
      description: "Posted every day for 30+ days",
      icon: "⚡",
      rarity: "legendary" as const,
    },
    {
      id: "meme-lord",
      title: "Meme Lord",
      description: "Shared 100+ images/videos",
      icon: "😂",
      rarity: "common" as const,
    },
  ];
  
  return allAchievements.map((achievement) => ({
    ...achievement,
    unlocked: Math.random() > 0.3, // 70% unlock rate
  }));
}

// Main factory: Generate complete wrapped data
export function generateWrappedData(handle?: string): XeetWrappedData {
  const user = generateUser(handle);
  const identity = generateIdentity();
  
  const eras = [
    "The Builder Era",
    "The Connector Era",
    "The Thought Leader Era",
    "The Chaos Era",
    "The Learning Era",
  ];
  
  return {
    user,
    identity,
    stats: generateStats(),
    timeline: generateTimeline(),
    topMoments: {
      mostLiked: generateXeets(3),
      mostReposted: generateXeets(3),
      mostReplied: generateXeets(3),
    },
    topics: generateTopics(),
    projects: generateProjects(randomInt(3, 5)),
    friends: generateFriends(),
    achievements: generateAchievements(),
    era: randomItem(eras),
  };
}

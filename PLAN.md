# Xeet Wrapped - Implementation Plan

## Overview
A Spotify Wrapped-style experience for X (Twitter) - a 10-12 slide story with black+red glassmorphic visuals, using mock data for frontend-only development.

---

## Phase 1: Foundation (Day 1)
**Goal:** Project setup + design system + core glass UI

### 1.1 Project Setup
- [ ] Initialize Next.js 14+ with App Router
- [ ] Install dependencies: Tailwind CSS, Framer Motion, clsx, tailwind-merge
- [ ] Configure dark theme as default
- [ ] Set up folder structure:
  ```
  /app
    /(story)/[handle]/page.tsx    # Personal wrapped
    /share/[slug]/page.tsx        # Public share
  /components
    /ui                           # Core UI components
    /slides                       # Individual slide components
    /backgrounds                  # Animated backgrounds
  /lib
    /mock-data                    # Mock data generators
    /utils                        # Utilities
  /styles
    globals.css                   # Global styles + CSS variables
  ```

### 1.2 Design Tokens & CSS Variables
- [ ] Color palette: deep blacks, red accents (#FF0033, #CC0000)
- [ ] Glass elevations (3 levels)
- [ ] Typography scale: bold condensed headlines + mono captions
- [ ] Noise texture overlay
- [ ] Glow/border effects

### 1.3 Core Components
- [ ] `<GlassPanel />` - 3 elevation variants (thin, medium, thick blur)
- [ ] `<StatCard />` - Stat display with label + value
- [ ] `<PersonaChip />` - Topic/tag pills
- [ ] `<AvatarFrame />` - User avatar with glow treatment
- [ ] `<RedButton />` - Primary CTA with glow

---

## Phase 2: Story Infrastructure (Day 2)
**Goal:** Navigation, slide system, progress tracking

### 2.1 Story Engine
- [ ] `<StoryContainer />` - Full-screen slide manager
- [ ] `<ProgressRail />` - Visible progress dots/bar at top
- [ ] Gesture handling: swipe, scroll, hold-to-pause
- [ ] Keyboard navigation (arrow keys, space)
- [ ] Auto-advance timer (optional)

### 2.2 Slide Transition System
- [ ] Fade/slide transitions between slides
- [ ] Enter/exit animations per slide
- [ ] "Reduce motion" preference support
- [ ] Loading state for heavy backgrounds

### 2.3 Mock Data Structure
- [ ] Define TypeScript types for all data shapes
- [ ] Create mock data factory functions
- [ ] Sample user profiles (3-4 personas)

---

## Phase 3: First 4 Slides (Day 3-4)
**Goal:** Core narrative flow with basic backgrounds

### Slide 0 - Boot Sequence
- [ ] "Compiling your year..." animation
- [ ] User handle reveal with blur effect
- [ ] Simple gradient background (Silk placeholder)
- [ ] Progress: scanning animation

### Slide 1 - "You, in one sentence"
- [ ] Large headline text
- [ ] Persona chips (3-5 tags)
- [ ] Spotlight/pillar background (CSS)
- [ ] Gradual reveal animation

### Slide 2 - "Your Year at a Glance"
- [ ] Stats grid (6 key metrics)
- [ ] Bounce-in animation (CSS fallback first)
- [ ] Flowing gradient background
- [ ] Copy: "You shipped X thoughts..."

### Slide 3 - "Timeline Arc"
- [ ] Line chart visualization (simple SVG or canvas)
- [ ] Category toggle (Activity/Engagement/Growth)
- [ ] Spike annotations
- [ ] Beam-style background

---

## Phase 4: Middle Slides (Day 5-6)
**Goal:** Content-rich slides with interactions

### Slide 4 - "Top Moments"
- [ ] Post card component (xeet preview)
- [ ] Category cycling (Most Liked/Reposted/Replied)
- [ ] Reveal animation for punchlines
- [ ] Organic flowing background

### Slide 5 - "What you talked about"
- [ ] Topic constellation/cloud
- [ ] Tappable chips with example xeet popover
- [ ] "Signature phrase" highlight
- [ ] Blinds-reveal background (CSS)

### Slide 6 - "Projects you boosted"
- [ ] Project badge cards
- [ ] Mini timeline per project
- [ ] Journey arc (first → last mention)
- [ ] Momentum background

### Slide 7 - "Friends you made"
- [ ] Yearbook-style friend tiles
- [ ] Category tabs (New/Inner Circle/Most Mentioned)
- [ ] Playful labels
- [ ] Warm background treatment

---

## Phase 5: Final Slides + Terminal (Day 7)
**Goal:** Memorable endings

### Slide 8 - "Terminal Log"
- [ ] CRT/OS aesthetic (scanlines, green/red text)
- [ ] Fake system logs
- [ ] Witty warnings/stamps
- [ ] "Era" designation
- [ ] Glitch effects (CSS)

### Slide 9 - "Achievements"
- [ ] Trophy shelf layout
- [ ] Badge icons + titles
- [ ] Mystery badge reveal
- [ ] Unlock animations

### Slide 10 - "Final Poster"
- [ ] Composed layout (avatar, stats, chips, friends)
- [ ] Download button (1080×1920 story, 1600×900 landscape)
- [ ] Share link generation
- [ ] Copy caption button
- [ ] Curtain-open reveal

---

## Phase 6: React Bits Integration (Day 8-9)
**Goal:** Premium desktop backgrounds

### 6.1 Install React Bits Components
- [ ] Research installation method (likely shadcn-style)
- [ ] Install: Silk, Beams, Plasma, Color Bends
- [ ] Install: Gradual Blur, Bounce Cards, Card Swap
- [ ] Install: Gradient Blinds, Faulty Terminal

### 6.2 Background Mapping
| Slide | Background Component |
|-------|---------------------|
| 0 | Silk |
| 1 | Light Pillar (CSS) |
| 2 | Color Bends |
| 3 | Beams |
| 4 | Plasma |
| 5 | Gradient Blinds |
| 6 | Beams / Color Bends |
| 7 | Silk |
| 8 | Faulty Terminal |
| 9-10 | Silk / Plasma |

### 6.3 Component Integration
- [ ] Bounce Cards for stats/badges
- [ ] Card Swap for category switching
- [ ] Gradual Blur for reveals
- [ ] Ensure one background mounted at a time

---

## Phase 7: Mobile Optimization (Day 10)
**Goal:** Lite but premium mobile experience

### 7.1 Responsive Layouts
- [ ] Single-column layouts for all slides
- [ ] Larger touch targets
- [ ] Simplified stat grids
- [ ] Stacked card views vs grids

### 7.2 Background Fallbacks
- [ ] Static silk-like gradients
- [ ] CSS-only noise/glow effects
- [ ] Pre-rendered video loops (optional)
- [ ] Detect mobile and swap backgrounds

### 7.3 Interaction Fallbacks
- [ ] Replace Card Swap with tabs + crossfade
- [ ] Replace Bounce Cards with stagger-in
- [ ] Touch carousel for top moments
- [ ] "Full Experience on Desktop" hint

---

## Phase 8: Share & Export (Day 11)
**Goal:** Shareable outputs

### 8.1 Poster Generation
- [ ] html2canvas or similar for screenshot
- [ ] Two aspect ratios: story (9:16) + landscape (16:9)
- [ ] One-tap download
- [ ] Loading state during generation

### 8.2 Share System
- [ ] Generate unique share slug
- [ ] OG image generation (static or dynamic)
- [ ] Meta tags for rich previews
- [ ] Copy link functionality

### 8.3 Privacy Controls
- [ ] Toggle to hide sensitive slides
- [ ] Preview before sharing
- [ ] "Public profile only" mode

---

## Phase 9: Polish & Performance (Day 12)
**Goal:** Production-ready experience

### 9.1 Performance
- [ ] Lazy load heavy backgrounds
- [ ] Scene-based rendering (one bg at a time)
- [ ] Image optimization
- [ ] Bundle size audit

### 9.2 Accessibility
- [ ] Reduce motion support (OS preference)
- [ ] Manual toggle in UI
- [ ] Keyboard navigation
- [ ] Screen reader considerations

### 9.3 Final Polish
- [ ] Loading states
- [ ] Error boundaries
- [ ] Edge cases (no data, etc.)
- [ ] Cross-browser testing

---

## Vibe System (Future Enhancement)
Four visual themes affecting backgrounds + copy tone:

| Vibe | Mood | Primary Backgrounds |
|------|------|---------------------|
| **Cinematic** | Epic, dramatic | Silk, Beams, Plasma |
| **Hacker** | Tech, edgy | Faulty Terminal, Beams |
| **Neon** | Vibrant, party | Color Bends, Plasma |
| **Silk** | Elegant, premium | Silk, Gradient Blinds |

---

## Tech Stack Summary

```
Framework:     Next.js 14+ (App Router)
Styling:       Tailwind CSS + CSS Variables
Animation:     Framer Motion
Components:    React Bits (shadcnregistry)
Charts:        Lightweight SVG or Recharts
Export:        html2canvas / dom-to-image
State:         React hooks (no external state needed)
```

---

## Mock Data Summary

```typescript
interface XeetWrappedData {
  user: {
    handle: string
    avatar: string
    bio: string
  }
  identity: {
    oneSentence: string
    personaChips: string[]
    tone: 'humor' | 'serious' | 'helpful' | 'chaotic'
  }
  stats: {
    totalXeets: number
    replies: number
    threads: number
    mediaPosts: number
    daysActive: number
    longestStreak: number
  }
  timeline: {
    activity: DataPoint[]
    engagement: DataPoint[]
    growth: DataPoint[]
    peakDay: Date
  }
  topMoments: {
    mostLiked: Xeet[]
    mostReposted: Xeet[]
    mostReplied: Xeet[]
  }
  topics: {
    clusters: TopicCluster[]
    signaturePhrase: string
    signatureEmoji: string
  }
  projects: Project[]
  friends: {
    newMutuals: User[]
    innerCircle: User[]
    mostMentioned: User[]
  }
  achievements: Achievement[]
}
```

---

## Let's Start! 🚀

Ready to begin with **Phase 1: Foundation**?


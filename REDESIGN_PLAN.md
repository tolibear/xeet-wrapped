# Xeet Wrapped Redesign - 3 Phase Implementation Plan

## Overview
Major redesign of the Xeet Wrapped experience with authentication, new components, and enhanced interactivity.

---

## Phase 1: Core Authentication & Global UI Foundation

### 1.1 Authentication Landing Page
**Goal:** Replace initial slide with Twitter sign-in requirement

**Tasks:**
- Create new auth landing page component using shadcn
- Design layout:
  - Title: "Xeet wrapped"
  - Subtitle: "Connect your Twitter account to begin unlocking your 2025 Xeet wrapped"
  - Additional text: "unwrap your gift at the end"
  - Display requirement: "minimum 250 followers"
- Implement mock Twitter sign-in button (no actual OAuth)
- Add validation/loading states
- Style to match design system (glass panels, red accents)
- Route logic: After "sign-in" → Terminal Slide

**Files to modify:**
- `src/app/page.tsx` or create new `src/components/auth-landing.tsx`
- `src/components/ui/` (shadcn button, card components)

### 1.2 Terminal Slide Enhancements
**Goal:** Slower animation with pauses, new badge text, background effects

**Tasks:**
- Slow down terminal animation sequence
- Add strategic pauses (simulate "thinking")
- Change badge from "Approved year complete" to "Begin Xeet wrapped"
- Integrate Letter Glitch background effect from React Bits
  - Faint opacity
  - Red theme colors
  - Technical jargon/terminology from user profile
- Update transition logic to first content slide

**Files to modify:**
- `src/components/slides/terminal-slide.tsx`
- `src/components/backgrounds/` (add new letter-glitch component)

### 1.3 Global UI Components
**Goal:** Add consistent elements across all slides

**Tasks:**
- **User Identity Bubble:**
  - Profile picture
  - Handle (@username)
  - Display name
  - Position: Top-left or top-right (consistent)
  - Style: glass panel, subtle animation

- **Xeet Logo:**
  - Use provided SVG files (`public/Logos/logo.svg` or `symbol.svg`)
  - Position: Opposite corner from user bubble
  - Adjustable size/color as needed

- **Share to Twitter Button:**
  - Add to all main content slides
  - Opens modal (blank for now)
  - Modal will eventually capture square image of slide
  - Button style: prominent but non-intrusive
  - Modal component using shadcn Dialog

**New components to create:**
- `src/components/ui/user-bubble.tsx`
- `src/components/ui/xeet-logo.tsx`
- `src/components/ui/share-modal.tsx`

**Files to modify:**
- All slide components to include these elements
- `src/components/story/story-container.tsx` (global layout logic)

---

## Phase 2: Slide Content & Structure Updates

### 2.1 Timeline Slide Redesign
**Goal:** Combine graphs, update stat cards

**Tasks:**
- Merge three separate line graphs into single chart
- Implement multi-line chart with different colors:
  - Line 1: Posts over time
  - Line 2: Engagement over time  
  - Line 3: Follower growth over time
- Update color palette for clarity
- Redesign bottom cards:
  - Card 1: "Activity" (peak posting moment)
  - Card 2: "Engagement" (peak engagement moment)
  - Card 3: "Growth" (peak growth moment)

**Files to modify:**
- `src/components/slides/timeline-slide.tsx`
- `src/components/slides/timeline-chart.tsx`

### 2.2 Moments Slide → "2025 Bangers"
**Goal:** Showcase top 3 posts by different metrics

**Tasks:**
- Rename slide title to "2025 Bangers"
- Display exactly 3 posts:
  - Most liked post
  - Most reposted post
  - Most replied post
- Add metric labels to each card
- Ensure posts use existing `xeet-card.tsx` component
- Update mock data structure

**Files to modify:**
- `src/components/slides/moments-slide.tsx`
- `src/lib/mock-data/index.ts`

### 2.3 Remove Obsolete Slides
**Goal:** Clean up unused content

**Tasks:**
- Remove "Topics that Define your Year" slide completely
- Remove "2024 Milestones" slide completely
- Update slide navigation/routing
- Update mock data types if needed

**Files to modify/delete:**
- `src/components/slides/topics-slide.tsx` (delete or disable)
- `src/components/slides/achievements-slide.tsx` (if this is milestones, delete)
- Slide index/exports
- Story container navigation logic

---

## Phase 3: Advanced Components & Interactive Effects

### 3.1 Projects Slide → "Your Shills"
**Goal:** Implement lanyard name tag component

**Tasks:**
- Rename slide from "Technologies and Tools" to "Your Shills"
- Integrate React Bits Lanyard component
- Display 3 name tags:
  - Drop down animation
  - Rotation effect
  - Show top 3 technologies/tools user promoted
- Style to match design system
- Update mock data with "shills" terminology

**New components:**
- Copy/adapt lanyard from React Bits
- `src/components/react-bits/lanyard.tsx` (or integrate into existing)

**Files to modify:**
- `src/components/slides/projects-slide.tsx`

### 3.2 Friends Slide with Chroma Grid
**Goal:** Replace current friends display with chroma grid

**Tasks:**
- Integrate React Bits Chroma Grid component
- Display friend connections in grid layout
- Animated, colorful presentation
- Maintain existing friend data structure

**New components:**
- `src/components/react-bits/chroma-grid.tsx`

**Files to modify:**
- `src/components/slides/friends-slide.tsx`

### 3.3 Additional Friends Slide with Masonry
**Goal:** Add second friends slide with alternative layout

**Tasks:**
- Create new friends slide (variant)
- Integrate React Bits Masonry component
- Display same friend data in masonry layout
- Different visual presentation for variety

**New components:**
- `src/components/react-bits/masonry.tsx`

**Files to add:**
- `src/components/slides/friends-masonry-slide.tsx` (or similar)

### 3.4 ASCII Text for "Most Used Word"
**Goal:** Highlight user's most frequent word with ASCII animation

**Tasks:**
- Integrate React Bits ASCII Text component
- Determine placement (standalone slide or within existing slide)
- Display user's most used word in ASCII art style
- Animated effect on reveal
- Update mock data with "most used word" field

**New components:**
- `src/components/react-bits/ascii-text.tsx`

**Placement options:**
- New dedicated slide
- Integration into Identity slide
- Integration into Stats slide

---

## Implementation Notes

### Design System Consistency
- All new components must match existing glass panel aesthetic
- Use established color palette (red accents, dark theme)
- Maintain animation timing consistency
- Ensure mobile responsiveness

### React Bits Component Integration
Components to integrate from React Bits:
1. Letter Glitch (background effect)
2. Lanyard (name tags)
3. Chroma Grid (friends display)
4. Masonry (alternative friends display)
5. ASCII Text (word highlight)

**Integration strategy:**
- Copy component code into `src/components/react-bits/`
- Adapt styling to match design system
- Ensure TypeScript compatibility
- Test performance with animations

### Mock Data Updates
Update `src/lib/mock-data/index.ts` with:
- User authentication status
- Follower count
- Top 3 posts (liked, reposted, replied)
- "Shills" (technologies/tools)
- Most used word
- Technical jargon for letter glitch effect

### Routing & Navigation
- Add auth gate before story begins
- Update slide order after removals
- Ensure smooth transitions between new slides
- Maintain progress tracking

---

## Testing Checklist

### Phase 1
- [ ] Auth landing displays correctly
- [ ] Mock sign-in flow works
- [ ] Terminal animation is slower with pauses
- [ ] Letter glitch background renders
- [ ] Badge text updated
- [ ] User bubble appears on all slides
- [ ] Xeet logo appears on all slides
- [ ] Share modal opens/closes

### Phase 2
- [ ] Combined timeline chart renders with 3 lines
- [ ] Timeline cards show correct peak moments
- [ ] "2025 Bangers" displays 3 posts with metrics
- [ ] Removed slides no longer appear
- [ ] Slide navigation skips removed content

### Phase 3
- [ ] "Your Shills" shows 3 lanyard name tags
- [ ] Lanyard animations work (drop, rotate)
- [ ] Chroma grid friends display renders
- [ ] Masonry friends slide displays
- [ ] ASCII text for most used word appears
- [ ] All new components perform well

---

## Dependencies

### New Packages (if needed)
- React Bits components (copy source, no package)
- Potential charting library for combined timeline (or custom D3/Canvas)

### Existing
- shadcn/ui components (already in project)
- Framer Motion (already in use)
- Next.js routing

---

## Estimated Effort
- **Phase 1:** 3-4 hours (auth, global UI, terminal updates)
- **Phase 2:** 2-3 hours (slide content updates, removals)
- **Phase 3:** 4-5 hours (React Bits integrations, new layouts)

**Total:** 9-12 hours

---

## Success Criteria
✅ Users must sign in before accessing wrapped content  
✅ All slides have consistent branding (user bubble, logo)  
✅ Share functionality is accessible (modal ready for future implementation)  
✅ Terminal animation feels more deliberate and thoughtful  
✅ Timeline chart consolidates data into single visualization  
✅ "2025 Bangers" clearly highlights top posts  
✅ "Your Shills" uses engaging name tag animations  
✅ Friends displays use two distinct, visually appealing layouts  
✅ Most used word gets special ASCII treatment  
✅ Removed slides no longer clutter experience  
✅ All components match design system aesthetic


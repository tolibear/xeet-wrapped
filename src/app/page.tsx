import { GlassPanel } from "@/components/ui/glass-panel";
import { StatCard } from "@/components/ui/stat-card";
import { PersonaChip } from "@/components/ui/persona-chip";
import { AvatarFrame } from "@/components/ui/avatar-frame";
import { RedButton } from "@/components/ui/red-button";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold headline-condensed text-white">
            Xeet Wrapped
          </h1>
          <p className="mono-caption text-white/60">
            Phase 1: Design System Showcase
          </p>
        </div>

        {/* Glass Panel Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold headline-condensed text-white">
            Glass Panels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassPanel elevation="thin" className="p-8">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">Thin Elevation</h3>
                <p className="text-white/60">8px backdrop blur</p>
              </div>
            </GlassPanel>
            <GlassPanel elevation="medium" className="p-8">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">Medium Elevation</h3>
                <p className="text-white/60">16px backdrop blur</p>
              </div>
            </GlassPanel>
            <GlassPanel elevation="thick" className="p-8">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">Thick Elevation</h3>
                <p className="text-white/60">24px backdrop blur</p>
              </div>
            </GlassPanel>
          </div>
          <GlassPanel elevation="medium" glow className="p-8">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">With Glow Effect</h3>
              <p className="text-white/60">Red border glow enabled</p>
            </div>
          </GlassPanel>
        </section>

        {/* Stat Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold headline-condensed text-white">
            Stat Cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Xeets" value="2,847" />
            <StatCard label="Days Active" value={312} />
            <StatCard label="Longest Streak" value="47 days" />
            <StatCard label="New Friends" value={128} />
          </div>
        </section>

        {/* Persona Chips Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold headline-condensed text-white">
            Persona Chips
          </h2>
          <div className="flex flex-wrap gap-3">
            <PersonaChip label="Builder" variant="highlight" />
            <PersonaChip label="Tech Enthusiast" />
            <PersonaChip label="Content Creator" />
            <PersonaChip label="Community Leader" />
            <PersonaChip label="Early Adopter" />
          </div>
        </section>

        {/* Avatar Frames Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold headline-condensed text-white">
            Avatar Frames
          </h2>
          <div className="flex items-end gap-8">
            <div className="flex flex-col items-center gap-3">
              <AvatarFrame
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=small"
                alt="Small avatar"
                size="sm"
              />
              <span className="mono-caption text-white/60">Small</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <AvatarFrame
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=medium"
                alt="Medium avatar"
                size="md"
              />
              <span className="mono-caption text-white/60">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <AvatarFrame
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=large"
                alt="Large avatar"
                size="lg"
              />
              <span className="mono-caption text-white/60">Large</span>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold headline-condensed text-white">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <RedButton variant="solid">View Your Wrapped</RedButton>
            <RedButton variant="outline">Share Story</RedButton>
            <RedButton variant="solid" disabled>
              Disabled State
            </RedButton>
          </div>
        </section>

        {/* Complete Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold headline-condensed text-white">
            Complete Example
          </h2>
          <GlassPanel elevation="medium" glow className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <AvatarFrame
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=example"
                  alt="User avatar"
                  size="lg"
                />
                <div>
                  <h3 className="text-2xl font-bold headline-condensed text-white">
                    @yourhandle
                  </h3>
                  <p className="mono-caption text-white/60">2024 Wrapped</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <PersonaChip label="Innovator" variant="highlight" />
                <PersonaChip label="Thought Leader" />
                <PersonaChip label="Problem Solver" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Xeets" value="3.2K" />
                <StatCard label="Replies" value="1.8K" />
              </div>
              <RedButton variant="solid" className="w-full">
                View Full Story
              </RedButton>
            </div>
          </GlassPanel>
        </section>
      </div>
    </div>
  );
}

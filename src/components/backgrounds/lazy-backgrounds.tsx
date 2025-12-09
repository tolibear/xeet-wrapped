"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { useMobile } from "@/lib/hooks/use-mobile";
import {
  SilkFallback,
  AuroraFallback,
  PlasmaFallback,
  BeamsFallback,
  IridescenceFallback,
} from "./mobile-fallbacks";

// Loading fallback - subtle pulse effect
function LoadingFallback({ color = "#FF0033" }: { color?: string }) {
  return (
    <div className="absolute inset-0 bg-black">
      <div 
        className="absolute inset-0 animate-pulse-slower"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}20, transparent 70%)`,
        }}
      />
    </div>
  );
}

// Lazy-loaded WebGL backgrounds with loading states
export const LazySilk = dynamic<{ speed?: number; scale?: number; color?: string; noiseIntensity?: number; rotation?: number; className?: string }>(
  () => import("./react-bits/silk").then((mod) => mod.Silk),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
);

export const LazyAurora = dynamic<{ colorStops?: string[]; amplitude?: number; blend?: number; speed?: number; className?: string }>(
  () => import("./react-bits/aurora").then((mod) => mod.Aurora),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
);

export const LazyPlasma = dynamic<{ color?: number[]; opacity?: number; speed?: number; className?: string }>(
  () => import("./react-bits/plasma").then((mod) => mod.Plasma),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
);

export const LazyBeams = dynamic<{ lightColor?: string; className?: string }>(
  () => import("./react-bits/beams").then((mod) => mod.Beams),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
);

export const LazyIridescence = dynamic<{ color?: number[]; speed?: number; className?: string }>(
  () => import("./react-bits/iridescence").then((mod) => mod.Iridescence),
  {
    loading: () => <LoadingFallback />,
    ssr: false,
  }
);

// Smart background component that uses lazy loading on desktop, CSS fallback on mobile
type SilkProps = { speed?: number; scale?: number; color?: string; noiseIntensity?: number; rotation?: number; className?: string };
export function SmartSilk(props: SilkProps) {
  const { isMobile } = useMobile();
  
  if (isMobile) {
    return <SilkFallback color={props.color} className={props.className} />;
  }
  
  return <LazySilk {...props} />;
}

type AuroraProps = { colorStops?: string[]; amplitude?: number; blend?: number; speed?: number; className?: string };
export function SmartAurora(props: AuroraProps) {
  const { isMobile } = useMobile();
  
  if (isMobile) {
    return <AuroraFallback colorStops={props.colorStops} className={props.className} />;
  }
  
  return <LazyAurora {...props} />;
}

type PlasmaProps = { color?: number[]; opacity?: number; speed?: number; className?: string };
export function SmartPlasma(props: PlasmaProps) {
  const { isMobile } = useMobile();
  
  if (isMobile) {
    return <PlasmaFallback color="#FF0033" className={props.className} />;
  }
  
  return <LazyPlasma {...props} />;
}

type BeamsProps = { lightColor?: string; className?: string };
export function SmartBeams(props: BeamsProps) {
  const { isMobile } = useMobile();
  
  if (isMobile) {
    return <BeamsFallback lightColor={props.lightColor} className={props.className} />;
  }
  
  return <LazyBeams {...props} />;
}

type IridescenceProps = { color?: number[]; speed?: number; className?: string };
export function SmartIridescence(props: IridescenceProps) {
  const { isMobile } = useMobile();
  
  if (isMobile) {
    return <IridescenceFallback color={props.color} className={props.className} />;
  }
  
  return <LazyIridescence {...props} />;
}

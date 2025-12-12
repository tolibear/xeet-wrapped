/**
 * Elevation utility for applying consistent shadow styles
 * Based on the 4-tier elevation system defined in globals.css
 */

export type ElevationLevel = "e0" | "e1" | "e2" | "e3" | "os-frame";

/**
 * Get elevation class name for a given level
 */
export function getElevationClass(level: ElevationLevel): string {
  const elevationMap: Record<ElevationLevel, string> = {
    e0: "shadow-none",
    e1: "shadow-[var(--elevation-e1)]",
    e2: "shadow-[var(--elevation-e2)]",
    e3: "shadow-[var(--elevation-e3)]",
    "os-frame": "shadow-[var(--elevation-os-frame)]",
  };

  return elevationMap[level];
}

/**
 * Get elevation styles for inline use
 */
export function getElevationStyles(level: ElevationLevel): React.CSSProperties {
  const elevationMap: Record<ElevationLevel, string> = {
    e0: "var(--elevation-e0)",
    e1: "var(--elevation-e1)",
    e2: "var(--elevation-e2)",
    e3: "var(--elevation-e3)",
    "os-frame": "var(--elevation-os-frame)",
  };

  return {
    boxShadow: elevationMap[level],
  };
}


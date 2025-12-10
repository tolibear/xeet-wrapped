import { cn } from "@/lib/utils/cn";

export type PersonaChipProps = {
  label: string;
  variant?: "default" | "highlight";
  className?: string;
};

export function PersonaChip({
  label,
  variant = "default",
  className,
}: PersonaChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full backdrop-blur-[12px] border text-sm font-medium transition-all",
        variant === "highlight"
          ? "bg-[var(--red-primary)]/20 border-[var(--red-primary)]/50 text-white shadow-[0_0_15px_rgba(255,0,51,0.3)]"
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20",
        className
      )}
    >
      {label}
    </div>
  );
}


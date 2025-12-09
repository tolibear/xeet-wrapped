import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type RedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "outline";
};

export function RedButton({
  children,
  variant = "solid",
  className,
  ...props
}: RedButtonProps) {
  return (
    <button
      className={cn(
        "px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "solid"
          ? "bg-gradient-to-r from-[var(--red-primary)] to-[var(--red-dark)] text-white shadow-[0_0_20px_rgba(255,0,51,0.4)] hover:shadow-[0_0_30px_rgba(255,0,51,0.6)] hover:scale-105 active:scale-95"
          : "border-2 border-[var(--red-primary)] text-[var(--red-primary)] backdrop-blur-[8px] bg-white/5 hover:bg-[var(--red-primary)]/20 hover:shadow-[0_0_20px_rgba(255,0,51,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

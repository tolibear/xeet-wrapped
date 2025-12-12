import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export type AvatarFrameProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function AvatarFrame({
  src,
  alt,
  size = "md",
  className,
}: AvatarFrameProps) {
  const sizeStyles = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const borderSizes = {
    sm: "p-[2px]",
    md: "p-[3px]",
    lg: "p-[4px]",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-[var(--red-primary)] to-[var(--red-dark)] shadow-[0_0_25px_rgba(255,0,51,0.4)]",
        borderSizes[size],
        className
      )}
    >
      <div
        className={cn(
          "rounded-full overflow-hidden bg-[var(--background)] relative",
          sizeStyles[size]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={
            size === "lg" ? "128px" : size === "md" ? "80px" : "48px"
          }
        />
      </div>
    </div>
  );
}




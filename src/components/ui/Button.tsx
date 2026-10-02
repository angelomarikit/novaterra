import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "md" | "lg" | "sm";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 disabled:opacity-50",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-base",
        variant === "primary" &&
          "bg-forest text-white shadow-[0_10px_30px_rgba(47,74,40,0.22)] hover:-translate-y-0.5 hover:bg-forest-deep",
        variant === "secondary" &&
          "border border-forest/20 bg-white/80 text-forest backdrop-blur hover:border-forest/40 hover:bg-white",
        variant === "ghost" && "text-forest hover:bg-forest/5",
        variant === "dark" &&
          "bg-ink text-white hover:-translate-y-0.5 hover:bg-forest-deep",
        className,
      )}
      {...props}
    />
  );
}

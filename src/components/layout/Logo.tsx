import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
  variant = "default",
}: {
  className?: string;
  priority?: boolean;
  variant?: "default" | "onDark";
}) {
  if (variant === "onDark") {
    return (
      <Link
        href="/"
        className={cn("group inline-flex items-center gap-3", className)}
        aria-label="Novaterra Circular Economy Inc. home"
      >
        <span className="relative h-11 w-11 shrink-0">
          <Image
            src="/logo-mark.png"
            alt=""
            fill
            sizes="44px"
            className="object-contain"
            priority={priority}
          />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[0.95rem] font-bold tracking-[0.08em] text-white transition-colors group-hover:text-lime">
            NOVATERRA
          </span>
          <span className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/65">
            Circular Economy Inc.
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label="Novaterra Circular Economy Inc. home"
    >
      <span className="relative h-11 w-[168px] sm:h-12 sm:w-[196px]">
        <Image
          src="/logo.png"
          alt="Novaterra Circular Economy Inc."
          fill
          sizes="196px"
          className="object-contain object-left"
          priority={priority}
        />
      </span>
    </Link>
  );
}

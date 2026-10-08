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
        <span className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
          <Image
            src="/logo-mark-clean.png"
            alt=""
            width={112}
            height={112}
            className="h-full w-full object-contain"
            priority={priority}
            quality={100}
          />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[0.95rem] font-bold tracking-[0.08em] text-white transition-colors group-hover:text-lime sm:text-base">
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
      <Image
        src="/logo.png"
        alt="Novaterra Circular Economy Inc."
        width={220}
        height={201}
        className="h-12 w-auto object-contain object-left sm:h-14"
        priority={priority}
        quality={100}
      />
    </Link>
  );
}

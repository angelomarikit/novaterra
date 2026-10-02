import { cn } from "@/lib/utils";

export function DiagonalAccent({
  className,
}: {
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute overflow-hidden", className)}>
      <div className="h-full w-full origin-bottom-right skew-x-[-18deg] earth-stripes opacity-80" />
    </div>
  );
}

export function ThemeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-leaf/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-forest">
      <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
      {children}
    </span>
  );
}

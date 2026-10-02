import Image from "next/image";
import { cn } from "@/lib/utils";

export function SectionImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 40vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-sand ring-1 ring-stroke",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

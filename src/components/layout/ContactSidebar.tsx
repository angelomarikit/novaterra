import { Mail, MapPin, Phone, Globe2 } from "lucide-react";
import { SITE } from "@/lib/content/defaults";

export function ContactSidebar() {
  const items = [
    {
      icon: Phone,
      label: "Phone / Viber",
      value: SITE.phone,
      href: `tel:${SITE.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: Globe2,
      label: "Website",
      value: SITE.website,
      href: `https://${SITE.website}`,
    },
    {
      icon: MapPin,
      label: "Office",
      value: SITE.address,
    },
  ];

  return (
    <aside className="relative overflow-hidden rounded-[1.75rem] bg-forest-deep p-7 text-white shadow-[0_30px_80px_rgba(30,50,28,0.28)]">
      <div className="pointer-events-none absolute -right-8 top-8 h-36 w-36 rounded-full brand-gradient opacity-40 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full stripe-panel opacity-20" />

      <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-lime">
        Contact Sidebar
      </p>
      <h2 className="relative mt-3 font-display text-2xl font-semibold tracking-tight">
        Direct channels
      </h2>
      <p className="relative mt-3 text-sm leading-relaxed text-white/70">
        For partnerships, feedstock sourcing, facility development, and
        investment conversations.
      </p>

      <ul className="relative mt-8 space-y-5">
        {items.map((item) => (
          <li key={item.label} className="flex gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <item.icon size={16} className="text-teal" />
            </span>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/50">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block text-sm leading-relaxed text-white/90 hover:text-white"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-sm leading-relaxed text-white/90">
                  {item.value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-lime">Tagline</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-white/90">
          {SITE.tagline}
        </p>
      </div>
    </aside>
  );
}

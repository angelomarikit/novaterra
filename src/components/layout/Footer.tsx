import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content/defaults";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-stroke bg-forest-deep text-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 stripe-panel opacity-30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 dot-grid opacity-30" />

      <div className="container-page relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="onDark" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            {SITE.tagline}. Developing responsible circular-economy infrastructure
            that returns residual waste to productive economic use.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/80 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-teal" />
              <a href={`tel:${SITE.phone}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-teal" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white break-all">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-teal" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page relative flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {SITE.company_name}. All rights reserved.</p>
        <p>Built for circular progress — waste becomes resource.</p>
      </div>
    </footer>
  );
}

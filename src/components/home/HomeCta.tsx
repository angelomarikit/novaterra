import Link from "next/link";
import { FadeIn } from "@/components/shared/Motion";
import { Button } from "@/components/ui/Button";

export function HomeCta() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-stroke bg-white px-8 py-12 shadow-[0_24px_70px_rgba(21,32,24,0.06)] sm:px-12">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 brand-gradient opacity-15 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-48 earth-stripes opacity-20" />
            <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 rounded-full border border-dashed border-teal/25" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                Partner with Novaterra
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest-deep sm:text-4xl">
                Ready to turn residual waste into recovered value?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Connect with our team for project development, feedstock
                partnerships, technology discussions, and circular infrastructure
                planning.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button size="lg">Open Contact</Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="secondary">
                    Meet the Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

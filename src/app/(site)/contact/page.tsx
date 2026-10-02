"use client";

import { useState } from "react";
import { ContactSidebar } from "@/components/layout/ContactSidebar";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/shared/Motion";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="section-pad">
      <div className="container-page">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            Contact
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-forest-deep sm:text-5xl">
            Let&apos;s build circular infrastructure together
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Share your inquiry and our team will respond with next steps for
            partnerships, feedstock, or project development.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <ContactSidebar />
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[1.75rem] border border-stroke bg-white p-7 shadow-[0_20px_60px_rgba(21,32,24,0.05)] sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-forest-deep">
                Send a message
              </h2>
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm sm:col-span-1">
                  <span className="mb-1.5 block font-medium text-forest">Full name</span>
                  <input
                    required
                    name="name"
                    className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none transition focus:border-teal focus:bg-white"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-forest">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none transition focus:border-teal focus:bg-white"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-forest">Company</span>
                  <input
                    name="company"
                    className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none transition focus:border-teal focus:bg-white"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-forest">Subject</span>
                  <input
                    name="subject"
                    className="w-full rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none transition focus:border-teal focus:bg-white"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1.5 block font-medium text-forest">Message</span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    className="w-full resize-y rounded-xl border border-stroke bg-sand/40 px-4 py-3 outline-none transition focus:border-teal focus:bg-white"
                  />
                </label>

                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" disabled={status === "loading"}>
                    {status === "loading" ? "Sending…" : "Submit inquiry"}
                  </Button>
                  {status === "success" ? (
                    <p className="mt-3 text-sm font-medium text-teal">
                      Message received. We&apos;ll be in touch shortly.
                    </p>
                  ) : null}
                  {status === "error" ? (
                    <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
                  ) : null}
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

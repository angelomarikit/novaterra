"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import type { ContactMessage } from "@/types/content";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [note, setNote] = useState("");

  async function load() {
    const supabase = createClient();
    if (!supabase) {
      setNote("Connect Supabase to view contact form submissions.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    setEmail(user?.email ?? null);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setNote(error.message);
      return;
    }
    setMessages((data as ContactMessage[]) || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id: string, is_read: boolean) {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("contact_messages").update({ is_read }).eq("id", id);
    load();
  }

  return (
    <AdminShell email={email}>
      <div className="rounded-2xl border border-stroke bg-white p-6">
        <h2 className="font-display text-2xl font-semibold text-forest-deep">
          Contact messages
        </h2>
        <p className="mt-2 text-sm text-muted">
          Inquiries submitted from the Contact page form.
        </p>

        {note ? <p className="mt-4 text-sm text-amber-700">{note}</p> : null}

        <div className="mt-6 space-y-3">
          {messages.length === 0 && !note ? (
            <p className="rounded-xl bg-sand px-4 py-8 text-center text-sm text-muted">
              No messages yet.
            </p>
          ) : null}

          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`rounded-2xl border p-5 ${
                msg.is_read ? "border-stroke bg-white" : "border-teal/30 bg-teal/5"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-forest-deep">{msg.name}</h3>
                  <p className="text-sm text-muted">
                    {msg.email}
                    {msg.company ? ` · ${msg.company}` : ""}
                  </p>
                </div>
                <p className="text-xs text-muted">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
              {msg.subject ? (
                <p className="mt-3 text-sm font-medium text-forest">{msg.subject}</p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-muted">{msg.message}</p>
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => markRead(msg.id, !msg.is_read)}
                >
                  Mark as {msg.is_read ? "unread" : "read"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

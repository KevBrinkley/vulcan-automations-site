"use client";

import { useState } from "react";

type Props = {
  variant?: "full" | "compact";
};

export function ContactForm({ variant = "full" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("Sent. We will get back to you shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Try again in a moment.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-3 py-2 font-sans text-sm text-zinc-100 outline-none ring-sky-400/0 transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30";

  const messagePlaceholder =
    variant === "compact"
      ? "What should we know?"
      : "Where are you loosing time this week?";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={inputClass}
          name="firstName"
          placeholder="First name"
          required
          autoComplete="given-name"
        />
        <input
          className={inputClass}
          name="lastName"
          placeholder="Last name"
          required
          autoComplete="family-name"
        />
      </div>
      <input
        className={inputClass}
        name="email"
        type="email"
        placeholder="Work email"
        required
        autoComplete="email"
      />
      <input
        className={inputClass}
        name="phone"
        type="tel"
        placeholder="Work phone"
        required
        autoComplete="tel"
      />
      <input
        className={inputClass}
        name="company"
        placeholder="Company name"
        required
        autoComplete="organization"
      />
      <textarea
        className={`${inputClass} min-h-[96px]`}
        name="message"
        placeholder={messagePlaceholder}
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl border border-sky-400/50 bg-gradient-to-r from-sky-500/20 to-blue-500/10 px-4 py-2.5 font-sans text-sm font-semibold text-sky-50 shadow-[0_0_24px_rgba(56,189,248,0.18)] transition hover:border-sky-300 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {message && (
        <p
          className={`font-mono text-xs ${status === "success" ? "text-sky-300" : "text-rose-300"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import type { ModuleSlug } from "@/lib/modules";

type Props = {
  toolName: string;
  moduleSlug: ModuleSlug;
};

export function AccessToolForm({ toolName, moduleSlug }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      toolName,
      moduleSlug,
    };

    try {
      const res = await fetch("/api/access-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setFeedback("Submitted. We will send you access shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Network error. Try again in a moment.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-amber-300/40 bg-black/25 px-3 py-2 font-sans text-sm text-amber-50 placeholder:text-amber-100/50 outline-none backdrop-blur-sm transition focus:border-amber-300/70 focus:bg-black/35 focus:ring-2 focus:ring-amber-300/25";

  const buttonClass =
    "w-full rounded-xl border border-amber-300/60 bg-amber-300/35 px-4 py-2.5 font-sans text-sm font-semibold text-amber-50 shadow-[0_0_24px_rgba(253,224,71,0.25)] transition hover:border-amber-200 hover:bg-amber-300/45 disabled:opacity-60 sm:w-auto";

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
      <button
        type="submit"
        disabled={status === "loading"}
        className={buttonClass}
      >
        {status === "loading" ? "Submitting…" : "Access the tool"}
      </button>
      {feedback && (
        <p
          className={`font-mono text-xs ${status === "success" ? "text-amber-300" : "text-rose-300"}`}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}

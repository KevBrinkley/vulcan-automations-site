"use client";

import { useState } from "react";
import type { WhatsInsideItem } from "@/lib/modules";

const accentGradient: Record<string, string> = {
  sky: "from-sky-500/30 via-sky-950/40 to-[#141414]",
  magenta: "from-fuchsia-500/30 via-fuchsia-950/40 to-[#141414]",
  violet: "from-violet-500/30 via-violet-950/40 to-[#141414]",
  green: "from-emerald-500/30 via-emerald-950/40 to-[#141414]",
};

const activeDotClass: Record<string, string> = {
  sky: "w-6 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]",
  magenta: "w-6 bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.45)]",
  violet: "w-6 bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.45)]",
  green: "w-6 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]",
};

type Props = {
  items: WhatsInsideItem[];
};

export function WhatsInsideCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  if (total === 0) return null;

  const current = items[index]!;
  const accent = current.accent ?? "sky";

  function goTo(next: number) {
    setIndex(((next % total) + total) % total);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${accentGradient[accent] ?? accentGradient.sky} p-8 sm:p-10`}
      >
        <p className="font-sans text-base leading-relaxed text-zinc-200 sm:text-lg">
          {current.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-zinc-200 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.description}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition ${
                i === index
                  ? (activeDotClass[items[i]?.accent ?? "sky"] ??
                    activeDotClass.sky)
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-zinc-200 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

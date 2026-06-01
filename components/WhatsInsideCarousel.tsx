"use client";

import { useState } from "react";
import type { WhatsInsideItem } from "@/lib/modules";

const accentGradient: Record<string, string> = {
  gold: "from-amber-500/30 via-amber-950/40 to-[#141414]",
  magenta: "from-fuchsia-500/30 via-fuchsia-950/40 to-[#141414]",
  violet: "from-violet-500/30 via-violet-950/40 to-[#141414]",
  amber: "from-amber-500/30 via-amber-950/40 to-[#141414]",
};

type Props = {
  items: WhatsInsideItem[];
};

export function WhatsInsideCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  if (total === 0) return null;

  const current = items[index];
  const accent = current.accent ?? "gold";

  function goTo(next: number) {
    setIndex((next + total) % total);
  }

  return (
    <div>
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">
        <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-white/10">
          {current.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.image}
              alt={current.imageAlt ?? current.description}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${accentGradient[accent]}`}
              aria-hidden
            />
          )}
        </div>
        <p className="px-6 py-5 font-sans text-sm leading-relaxed text-zinc-300 sm:px-8 sm:py-6 sm:text-base">
          {current.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-zinc-200 transition hover:border-amber-400/40 hover:text-amber-100"
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
                  ? "w-6 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-zinc-200 transition hover:border-amber-400/40 hover:text-amber-100"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

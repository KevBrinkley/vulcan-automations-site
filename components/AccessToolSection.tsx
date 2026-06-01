"use client";

import { useState } from "react";
import { AccessToolForm } from "@/components/AccessToolForm";
import type { ModuleSlug } from "@/lib/modules";

type Props = {
  toolName: string;
  ctaLabel: string;
  moduleSlug: ModuleSlug;
};

export function AccessToolSection({ toolName, ctaLabel, moduleSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-amber-300">
        Access the tool
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
        Get started with {toolName}
      </h2>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 rounded-full border border-amber-300/60 bg-amber-300/15 px-8 py-3.5 font-sans text-sm font-semibold text-amber-50 shadow-[0_0_30px_rgba(253,224,71,0.2)] transition hover:border-amber-300 hover:bg-amber-300/25"
        >
          {ctaLabel}
        </button>
      ) : (
        <div className="mt-8 rounded-2xl border border-amber-300/50 bg-gradient-to-r from-amber-300/20 to-amber-600/10 p-6 text-left shadow-[0_0_24px_rgba(253,224,71,0.18)]">
          <AccessToolForm toolName={toolName} moduleSlug={moduleSlug} />
        </div>
      )}
    </div>
  );
}

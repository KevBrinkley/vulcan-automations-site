import Link from "next/link";
import { getModuleHref, type Module } from "@/lib/modules";

export function ModuleCard({ module }: { module: Module }) {
  return (
    <Link
      href={getModuleHref(module)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#141414] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.12)]"
    >
      <span className="font-mono text-sm uppercase tracking-[0.25em] text-amber-400/90">
        {module.preHeader}
      </span>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white group-hover:text-amber-100">
        {module.headline}
      </h3>
      <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-zinc-400">
        {module.summary}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-amber-300/90">
        Learn more
        <span aria-hidden className="transition group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

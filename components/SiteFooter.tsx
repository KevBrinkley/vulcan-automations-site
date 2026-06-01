import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14 text-center sm:px-6">
        <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
          {site.name}
        </p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-400">
          {site.description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 font-mono text-xs text-zinc-500">
          <span className="rounded border border-white/10 px-2 py-1">
            SMB ops
          </span>
          <span className="rounded border border-white/10 px-2 py-1">
            AI guardrails
          </span>
          <span className="rounded border border-white/10 px-2 py-1">
            RevOps friendly
          </span>
        </div>
        <Link
          href="/contact"
          className="mt-8 rounded-full border border-sky-400/60 bg-sky-500/15 px-6 py-3 font-sans text-sm font-semibold text-sky-50 shadow-[0_0_30px_rgba(56,189,248,0.2)] transition hover:border-sky-300 hover:bg-sky-500/25"
        >
          Talk with us
        </Link>
      </div>
      <div className="border-t border-white/5 py-6 text-center font-mono text-sm text-zinc-600">
        © {new Date().getFullYear()} {site.name} ·{" "}
        <Link className="text-sky-500/80 hover:text-sky-300" href="/blog">
          Blog
        </Link>{" "}
        ·{" "}
        <Link className="text-sky-500/80 hover:text-sky-300" href="/contact">
          Contact
        </Link>
      </div>
    </footer>
  );
}

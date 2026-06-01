import Link from "next/link";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/modules/executive-dashboard", label: "Dashboards" },
  { href: "/modules/ai-automation-paths", label: "AI" },
  { href: "/modules/ai-automation-consulting", label: "Apps" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white sm:text-xl">
            {site.name}
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-amber-300/90">
            {site.taglineShort}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-sans text-sm text-zinc-300 transition hover:bg-white/5 hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-amber-300/50 bg-amber-300/10 px-4 py-2 font-sans text-sm font-medium text-amber-200 shadow-[0_0_20px_rgba(253,224,71,0.15)] transition hover:border-amber-300 hover:bg-amber-300/20"
        >
          Talk with us
        </Link>
      </div>
      <nav className="mx-auto flex max-w-6xl flex-wrap gap-2 border-t border-white/5 px-4 pb-3 pt-3 sm:px-6 md:hidden">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full bg-white/5 px-3 py-1 font-mono text-sm text-zinc-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/modules/executive-dashboard", label: "Dashboards" },
  { href: "/modules/ai-automation-paths", label: "AI" },
  { href: "/modules/ai-automation-consulting", label: "Apps" },
  { href: "/blog", label: "Blog" },
];

const talkWithUsClass =
  "rounded-full border border-sky-400/50 bg-sky-500/10 px-4 py-2 font-sans text-sm font-medium text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.15)] transition hover:border-sky-300 hover:bg-sky-500/20";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121212]/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 flex-col leading-tight">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white sm:text-xl">
            {site.name}
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-sky-400/90">
            {site.taglineShort}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 font-sans text-sm text-zinc-300 transition hover:bg-white/5 hover:text-sky-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className={`${talkWithUsClass} hidden md:inline-flex`}>
            Talk with us
          </Link>

          <MobileNav />
        </div>
      </div>

      <div className="border-t border-white/5 px-4 pb-3 pt-3 md:hidden sm:px-6">
        <Link href="/contact" className={`inline-flex ${talkWithUsClass}`}>
          Talk with us
        </Link>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessToolSection } from "@/components/AccessToolSection";
import { ContactForm } from "@/components/ContactForm";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { FlowDiagram } from "@/components/FlowDiagram";
import { SkillsGrid } from "@/components/SkillsGrid";
import { WhatsInsideCarousel } from "@/components/WhatsInsideCarousel";
import { modules, type ModuleSlug } from "@/lib/modules";

type Props = { params: Promise<{ slug: string }> };

const slugs: ModuleSlug[] = modules.map((m) => m.slug);

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return {};
  return {
    title: mod.headline,
    description: mod.summary,
  };
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) notFound();

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
        <Link href="/" className="font-mono text-xs text-amber-300 hover:text-amber-200">
          ← Home
        </Link>
        <p className="mt-6 font-mono text-sm uppercase tracking-[0.25em] text-amber-300">
          {mod.preHeader}
        </p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
          {mod.headline}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <DownloadPdfButton
            href="#access-the-tool"
            label="Download module PDF"
            scrollTo
          />
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-sans text-sm font-semibold text-zinc-100 transition hover:border-amber-300/40"
          >
            Discuss implementation
          </a>
        </div>
      </div>

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-32 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-amber-300">
              {mod.overviewPreHeader}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
              {mod.overviewHeader}
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-400">
              {mod.overviewBody}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
              {mod.unlocksHeader}
            </p>
            <ul className="mt-4 space-y-3 font-sans text-sm text-zinc-300">
              {mod.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300/80 shadow-[0_0_12px_rgba(253,224,71,0.5)]"
                    aria-hidden
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
          <div className="text-center">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
              Take a look
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
              What&apos;s inside
            </h2>
          </div>
          <div className="mt-10">
            <WhatsInsideCarousel items={mod.whatsInside} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
            How it works
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            Implementation guide
          </h2>
          <FlowDiagram steps={mod.diagram} flowLabel="" className="mt-8" />
          {mod.slug === "ai-automation-paths" && <SkillsGrid />}
        </div>
      </section>

      <section
        id="access-the-tool"
        className="scroll-mt-24 border-t border-white/10 bg-[#101010]"
      >
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
          <AccessToolSection
            toolName={mod.headline}
            ctaLabel={mod.accessCtaLabel}
            moduleSlug={mod.slug}
          />
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-32 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div
            className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-300/15 via-amber-900/20 to-transparent"
            aria-hidden
          />
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-amber-300">
              Implementation
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
              How to roll this out successfully
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-400">
              Even a sharp blueprint stalls without the right rollout. A few
              patterns we&apos;ve seen consistently separate the teams that
              ship from the ones that don&apos;t:
            </p>
            <ul className="mt-6 space-y-3 font-sans text-sm text-zinc-300">
              {[
                "Start with one painful workflow, not a full reorg.",
                "Assign one accountable owner per process — not a committee.",
                "Capture baseline metrics before you change anything.",
                "Ship in two-week increments and review every Friday.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300/80 shadow-[0_0_12px_rgba(253,224,71,0.5)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 border-y border-white/10 bg-[#101010]"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-32 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-amber-300">
              Contact
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
              Tell us what&apos;s slowing you down.
            </h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
            <ContactForm variant="full" />
          </div>
        </div>
      </section>
    </main>
  );
}

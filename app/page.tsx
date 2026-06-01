import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ModuleCard } from "@/components/ModuleCard";
import { modules } from "@/lib/modules";
import { getAllPosts } from "@/lib/blog";

const ourProcessSteps = [
  {
    id: "1",
    label: "Document Current State",
    title: "Document Current State",
    description:
      "We map how work actually flows today: who owns it, what tools are involved, and where things stall. Nothing gets optimized until the baseline is honest and visible.",
    accent: "gold" as const,
  },
  {
    id: "2",
    label: "Share Best Practices",
    title: "Share Best Practices",
    description:
      "We bring proven patterns from similar businesses so you are not reinventing the wheel. You see what good looks like before committing time or budget to change.",
    accent: "magenta" as const,
  },
  {
    id: "3",
    label: "Prioritize & Assign",
    title: "Prioritize & Assign",
    description:
      "We rank opportunities by impact, effort, and fit for your team. Every initiative gets a clear owner and a realistic timeline before anything gets built.",
    accent: "violet" as const,
  },
  {
    id: "4",
    label: "Build & Implement",
    title: "Build & Implement",
    description:
      "We ship the systems, automations, and dashboards agreed in the plan, not a slide deck. You get working solutions your team can run without us in the room every day.",
    accent: "green" as const,
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(600px 400px at 20% 10%, rgba(253,224,71,0.28), transparent 60%), radial-gradient(500px 360px at 80% 0%, rgba(252,211,77,0.14), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-40 sm:px-6 sm:py-56">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-amber-300/90">
            {site.name}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Streamline operations for your business
          </h1>
          <div className="mt-8 max-w-2xl border-l-2 border-amber-300/70 pl-5">
            <p className="font-sans text-lg leading-relaxed text-zinc-300">
              Every business is different. We learn yours, then implement systems
              so that your business runs on its own. You can focus on being an
              owner, not an operator.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full border border-amber-300/60 bg-amber-300/15 px-6 py-3 font-sans text-sm font-semibold text-amber-50 shadow-[0_0_30px_rgba(253,224,71,0.2)] transition hover:border-amber-300 hover:bg-amber-300/25"
            >
              Talk with us
            </Link>
            <Link
              href="/process"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-sans text-sm font-semibold text-zinc-100 transition hover:border-amber-300/40 hover:text-amber-100"
            >
              Our services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-32 pt-32 sm:px-6">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
            What we do
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            Our Services
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {modules.map((m) => (
            <ModuleCard key={m.slug} module={m} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
            Our specialities
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            Industries We Support
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {[
              "Home Services",
              "Healthcare",
              "Legal & Accounting",
              "Technology",
              "Hospitality",
            ].map((industry) => (
              <h3
                key={industry}
                className="py-6 font-[family-name:var(--font-display)] text-lg font-semibold text-white sm:text-xl"
              >
                {industry}
              </h3>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
            How we work
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
            Our Process
          </h2>
          <FlowDiagram steps={ourProcessSteps} flowLabel="" className="mt-8" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-white/10 px-4 py-32 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
              Blog
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
              Field notes
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs text-amber-300 hover:text-amber-200"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.length === 0 ? (
            <p className="font-sans text-sm text-zinc-500">
              Add markdown files under{" "}
              <code className="font-mono text-zinc-400">content/blog</code>.
            </p>
          ) : (
            posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-white/10 bg-[#141414] p-5 transition hover:border-amber-300/40"
              >
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-500">
                  {p.date}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-zinc-400">
                  {p.description}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#101010]">
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-amber-300">
              Contact
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
              Tell us what&apos;s slowing you down.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-[#141414] p-6">
            <ContactForm variant="full" />
          </div>
        </div>
      </section>
    </main>
  );
}

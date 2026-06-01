import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} about blueprints, dashboards, or AI adoption.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-sky-400">
        Contact
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
        Let&apos;s talk about your operations
      </h1>
      <div className="mt-6 max-w-2xl border-l-2 border-sky-400/70 pl-5">
        <p className="font-sans text-sm leading-relaxed text-zinc-400">
          Share your goals and what you&apos;ve already tried. We&apos;ll respond
          with a clear next step, not a generic proposal.
        </p>
      </div>
      <div className="mt-10 max-w-xl rounded-2xl border border-white/10 bg-[#141414] p-6 sm:p-8">
        <ContactForm variant="full" />
      </div>
    </main>
  );
}

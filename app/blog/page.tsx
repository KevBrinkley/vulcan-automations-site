import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on operations, dashboards, and pragmatic AI adoption.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
        Blog
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
        Writing we stand behind
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-sm text-zinc-400">
        Short, specific pieces. No hype cycles, just what we are seeing work on
        real operating floors.
      </p>
      <ul className="mt-12 space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-white/10 bg-[#141414] p-6 transition hover:border-sky-400/40"
            >
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-500">
                {p.date}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white group-hover:text-sky-100">
                {p.title}
              </h2>
              <p className="mt-2 font-sans text-sm text-zinc-400">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

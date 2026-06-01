import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-32 sm:px-6">
      <Link
        href="/blog"
        className="font-mono text-xs text-sky-300 hover:text-sky-200"
      >
        ← Back to blog
      </Link>
      <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-zinc-500">
        {post.date}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-white">
        {post.title}
      </h1>
      <p className="mt-4 font-sans text-sm text-zinc-400">{post.description}</p>
      <article className="prose prose-invert prose-headings:font-display prose-a:text-sky-300 prose-code:text-sky-200 mt-10 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}

import Link from "next/link";

export function DownloadPdfButton({
  href,
  label,
  scrollTo,
}: {
  href: string;
  label: string;
  /** In-page anchor scroll (no file download). */
  scrollTo?: boolean;
}) {
  const className =
    "inline-flex items-center gap-2 rounded-xl border border-sky-400/50 bg-sky-500/10 px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wide text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.12)] transition hover:border-sky-300 hover:bg-sky-500/20";

  if (scrollTo) {
    return (
      <a href={href} className={className}>
        <span className="rounded border border-sky-400/40 px-1.5 py-0.5 text-sm text-sky-200">
          PDF
        </span>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} download className={className}>
      <span className="rounded border border-sky-400/40 px-1.5 py-0.5 text-sm text-sky-200">
        PDF
      </span>
      {label}
    </Link>
  );
}

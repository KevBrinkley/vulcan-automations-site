export type FlowStep = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  accent?: "gold" | "magenta" | "violet" | "green";
  image?: string;
  imageAlt?: string;
};

const accentRing: Record<string, string> = {
  gold: "border-amber-400/60 shadow-[0_0_18px_rgba(251,191,36,0.25)]",
  magenta: "border-fuchsia-500/50 shadow-[0_0_18px_rgba(232,121,249,0.2)]",
  violet: "border-violet-400/50 shadow-[0_0_18px_rgba(167,139,250,0.2)]",
  green:
    "border-emerald-400/60 shadow-[0_0_18px_rgba(52,211,153,0.28)]",
};

const stepLabelClass: Record<string, string> = {
  gold: "text-amber-200/80",
  magenta: "text-fuchsia-200/80",
  violet: "text-violet-200/80",
  green: "text-emerald-300/90",
};

type Props = {
  steps: FlowStep[];
  flowLabel?: string;
  className?: string;
};

export function FlowDiagram({
  steps,
  flowLabel = "Flow",
  className = "",
}: Props) {
  const isDetailed = steps.some((step) => step.description);
  const showFlowLabel = flowLabel.length > 0;

  return (
    <div className={className}>
      {showFlowLabel ? (
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-500">
          {flowLabel}
        </p>
      ) : null}
      <div
        className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${showFlowLabel ? "mt-6" : ""}`}
      >
        {steps.map((step) => {
          const accent = step.accent ?? "gold";
          return (
            <div
              key={step.id}
              className={`rounded-xl border bg-[#101010] p-4 ${accentRing[accent]} ${isDetailed ? "p-5" : ""}`}
            >
              {step.image ? (
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image}
                    alt={step.imageAlt ?? step.title ?? step.label}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="mb-4 aspect-video overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/[0.02]"
                  aria-hidden
                />
              )}
              <p
                className={`font-mono text-sm ${stepLabelClass[accent] ?? stepLabelClass.gold}`}
              >
                Step {step.id}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-white">
                {step.title ?? step.label}
              </h3>
              {step.description ? (
                <p className="mt-3 font-sans text-sm leading-relaxed text-white">
                  {step.description}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

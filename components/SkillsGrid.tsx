import { smallBusinessSkills } from "@/lib/skills-40";

export function SkillsGrid() {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#141414] p-6">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-sky-400">
        40 SMB skills
      </p>
      <p className="mt-2 font-sans text-sm text-zinc-400">
        A practical checklist you can adopt in order. Swap labels to match your
        industry; keep the spine.
      </p>
      <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {smallBusinessSkills.map((skill, i) => (
          <li
            key={skill}
            className="flex gap-3 rounded-lg border border-white/5 bg-[#101010] px-3 py-2 font-mono text-sm leading-snug text-zinc-300"
          >
            <span className="shrink-0 font-semibold text-sky-400/90">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{skill}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

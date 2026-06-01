export type ModuleSlug =
  | "process"
  | "executive-dashboard"
  | "ai-automation-paths"
  | "ai-automation-consulting";

/** HubSpot form-type value for module access / PDF gate forms. */
export type ModuleAccessFormType =
  | "blueprint_access"
  | "ai_access"
  | "dashboard_access"
  | "app_access";

export type VulcanFormType = "contact" | ModuleAccessFormType;

const accessFormTypeBySlug: Record<ModuleSlug, ModuleAccessFormType> = {
  process: "blueprint_access",
  "executive-dashboard": "dashboard_access",
  "ai-automation-paths": "ai_access",
  "ai-automation-consulting": "app_access",
};

export function getModuleAccessFormType(
  slug: string,
): ModuleAccessFormType | undefined {
  return accessFormTypeBySlug[slug as ModuleSlug];
}

export type WhatsInsideItem = {
  image?: string;
  imageAlt?: string;
  description: string;
  accent?: "sky" | "magenta" | "violet" | "green";
};

export type Module = {
  slug: ModuleSlug;
  /** Small label above the card title (e.g. Blueprint, Data). */
  preHeader: string;
  /** Primary title on cards and module pages. */
  headline: string;
  summary: string;
  /** Small label above the overview headline on the module page. */
  overviewPreHeader: string;
  /** Short headline that introduces the module overview block. */
  overviewHeader: string;
  /** Short paragraph beneath the overview headline. */
  overviewBody: string;
  /** URL path for this module page (defaults to /modules/{slug}). */
  path?: string;
  pdfPath: string;
  highlights: string[];
  /** Label for the unlocks card beside the overview block. */
  unlocksHeader: string;
  /** Button label that reveals the access tool form on module pages. */
  accessCtaLabel: string;
  whatsInside: WhatsInsideItem[];
  diagram: {
    id: string;
    label: string;
    title?: string;
    description?: string;
    accent?: "sky" | "magenta" | "violet" | "green";
  }[];
};

export const modules: Module[] = [
  {
    slug: "process",
    path: "/process",
    preHeader: "Blueprint",
    headline: "Process Design",
    summary:
      "We review the tools and technology you use and the processes that run your business. We identify inefficiencies and build a plan to streamline them.",
    overviewPreHeader: "Overview",
    overviewHeader: "Turn chaos into process",
    overviewBody:
      "Streamlining and automating your business starts with finding clarity in your operations. The Operational Blueprint gives you a roadmap to document, prioritize, and then automate every aspect of your business from customer intake to invoicing.",
    pdfPath: "/downloads/operational-blueprint.pdf",
    unlocksHeader: "What you will unlock",
    accessCtaLabel: "Start understanding your business",
    highlights: [
      "Clear visibility into what is creating bottlenecks",
      "A prioritized path to consistency, simplicity, and repeatability",
      "The right tools and processes to automate your operations",
      "Copy and paste components for any industry",
    ],
    whatsInside: [
      {
        description:
          "Operating rhythm templates for weekly, monthly, and quarterly touchpoints so leadership always knows what gets reviewed and when.",
        accent: "sky",
      },
      {
        description:
          "Process ownership maps with clear escalation paths, so nothing stalls because no one knows who decides.",
        accent: "magenta",
      },
      {
        description:
          "Data hygiene checklists and single-source-of-truth guides to stop teams from working off conflicting numbers.",
        accent: "violet",
      },
      {
        description:
          "Vendor and customer communication standards you can hand to any team member on day one.",
        accent: "green",
      },
    ],
    diagram: [
      {
        id: "1",
        label: "Document current state",
        title: "Document current state",
        description:
          "We map how work actually flows today: who owns it, what tools are involved, and where things stall. Nothing gets optimized until the baseline is honest and visible.",
        accent: "sky",
      },
      {
        id: "2",
        label: "Align with best-practices",
        title: "Align with best-practices",
        description:
          "We bring proven patterns from similar businesses so you are not reinventing the wheel. You see what good looks like before committing time or budget to change.",
        accent: "magenta",
      },
      {
        id: "3",
        label: "Review automation paths",
        title: "Review automation paths",
        description:
          "Identify where automation and AI can replace manual effort without boiling the ocean. Each opportunity is evaluated for impact and fit before you invest.",
        accent: "violet",
      },
      {
        id: "4",
        label: "Prioritize and begin work",
        title: "Prioritize and begin work",
        description:
          "We rank opportunities by impact and effort, then ship what matters first. Every initiative gets a clear owner and a realistic timeline.",
        accent: "green",
      },
    ],
  },
  {
    slug: "executive-dashboard",
    preHeader: "Data",
    headline: "Dashboards & Reporting",
    summary:
      "We centralize every aspect of your business in one simple dashboard. You'll track the key metrics, stay on top of performance, feel confident about your business, and pivot when you need to.",
    overviewPreHeader: "Overview",
    overviewHeader: "Leadership in five minutes",
    overviewBody:
      "A view every business should be able to read in under five minutes: pipeline, cash, delivery, and risk.",
    pdfPath: "/downloads/executive-dashboard.pdf",
    unlocksHeader: "Inside the module",
    accessCtaLabel: "Get started",
    highlights: [
      "North-star metrics vs noise metrics",
      "Leading vs lagging indicators by function",
      "Exception-based alerts instead of vanity charts",
      "Cadence: what changes weekly vs monthly",
    ],
    whatsInside: [
      {
        description:
          "A north-star metrics framework that separates signal from noise, so your dashboard answers one question: are we winning?",
        accent: "sky",
      },
      {
        description:
          "Leading and lagging indicators by function, mapped to the decisions each leader actually makes.",
        accent: "magenta",
      },
      {
        description:
          "Exception-based alert rules that surface problems early instead of burying them in vanity charts.",
        accent: "violet",
      },
      {
        description:
          "A review cadence guide for what to check weekly versus monthly, built for owners who need clarity fast.",
        accent: "green",
      },
    ],
    diagram: [
      { id: "1", label: "Revenue + pipeline health", accent: "sky" },
      { id: "2", label: "Cash + runway signals", accent: "magenta" },
      { id: "3", label: "Delivery + capacity", accent: "violet" },
      { id: "4", label: "Risks + dependencies", accent: "green" },
    ],
  },
  {
    slug: "ai-automation-paths",
    preHeader: "AI",
    headline: "AI Automations",
    summary:
      "We build and implement agents that run tasks from administrative operations to complex workflows. We unlock time for you and your people so you can focus on strategic work and delivering for your customers.",
    overviewPreHeader: "Overview",
    overviewHeader: "AI without boiling the ocean",
    overviewBody:
      "Structured adoption paths for AI in small business, with forty high-leverage skills you can roll out without overhauling everything at once.",
    pdfPath: "/downloads/ai-automation-paths.pdf",
    unlocksHeader: "Inside the module",
    accessCtaLabel: "Get started",
    highlights: [
      "Level 0–4 maturity ladder for automation",
      "Where LLMs help vs where deterministic automation wins",
      "Governance: approvals, logging, and human-in-the-loop",
      "Starter stack patterns that fit SMB reality",
    ],
    whatsInside: [
      {
        description:
          "A level 0-4 maturity ladder so you know exactly where you are today and what to automate next.",
        accent: "sky",
      },
      {
        description:
          "Decision guides for when an LLM is the right tool versus when deterministic automation is safer and cheaper.",
        accent: "magenta",
      },
      {
        description:
          "Governance templates covering approvals, logging, and human-in-the-loop handoffs before anything goes live.",
        accent: "violet",
      },
      {
        description:
          "Starter stack patterns sized for small business reality, not enterprise fantasy.",
        accent: "green",
      },
    ],
    diagram: [
      { id: "1", label: "Document + observe workflows", accent: "sky" },
      { id: "2", label: "Pilot with narrow scope", accent: "magenta" },
      { id: "3", label: "Measure time saved + errors", accent: "violet" },
      { id: "4", label: "Scale what survives contact with reality", accent: "green" },
    ],
  },
  {
    slug: "ai-automation-consulting",
    preHeader: "Build",
    headline: "Custom Applications",
    summary:
      "AI allows us to quickly iterate and deliver bespoke applications unique to your business. Reduce application costs and overhead with your own custom, low-cost solutions applied specifically to your needs.",
    overviewPreHeader: "Overview",
    overviewHeader: "A chatbot that knows your business",
    overviewBody:
      "Trained on how your business actually works—answers common questions, captures leads, and escalates when a human touch is needed.",
    pdfPath: "/downloads/ai-automation-consulting.pdf",
    unlocksHeader: "Inside the module",
    accessCtaLabel: "Get started",
    highlights: [
      "Trained on your FAQs, policies, and real workflows",
      "Handles repeat inquiries and qualifies leads 24/7",
      "Clear handoff rules when a person should take over",
      "Tuned from real conversations—not generic scripts",
    ],
    whatsInside: [
      {
        description:
          "A knowledge base structure trained on your FAQs, policies, and real workflows, not generic templates.",
        accent: "sky",
      },
      {
        description:
          "Lead qualification and repeat-inquiry flows that run 24/7 while your team sleeps.",
        accent: "magenta",
      },
      {
        description:
          "Handoff rules that define exactly when a human should take over, so customers never feel stuck.",
        accent: "violet",
      },
      {
        description:
          "Conversation tuning guides built from real customer interactions, not one-size-fits-all scripts.",
        accent: "green",
      },
    ],
    diagram: [
      { id: "1", label: "Map questions + escalation paths", accent: "sky" },
      { id: "2", label: "Train on your knowledge base", accent: "magenta" },
      { id: "3", label: "Deploy with guardrails + testing", accent: "violet" },
      { id: "4", label: "Tune from live conversations", accent: "green" },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getModuleHref(module: Module): string {
  return module.path ?? `/modules/${module.slug}`;
}

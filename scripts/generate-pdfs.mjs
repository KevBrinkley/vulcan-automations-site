import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function make(filename, title, subtitle) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const teal = rgb(0.08, 0.72, 0.64);
  page.drawText("Vulcan Automations", {
    x: 50,
    y: 730,
    size: 14,
    font: fontBold,
    color: teal,
  });
  page.drawText(title, { x: 50, y: 690, size: 20, font: fontBold });
  page.drawText(subtitle, {
    x: 50,
    y: 655,
    size: 11,
    font,
    color: rgb(0.35, 0.35, 0.35),
  });
  page.drawText("Placeholder PDF for website downloads.", {
    x: 50,
    y: 615,
    size: 11,
    font,
  });
  page.drawText("Replace with your final branded PDF when ready.", {
    x: 50,
    y: 595,
    size: 11,
    font,
  });
  const bytes = await doc.save();
  const out = path.join(__dirname, "..", "public", "downloads", filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, bytes);
  console.log("Wrote", out);
}

await make(
  "operational-blueprint.pdf",
  "Operational Blueprint",
  "Foundations to run business operations smoothly.",
);
await make(
  "executive-dashboard.pdf",
  "Executive Dashboard",
  "Example dashboard every business should run.",
);
await make(
  "ai-automation-paths.pdf",
  "AI Automation Paths",
  "Forty small-business skills and adoption paths.",
);
await make(
  "ai-automation-consulting.pdf",
  "AI Automation Consulting",
  "How we work with teams to ship automation safely.",
);

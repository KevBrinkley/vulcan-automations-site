import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/contact-notify";
import { captureHubSpotLead } from "@/lib/hubspot";
import { getModuleAccessFormType } from "@/lib/modules";
import { site } from "@/lib/site";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  toolName?: string;
  moduleSlug?: string;
};

export async function POST(request: Request) {
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!hubspotToken) {
    return NextResponse.json(
      {
        error:
          "Lead capture is not configured. Set HUBSPOT_ACCESS_TOKEN in .env.local (see README).",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const company = (body.company ?? "").trim();
  const toolName = (body.toolName ?? "").trim();
  const moduleSlug = (body.moduleSlug ?? "").trim();
  const fullName = `${firstName} ${lastName}`.trim();
  const accessFormType = getModuleAccessFormType(moduleSlug);

  if (!firstName || !lastName || !email || !phone || !company) {
    return NextResponse.json(
      {
        error:
          "First name, last name, work email, work phone, and company name are required.",
      },
      { status: 400 },
    );
  }

  if (!accessFormType) {
    return NextResponse.json(
      { error: "Unknown module. Submit the form from a module page." },
      { status: 400 },
    );
  }

  const noteLines = [
    `Source: ${site.name} website — ${accessFormType}`,
    `Module: ${toolName || moduleSlug}`,
  ];

  const captured = await captureHubSpotLead(
    hubspotToken,
    { email, firstName, lastName, phone, company },
    noteLines.join("\n"),
    { formType: accessFormType, moduleName: toolName || undefined },
  );

  if ("error" in captured) {
    return NextResponse.json(
      { error: captured.error ?? "Failed to save lead." },
      { status: 502 },
    );
  }

  const notify = await sendContactNotification({
    subject: `${site.name} tool access: ${toolName || "Request"} - ${fullName}`,
    replyTo: email,
    lines: [
      `Tool: ${toolName || "Unknown"}`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
    ],
  });

  if ("error" in notify) {
    return NextResponse.json(
      {
        error:
          "Lead was saved, but the email notification failed. Check Resend settings.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

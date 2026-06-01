import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/contact-notify";
import { captureHubSpotLead } from "@/lib/hubspot";
import { site } from "@/lib/site";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
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
  const message = (body.message ?? "").trim();
  const fullName = `${firstName} ${lastName}`.trim();

  if (!firstName || !lastName || !email || !phone || !company || !message) {
    return NextResponse.json(
      {
        error:
          "First name, last name, email, phone, company name, and message are required.",
      },
      { status: 400 },
    );
  }

  const captured = await captureHubSpotLead(
    hubspotToken,
    { email, firstName, lastName, phone, company },
    [`Source: ${site.name} website — contact form`, "", message].join("\n"),
    { formType: "contact" },
  );

  if ("error" in captured) {
    return NextResponse.json(
      { error: captured.error ?? "Failed to save lead." },
      { status: 502 },
    );
  }

  const notify = await sendContactNotification({
    subject: `${site.name} contact: ${fullName}`,
    replyTo: email,
    lines: [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      "",
      message,
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

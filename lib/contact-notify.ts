import { Resend } from "resend";
import { site } from "@/lib/site";

type NotifyInput = {
  subject: string;
  replyTo: string;
  lines: string[];
};

/** Sends an inbox copy when Resend env vars are set; otherwise no-op. */
export async function sendContactNotification(
  input: NotifyInput,
): Promise<{ sent: true } | { skipped: true } | { error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ||
    `${site.name} <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.lines.join("\n"),
  });

  if (error) {
    return { error: error.message ?? "Failed to send email." };
  }

  return { sent: true };
}

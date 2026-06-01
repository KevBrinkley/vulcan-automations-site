import type { VulcanFormType } from "@/lib/modules";

const HUBSPOT_API = "https://api.hubapi.com";

export type HubSpotContactInput = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
};

export type HubSpotLeadMeta = {
  formType: VulcanFormType;
  moduleName?: string;
};

/** Contact properties set on every submission (create these in HubSpot first). */
export function hubspotLeadProperties(
  meta: HubSpotLeadMeta,
): Record<string, string> {
  const formTypeProperty =
    process.env.HUBSPOT_FORM_TYPE_PROPERTY?.trim() || "nucleus_form_type";
  const moduleProperty =
    process.env.HUBSPOT_MODULE_PROPERTY?.trim() || "nucleus_module";

  const properties: Record<string, string> = {
    [formTypeProperty]: meta.formType,
  };

  if (meta.moduleName) {
    properties[moduleProperty] = meta.moduleName;
  }

  return properties;
}

async function hubspotErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as {
      message?: string;
      errors?: { message?: string }[];
    };
    const detail = data.errors?.[0]?.message ?? data.message;
    if (detail) return detail;
  } catch {
    // ignore parse errors
  }
  return res.statusText || "HubSpot request failed.";
}

export async function upsertHubSpotContact(
  accessToken: string,
  contact: HubSpotContactInput,
  extraProperties?: Record<string, string>,
): Promise<{ id: string } | { error: string }> {
  const res = await fetch(
    `${HUBSPOT_API}/crm/v3/objects/contacts/batch/upsert`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          {
            idProperty: "email",
            id: contact.email,
            properties: {
              email: contact.email,
              firstname: contact.firstName,
              lastname: contact.lastName,
              phone: contact.phone,
              company: contact.company,
              lifecyclestage: "lead",
              ...extraProperties,
            },
          },
        ],
      }),
    },
  );

  if (!res.ok) {
    return { error: await hubspotErrorMessage(res) };
  }

  const data = (await res.json()) as {
    results?: { id?: string }[];
  };
  const id = data.results?.[0]?.id;
  if (!id) {
    return { error: "HubSpot did not return a contact id." };
  }

  return { id };
}

/** Association type: note → contact */
const NOTE_TO_CONTACT_ASSOCIATION = 202;

export async function createHubSpotNote(
  accessToken: string,
  contactId: string,
  body: string,
): Promise<{ ok: true } | { error: string }> {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: body,
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: NOTE_TO_CONTACT_ASSOCIATION,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    return { error: await hubspotErrorMessage(res) };
  }

  return { ok: true };
}

export async function captureHubSpotLead(
  accessToken: string,
  contact: HubSpotContactInput,
  note: string,
  meta: HubSpotLeadMeta,
): Promise<{ ok: true } | { error: string }> {
  const messageProperty = process.env.HUBSPOT_MESSAGE_PROPERTY?.trim();
  const extraProperties: Record<string, string> = {
    ...hubspotLeadProperties(meta),
  };
  if (messageProperty && meta.formType === "contact") {
    extraProperties[messageProperty] = note;
  }

  const upserted = await upsertHubSpotContact(
    accessToken,
    contact,
    extraProperties,
  );
  if ("error" in upserted) {
    return upserted;
  }

  const noted = await createHubSpotNote(accessToken, upserted.id, note);
  if ("ok" in noted) {
    return { ok: true };
  }

  // Service keys usually only expose contacts.write; contact is still saved.
  // Message is on the contact if HUBSPOT_MESSAGE_PROPERTY is set, or in Resend email.
  return { ok: true };
}

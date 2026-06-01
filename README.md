# Vulcan Automations — marketing site

**Repo:** [github.com/KevBrinkley/vulcan-automations-site](https://github.com/KevBrinkley/vulcan-automations-site)  
**Domain:** [vulcanautomations.com](https://vulcanautomations.com)

Dark, neon-teal editorial layout: landing page, four module pages with PDF downloads, blog (markdown in `content/blog`), and contact forms that save leads to **HubSpot** (optional **Resend** email copy).

## Local development

```bash
npm install
cp .env.example .env.local
# Add HUBSPOT_ACCESS_TOKEN (required); Resend vars optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lead capture (HubSpot)

1. Sign in to [HubSpot](https://www.hubspot.com/) (free CRM is fine).
2. Create a **Service Key** (recommended; skip legacy private apps):
   - Click **Use Service Keys instead** on the legacy-app prompt, or go to **Development → Keys → Service keys**, or **Settings → Integrations → Service keys**.
3. Grant scope: **`crm.objects.contacts.write`** only.  
   (Service keys do not list `crm.objects.notes.write`; that is normal. Notes are attempted with your contacts scope; if HubSpot blocks them, the contact is still saved.)
4. Copy the key into `HUBSPOT_ACCESS_TOKEN` in `.env.local` (and in Vercel/host env on deploy).

Submissions **upsert** a contact by email (lifecycle stage `lead`) and try to attach a **note** with the message or tool name. View leads under **CRM → Contacts** in HubSpot.

### Contact properties (required for form differentiation)

Create these under **Settings → Properties → Contact properties**:

| Label | Internal name | Type | Values / notes |
|-------|----------------|------|----------------|
| Form type (label: “Vulcan form type”) | `nucleus_form_type` | Dropdown | `contact`, `blueprint_access`, `dashboard_access`, `ai_access`, `app_access` |
| Module (label: “Vulcan module”) | `nucleus_module` | Single-line text | Module headline (e.g. Process Design) |

The site sets them automatically:

| Source | `nucleus_form_type` | Module page |
|--------|---------------------|-------------|
| Contact form (home, /contact, etc.) | `contact` | — |
| Process Design / blueprint | `blueprint_access` | `/process` |
| Dashboards & Reporting | `dashboard_access` | `/modules/executive-dashboard` |
| AI Automations | `ai_access` | `/modules/ai-automation-paths` |
| Custom Applications | `app_access` | `/modules/ai-automation-consulting` |

**Filter in HubSpot:** CRM → Contacts → **Add filter** → form type is `blueprint_access` (or any value above). Save views per funnel (e.g. “Blueprint leads”).

Internal property names stay `nucleus_*` so existing HubSpot setup keeps working; rename the **labels** in HubSpot to “Vulcan form type” / “Vulcan module” if you like.

Override internal names in `.env.local` with `HUBSPOT_FORM_TYPE_PROPERTY` / `HUBSPOT_MODULE_PROPERTY` if needed.

**Optional — store the contact message on the record:** Create `website_message` (multi-line text) and set `HUBSPOT_MESSAGE_PROPERTY=website_message` in `.env.local`.

Without `HUBSPOT_ACCESS_TOKEN`, the API returns `503` and the UI shows the server error.

### Optional email notification (Resend)

If you also want an inbox alert when a lead is saved, set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and a verified `RESEND_FROM_EMAIL`. If Resend is not configured, leads still save to HubSpot only.

## PDF placeholders

Regenerate the four module PDFs (placeholder content) anytime:

```bash
npm run generate:pdfs
```

Files are written to `public/downloads/*.pdf`. Replace them with your final branded assets; keep the same filenames or update `lib/modules.ts`.

## Deploy

**Vercel / Netlify / Cloudflare Pages:** import this repo; root directory is `.` (repo root). Framework: Next.js.

Environment variables (production):

- `HUBSPOT_ACCESS_TOKEN` (required)
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `RESEND_FROM_EMAIL` (optional)

Custom domain: `vulcanautomations.com` + `www` → point DNS at your host.

## Content

- **Modules (cards + detail pages):** copy and structure in `lib/modules.ts` (`preHeader`, `headline`, summary, PDF path).
- **40 skills list:** `lib/skills-40.ts`.
- **Blog posts:** add `content/blog/<slug>.md` with frontmatter `title`, `date`, `description`.

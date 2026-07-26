# AM Concepts — Website CMS Setup Guide

Your website now has a full admin panel. This guide walks you through the
one-time setup, day-to-day usage, and deploying independently on Cloudflare
after exporting from Lovable.

---

## 1. One-time Supabase setup (5 minutes)

You already provided:
- `APP_SUPABASE_URL` — your Supabase project URL
- `APP_SUPABASE_ANON_KEY` — publishable/anon key
- `APP_SUPABASE_SERVICE_ROLE` — service role key
- `ADMIN_EMAIL` — pre-fills the setup form

### Run the database migration

1. Open your Supabase dashboard → **SQL Editor** → **New query**.
2. Open `supabase/migrations/0001_cms_foundation.sql` in this project.
3. Copy the entire file, paste into the SQL editor, click **Run**.

That creates: `admins`, `site_settings`, `content_blocks`, `form_submissions`,
the `media` storage bucket, and all Row-Level-Security policies.

### Create your first admin

1. Visit **`/admin/setup`** on your site.
2. Email is pre-filled from `ADMIN_EMAIL`. Password is pre-filled with
   `manoj123`. Click **Create Admin Account**.
3. The setup page auto-disables after the first admin is created.

### Log in

1. Visit **`/admin/login`**.
2. Sign in with the email + password you just set.
3. You land on the dashboard.

---

## 2. Using the admin panel

### Site Settings (`/admin/settings`)
Contact info, WhatsApp number, addresses, social links, Google Maps URLs, and
SEO meta title/description. **Saves are live immediately** — the public
website re-fetches on next page navigation.

### Media Library (`/admin/media`)
Drag-and-drop image uploads to Supabase Storage. Click **Copy URL** on any
image to paste it into a content editor. Delete any file with the trash icon.

### Form Submissions (`/admin/submissions`)
Every contact form submission is stored. Search, delete, and export as CSV.

### Page Content (coming in Phase 1b)
Hero, About, Services, Testimonials, FAQ — each with a rich-text editor
(TipTap) and drag-and-drop ordering.

---

## 3. Managing your admin account

### Change password
1. Visit `/admin/login`.
2. Click **Forgot password?** — a reset email is sent from Supabase.
3. Click the link, set a new password on `/admin/reset`.

### Change email
Go to Supabase dashboard → **Authentication → Users** → find your user →
**Edit** → change email. Then update the `email` column in the `admins`
table to match.

### Add another admin
1. Supabase → **Authentication → Users → Add user** (send invite or set a
   password directly).
2. In **SQL Editor**, run:
   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'their@email.com';
   ```

---

## 4. Export & deploy to Cloudflare (independent of Lovable)

The CMS works identically after export because it talks directly to *your*
Supabase project.

### Push to GitHub
1. In Lovable: **Settings → GitHub → Connect / export**.
2. Lovable pushes the full source to a new GitHub repo.

### Deploy on Cloudflare Pages/Workers
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the GitHub repo.
3. Build command: `bun install && bun run build`
4. Output directory: `.output/public`
5. Under **Settings → Environment variables (Production)**, add:
   - `APP_SUPABASE_URL`
   - `APP_SUPABASE_ANON_KEY`
   - `APP_SUPABASE_SERVICE_ROLE`
   - `ADMIN_EMAIL` (optional — only used to pre-fill setup)
6. Save & deploy.

### Custom domain
Cloudflare dashboard → your Pages project → **Custom domains → Set up** →
enter your domain. Cloudflare auto-issues an SSL certificate.

### Supabase URL Configuration (important)
Supabase → **Authentication → URL Configuration**:
- Site URL: `https://yourdomain.com`
- Redirect URLs: add `https://yourdomain.com/admin/reset`

Without this, password-reset emails will fail.

---

## 5. Backups

### Manual DB backup
Supabase → **Database → Backups** (Pro plan). Or export via CLI:
```bash
supabase db dump --file backup.sql
```

### Restore
```bash
psql "$DATABASE_URL" < backup.sql
```

Media files: back up via Supabase Storage or a `rclone`/S3-compatible sync of
the `media` bucket.

---

## 6. Files created / modified in Phase 1

**Created**
- `supabase/migrations/0001_cms_foundation.sql`
- `src/lib/config.functions.ts`
- `src/lib/admin-bootstrap.functions.ts`
- `src/lib/supabase.ts`
- `src/hooks/useSiteSettings.ts`
- `src/components/admin/SupabaseProvider.tsx`
- `src/components/admin/AdminShell.tsx`
- `src/components/admin/RequireAdmin.tsx`
- `src/routes/admin/route.tsx`
- `src/routes/admin/setup.tsx`
- `src/routes/admin/login.tsx`
- `src/routes/admin/reset.tsx`
- `src/routes/admin/index.tsx`
- `src/routes/admin/settings.tsx`
- `src/routes/admin/media.tsx`
- `src/routes/admin/submissions.tsx`
- `CMS_SETUP.md`

**Modified**
- `src/routes/__root.tsx` — wraps app in `SupabaseProvider` with runtime config.
- `src/components/site/Footer.tsx` — reads phone/email/whatsapp/socials/addresses from settings (falls back to hardcoded).
- `src/components/site/Navbar.tsx` — reads site name + tagline from settings.
- `src/routes/contact.tsx` — WhatsApp destination number from settings.

---

## 7. What's coming in Phase 1b / 1c

- Hero section editor (images + text + slider timing)
- About / Mission / Vision / Founders editor with TipTap rich-text
- Services CMS (add/edit/delete/reorder + image)
- Testimonials CMS (add/edit/delete/reorder + photo)
- FAQ CMS (add/edit/delete/reorder)
- Portfolio CMS (categories, images, VR links)
- Blog system (draft/publish, categories, tags, featured image, SEO)
- Per-page SEO editor
- Navigation menu editor (drag-and-drop)
- Backup/restore inside the admin panel

Ask any time to continue with the next module.

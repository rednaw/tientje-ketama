[**<---**](README.md)

# Authentication

Magic links, no passwords. EU-based email (Mailersend). Invite-only signup.

---

## Overview

- **Magic links:** User enters email → receives login link → clicks to log in. No password to remember.
- **Email provider:** Mailersend (EU-based, sovereign, free tier 3,000 emails/month).
- **Invites:** New users join via invite link only. No public registration.
- **Bootstrap:** Seed script creates the first admin (see below).

---

## Bootstrap — first admin

The first user must exist before anyone can send invites. Use a **seed script** run once at deploy.

**Flow:**
1. Run `npm run db:seed` (or `pnpm db:seed`, `node scripts/seed.js`, etc.).
2. Script reads `ADMIN_EMAIL` from env (or prompts), creates user with `role: admin`.
3. Script can optionally create the user only if the table is empty (idempotent).
4. Remove or disable the script after first deploy, or keep it safe (checks for zero users).

**Example:**
```bash
ADMIN_EMAIL=band@example.com node scripts/seed-admin.js
```

**Script behavior:**
- Connect to DB (via `DATABASE_URL`).
- If users table empty: insert admin with given email.
- If not empty: exit (no-op or error).
- Log success or skip.

**When to run:** Once after first deploy, or as part of deploy if idempotent.

---

## Invitation flow

1. Admin creates invite → receives link (e.g. `https://archive.example.com/join/abc123xyz`).
2. Admin sends link to new member (chat, email, etc.).
3. New member clicks link, enters email, account is created.
4. Token invalidated after use (or after expiry, e.g. 7 days).

---

## Data model

- **Invites:** `id`, `token`, `created_by`, `created_at`, `expires_at`, `used_at`, `used_by`
- **Users:** `id`, `email`, `created_at` (no password)
- **Sessions:** DB-stored; cookie holds session ID only. See [Sessions](#sessions) below.

---

## Sessions

**Storage:** DB (sessions table). Session ID in cookie; server owns the session.

**Why DB over signed cookie:**
- **Revocation:** Invalidate sessions immediately (e.g. when someone leaves).
- **Audit:** Optional metadata (user agent, IP).
- **No cookie size limit:** Session data stays in DB.

**Expiry:** 30 days from creation.

**Cleanup:** Remove expired sessions periodically. Options: cron job, or cleanup on app startup. Prisma: `deleteMany({ where: { expiresAt: { lt: new Date() } } })`.

**Logout:** Delete session row, clear cookie.

**"Remember me":** Optional; skip for now. Can add later (e.g. longer expiry when checked).

---

## Access control

- **Invites only:** New users join only via valid invite link. No public registration.
- **No allowlist:** We rely on invites; no separate email allowlist. Magic links are sent only to existing users (those who joined via invite).

---

## Mailersend integration

### Why Mailersend
- EU-based (Estonia), GDPR compliant, data sovereignty.
- Free tier: 3,000 emails/month (sufficient for 7 people, low volume).
- SMTP or REST API.

### Setup
1. Create account at mailersend.com.
2. Add and verify domain (DNS records).
3. Create API token.
4. Configure sender: `noreply@yourdomain.com`.

### Configuration (env)
```
MAILERSEND_API_TOKEN=mlsn.xxxxxxxxxxxx
MAIL_FROM=noreply@yourdomain.com
MAIL_FROM_NAME=Tientje Ketama
```

### API usage
- `POST https://api.mailersend.com/v1/email`
- Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
- Body: `from`, `to`, `subject`, `text`, `html`

### Magic link email
- Subject: "Tientje Ketama — Your login link"
- Body: Single link + expiry notice (e.g. 15 minutes).
- Token: Random, single-use, stored in DB with expiry.

### Security
- Token: 32+ bytes random, single-use.
- Expiry: 15 minutes.
- Only send to existing users (joined via invite). Do not reveal whether an email exists (e.g. always say "If that email exists, we sent a link" to avoid enumeration).
- Rate limit: e.g. 3 attempts per email per hour.

---

## References

- [Mailersend API](https://developers.mailersend.com/)

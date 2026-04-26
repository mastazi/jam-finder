# Jam Finder (Next.js)

Jam Finder has been reimplemented with **Next.js App Router** and prepared for clean integration with **Vercel** and **Supabase**.

## Tech stack

- Next.js 16 (App Router)
- React + TypeScript (strict mode)
- Node.js 22+
- Clerk authentication via `ClerkProvider` + `clerkMiddleware`
- Environment-first Supabase integration scaffolding


## Runtime requirements

- Node.js 22 or newer (`.nvmrc` is set to `22`).
- Next.js 16.x.

## Clerk + Next.js 16

This project already uses the current Clerk integration style for App Router:

- `ClerkProvider` in `app/layout.tsx`
- `clerkMiddleware()` in `proxy.ts`

No migration from legacy `authMiddleware` is required in this codebase.

If you use a custom domain or proxy for Clerk, this project supports `NEXT_PUBLIC_CLERK_DOMAIN` and `NEXT_PUBLIC_CLERK_PROXY_URL` and forwards them to both `ClerkProvider` and `clerkMiddleware()`. On Vercel, if `NEXT_PUBLIC_CLERK_DOMAIN` is not set, the app falls back to `VERCEL_URL` automatically.

## Project structure

```txt
app/                  # routes, layouts, and UI
lib/config/env.ts     # environment parsing/validation
lib/supabase/         # browser/server Supabase client factory scaffolding
```

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Fill the values in `.env.local`:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Optional: `SUPABASE_SERVICE_ROLE_KEY` for server-side admin tasks

   - Optional (custom Clerk domain/proxy setups):
     - `NEXT_PUBLIC_CLERK_DOMAIN` (host only, e.g. `auth.example.com`; if omitted on Vercel, `VERCEL_URL` is used)
     - `NEXT_PUBLIC_CLERK_PROXY_URL` (full URL if you're fronting Clerk behind a proxy)

4. Start dev server:

   ```bash
   npm run dev
   ```

## Vercel setup

- Import this repository into Vercel.
- Set the same environment variables in your Vercel Project Settings.
- Build command: `npm run build`
- Output: handled automatically by Next.js on Vercel.

## Enabling Supabase SDK

The codebase already centralizes environment management and has dedicated browser/server factories in `lib/supabase/`.

When your environment allows package installation:

1. Install Supabase SDK(s):

   ```bash
   npm install @supabase/supabase-js
   ```

2. Replace the placeholder return values in `lib/supabase/client.ts` and `lib/supabase/server.ts` with real `createClient(...)` setup.

## Supabase table + seed SQL

Run `supabase/jam_sessions.sql` in the Supabase SQL Editor to create and seed the `jam_sessions` table used by the homepage.

The homepage now queries Supabase directly via the REST API (`/rest/v1/jam_sessions`) using the configured `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

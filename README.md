# Jam Finder (Next.js)

Jam Finder has been reimplemented with **Next.js App Router** and prepared for clean integration with **Vercel** and **Supabase**.

## Tech stack

- Next.js (App Router)
- React + TypeScript (strict mode)
- Environment-first Supabase integration scaffolding

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

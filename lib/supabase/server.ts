import { env } from '@/lib/config/env';
import type { SupabaseClientConfig } from '@/lib/supabase/client';

/**
 * Server-side Supabase factory placeholder.
 *
 * To activate, install `@supabase/supabase-js` or `@supabase/ssr` and replace this
 * return value with a real server client factory (cookies/header-aware as needed).
 */
export const createSupabaseServerClient = (): SupabaseClientConfig => ({
  url: env.supabaseUrl,
  anonKey: env.supabaseAnonKey,
  runtime: 'server'
});

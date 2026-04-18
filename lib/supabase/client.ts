import { env } from '@/lib/config/env';

export type SupabaseClientConfig = {
  url: string;
  anonKey: string;
  runtime: 'browser' | 'server';
};

/**
 * Browser-side Supabase factory placeholder.
 *
 * To activate, install `@supabase/supabase-js` and replace this return value with:
 * `createClient(env.supabaseUrl, env.supabaseAnonKey)`.
 */
export const createSupabaseBrowserClient = (): SupabaseClientConfig => ({
  url: env.supabaseUrl,
  anonKey: env.supabaseAnonKey,
  runtime: 'browser'
});

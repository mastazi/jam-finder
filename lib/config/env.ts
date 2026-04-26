const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const normalizeClerkDomain = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return undefined;
  }

  const valueWithoutProtocol = trimmedValue.replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!valueWithoutProtocol || valueWithoutProtocol.includes('/')) {
    throw new Error(
      'NEXT_PUBLIC_CLERK_DOMAIN must be a bare host (for example "app.example.com") without protocol or path.'
    );
  }

  return valueWithoutProtocol;
};

const supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

const resolvedClerkDomain =
  normalizeClerkDomain(process.env.NEXT_PUBLIC_CLERK_DOMAIN) ?? normalizeClerkDomain(process.env.VERCEL_URL);

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  clerkPublishableKey: requireEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  clerkSecretKey: requireEnv('CLERK_SECRET_KEY'),
  clerkDomain: resolvedClerkDomain,
  clerkProxyUrl: process.env.NEXT_PUBLIC_CLERK_PROXY_URL
};

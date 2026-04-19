const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  clerkPublishableKey: requireEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  clerkSecretKey: requireEnv('CLERK_SECRET_KEY')
};

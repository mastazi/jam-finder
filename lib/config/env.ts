const requiredPublicVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const;

type RequiredPublicVar = (typeof requiredPublicVars)[number];

const readRequired = (name: RequiredPublicVar): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const env = {
  supabaseUrl: readRequired('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: readRequired('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
};

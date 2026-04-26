import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type LoginPageProps = {
  searchParams?: Promise<{
    intent?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { userId } = await auth();

  if (userId) {
    redirect('/');
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const favouriteIntent = resolvedSearchParams?.intent === 'favourite';

  return (
    <main>
      <section className="auth-shell clerk-shell">
        <h1>{favouriteIntent ? 'login to favourite jams' : 'Log in'}</h1>
        <p>Use Clerk to sign in to your Jam Finder account.</p>

        <div className="clerk-card-wrap">
          <SignIn path="/login" routing="path" signUpUrl="/signup" fallbackRedirectUrl="/" />
        </div>

        <p>
          Need an account? <Link href="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}

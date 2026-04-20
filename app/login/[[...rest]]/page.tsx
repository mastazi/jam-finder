import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/');
  }

  return (
    <main>
      <section className="auth-shell clerk-shell">
        <h1>Log in</h1>
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

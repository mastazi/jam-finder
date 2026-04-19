import { SignUp } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const { userId } = await auth();

  if (userId) {
    redirect('/profile');
  }

  return (
    <main>
      <section className="auth-shell clerk-shell">
        <h1>Sign up</h1>
        <p>Create your Jam Finder account with Clerk.</p>

        <div className="clerk-card-wrap">
          <SignUp path="/signup" routing="path" signInUrl="/login" fallbackRedirectUrl="/profile" />
        </div>

        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}

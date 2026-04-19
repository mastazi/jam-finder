'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SESSION_KEY, notifySessionChanged } from '@/lib/supabase/auth-session';
import { env } from '@/lib/config/env';

type SignupResponse = {
  access_token?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    const response = await fetch(`${env.supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        apikey: env.supabaseAnonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setError('Unable to create your account. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const data = (await response.json()) as SignupResponse;

    if (data.access_token) {
      window.localStorage.setItem(SESSION_KEY, data.access_token);
      notifySessionChanged();
      router.push('/profile');
      router.refresh();
      return;
    }

    router.push('/login');
    router.refresh();
  };

  return (
    <main>
      <section className="auth-shell">
        <h1>Sign up</h1>
        <p>Create a Jam Finder account backed by Supabase authentication.</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" name="email" required autoComplete="email" />
          </label>

          <label>
            Password
            <input type="password" name="password" required minLength={8} autoComplete="new-password" />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}

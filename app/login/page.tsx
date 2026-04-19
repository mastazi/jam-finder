'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SESSION_KEY, notifySessionChanged } from '@/lib/supabase/auth-session';
import { env } from '@/lib/config/env';

type AuthResponse = {
  access_token: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = new URLSearchParams(window.location.search).get('verified') === '1';
    setIsVerified(verified);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    const response = await fetch(`${env.supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: env.supabaseAnonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setError('Unable to log in. Check your credentials and try again.');
      setIsSubmitting(false);
      return;
    }

    const data = (await response.json()) as AuthResponse;
    window.localStorage.setItem(SESSION_KEY, data.access_token);
    notifySessionChanged();
    router.push('/profile');
    router.refresh();
  };

  return (
    <main>
      <section className="auth-shell">
        <h1>Log in</h1>
        <p>Use your Supabase account to access your Jam Finder profile.</p>
        {isVerified ? <p>Your email is verified. You can log in now.</p> : null}

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" name="email" required autoComplete="email" />
          </label>

          <label>
            Password
            <input type="password" name="password" required autoComplete="current-password" />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p>
          Need an account? <Link href="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}

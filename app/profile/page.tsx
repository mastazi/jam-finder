'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SESSION_KEY, notifySessionChanged } from '@/lib/supabase/auth-session';
import { env } from '@/lib/config/env';

type UserResponse = {
  id: string;
  email?: string;
};

function ProfileAvatar() {
  return (
    <span className="profile-card-icon" aria-hidden>
      <svg viewBox="0 0 24 24" role="img">
        <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.2c-3.7 0-6.7 2.2-6.7 4.8V21h13.4v-2c0-2.6-3-4.8-6.7-4.8Z" />
      </svg>
    </span>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [identifier, setIdentifier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem(SESSION_KEY);

    if (!token) {
      router.replace('/login');
      return;
    }

    const loadProfile = async () => {
      const response = await fetch(`${env.supabaseUrl}/auth/v1/user`, {
        headers: {
          apikey: env.supabaseAnonKey,
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        window.localStorage.removeItem(SESSION_KEY);
        notifySessionChanged();
        setError('Session expired. Please log in again.');
        setIsLoading(false);
        return;
      }

      const user = (await response.json()) as UserResponse;
      setIdentifier(user.id || user.email || 'Unknown user');
      setIsLoading(false);
    };

    void loadProfile();
  }, [router]);

  const handleLogout = async () => {
    const token = window.localStorage.getItem(SESSION_KEY);

    if (token) {
      await fetch(`${env.supabaseUrl}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          apikey: env.supabaseAnonKey,
          Authorization: `Bearer ${token}`
        }
      });
    }

    window.localStorage.removeItem(SESSION_KEY);
    notifySessionChanged();
    router.push('/');
    router.refresh();
  };

  return (
    <main>
      <section className="profile-shell">
        <h1>Your profile</h1>

        {isLoading ? <p>Loading your profile…</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        {identifier ? (
          <article className="profile-card">
            <ProfileAvatar />
            <div>
              <p className="profile-label">Current user identifier</p>
              <p className="profile-identifier">{identifier}</p>
            </div>
          </article>
        ) : null}

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </section>
    </main>
  );
}

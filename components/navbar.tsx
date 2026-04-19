'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { SESSION_EVENT, SESSION_KEY } from '@/lib/supabase/auth-session';

function ProfileIcon() {
  return (
    <span className="profile-icon" aria-hidden>
      <svg viewBox="0 0 24 24" role="img">
        <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.2c-3.7 0-6.7 2.2-6.7 4.8V21h13.4v-2c0-2.6-3-4.8-6.7-4.8Z" />
      </svg>
    </span>
  );
}

export function Navbar() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const syncSession = () => setHasSession(Boolean(window.localStorage.getItem(SESSION_KEY)));

    syncSession();

    const onStorage = (event: StorageEvent) => {
      if (event.key === SESSION_KEY) {
        syncSession();
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(SESSION_EVENT, syncSession);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(SESSION_EVENT, syncSession);
    };
  }, []);

  return (
    <header className="top-nav-wrapper">
      <nav className="top-nav" aria-label="Primary">
        <Link href="/" className="brand-link">
          Jam Finder
        </Link>

        <div className="nav-actions">
          <ThemeToggle />
          {hasSession ? (
            <Link href="/profile" className="profile-link" aria-label="Profile page">
              <ProfileIcon />
            </Link>
          ) : (
            <Link href="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

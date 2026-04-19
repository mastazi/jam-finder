import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';

function ProfileIcon() {
  return (
    <span className="profile-icon" aria-hidden>
      <svg viewBox="0 0 24 24" role="img">
        <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.2c-3.7 0-6.7 2.2-6.7 4.8V21h13.4v-2c0-2.6-3-4.8-6.7-4.8Z" />
      </svg>
    </span>
  );
}

export async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="top-nav-wrapper">
      <nav className="top-nav" aria-label="Primary">
        <Link href="/" className="brand-link">
          Jam Finder
        </Link>

        <div className="nav-actions">
          <ThemeToggle />
          {userId ? (
            <>
              <Link href="/profile" className="profile-link" aria-label="Profile page">
                <ProfileIcon />
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/login" className="login-link">
                Login
              </Link>
              <Link href="/signup" className="signup-link">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

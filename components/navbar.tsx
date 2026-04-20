import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';

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
            <UserButton />
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

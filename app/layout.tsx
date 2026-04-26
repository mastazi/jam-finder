import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Navbar } from '@/components/navbar';
import { env } from '@/lib/config/env';

export const metadata: Metadata = {
  title: 'Jam Finder',
  description: 'Next.js foundation for Jam Finder with Vercel + Supabase-ready structure.'
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ClerkProvider domain={env.clerkDomain} proxyUrl={env.clerkProxyUrl}>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

const currentUtcTime = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC'
}).format(new Date());

export default function HomePage() {
  return (
    <main>
      <section className="card">
        <span className="badge">Next.js App Router + Supabase-ready</span>
        <h1>{`hello world, it's ${currentUtcTime} UTC`}</h1>
        <p>
          Jam Finder is now reimplemented on Next.js with a clean structure intended for Vercel deployments and future
          Supabase integration.
        </p>
        <ul>
          <li>Centralized environment validation in <code>lib/config/env.ts</code>.</li>
          <li>Server and browser Supabase clients in <code>lib/supabase</code>.</li>
          <li>TypeScript strict mode and App Router conventions enabled.</li>
        </ul>
      </section>
    </main>
  );
}

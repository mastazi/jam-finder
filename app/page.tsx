import { getJamSessions } from '@/lib/supabase/jam-sessions';
import Link from 'next/link';

export default async function HomePage() {
  const jamSessions = await getJamSessions();

  return (
    <main>
      <section className="page-header">
        <span className="badge">Live Supabase Data</span>
        <h1>Find your next jam in Sydney</h1>
        <p>Browse upcoming jam sessions by genre. This list is now loaded from your Supabase table.</p>
      </section>

      <section className="jam-grid" aria-label="Jam session list">
        {jamSessions.map((session) => (
          <Link href={`/jams/${session.id}`} className="jam-card-link" key={session.id}>
            <article className="jam-card">
              <img src={session.imageUrl} alt={`${session.genre} musicians jamming`} className="jam-image" />
              <div className="jam-content">
                <p className="genre-tag">{session.genre}</p>
                <h2>{session.name}</h2>
                <ul>
                  <li>
                    <strong>Date:</strong> {session.eventDate}
                  </li>
                  <li>
                    <strong>Time:</strong> {session.eventTime}
                  </li>
                  <li>
                    <strong>Location:</strong> {session.location}
                  </li>
                  <li>
                    <strong>Frequency:</strong> {session.frequency}
                  </li>
                </ul>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}

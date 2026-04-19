import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getJamSessionById } from '@/lib/supabase/jam-sessions';

type JamDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JamDetailPage({ params }: JamDetailPageProps) {
  const { id } = await params;
  const jamId = Number(id);

  if (Number.isNaN(jamId)) {
    notFound();
  }

  const jamSession = await getJamSessionById(jamId);

  if (!jamSession) {
    notFound();
  }

  return (
    <main>
      <p>
        <Link href="/" className="back-link">
          ← Back to all jam sessions
        </Link>
      </p>

      <article className="jam-detail-card">
        <img src={jamSession.imageUrl} alt={`${jamSession.genre} jam session hero`} className="jam-detail-hero" />

        <div className="jam-detail-layout">
          <aside className="jam-detail-meta">
            <p className="genre-tag">{jamSession.genre}</p>
            <h1>{jamSession.name}</h1>
            <ul>
              <li>
                <strong>Date:</strong> {jamSession.eventDate}
              </li>
              <li>
                <strong>Time:</strong> {jamSession.eventTime}
              </li>
              <li>
                <strong>Location:</strong> {jamSession.location}
              </li>
              <li>
                <strong>Frequency:</strong> {jamSession.frequency}
              </li>
            </ul>
          </aside>

          <section>
            <h2>About this jam</h2>
            <p>{jamSession.description}</p>
          </section>
        </div>
      </article>
    </main>
  );
}

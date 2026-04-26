import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getFavouriteJamIds, setFavouriteState } from '@/lib/supabase/favourites';
import { getJamSessions } from '@/lib/supabase/jam-sessions';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`heart-icon ${filled ? 'heart-icon-filled' : ''}`}>
    <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
  </svg>
);

export default async function HomePage() {
  const jamSessions = await getJamSessions();
  const { userId } = await auth();

  const favouriteIds = userId ? new Set(await getFavouriteJamIds(userId)) : new Set<number>();

  const toggleFavouriteAction = async (formData: FormData) => {
    'use server';

    const jamId = Number(formData.get('jamId'));
    const currentlyFavourited = formData.get('currentlyFavourited') === 'true';

    if (Number.isNaN(jamId)) {
      return;
    }

    const { userId: actionUserId } = await auth();

    if (!actionUserId) {
      redirect('/login?intent=favourite');
    }

    await setFavouriteState({
      clerkUserId: actionUserId,
      jamId,
      shouldBeFavourited: !currentlyFavourited
    });

    revalidatePath('/');
  };

  return (
    <main>
      <section className="page-header">
        <span className="badge">Live Supabase Data</span>
        <h1>Find your next jam in Sydney</h1>
        <p>Browse upcoming jam sessions by genre. This list is now loaded from your Supabase table.</p>
      </section>

      <section className="jam-grid" aria-label="Jam session list">
        {jamSessions.map((session) => {
          const isFavourited = favouriteIds.has(session.id);

          return (
            <article className="jam-card" key={session.id}>
              <div className="jam-media">
                {userId ? (
                  <form action={toggleFavouriteAction} className="favourite-form">
                    <input type="hidden" name="jamId" value={session.id} />
                    <input type="hidden" name="currentlyFavourited" value={String(isFavourited)} />
                    <button
                      type="submit"
                      className="favourite-btn"
                      aria-label={isFavourited ? `Remove ${session.name} from favourites` : `Add ${session.name} to favourites`}
                    >
                      <HeartIcon filled={isFavourited} />
                    </button>
                  </form>
                ) : (
                  <Link
                    href="/login?intent=favourite"
                    className="favourite-btn"
                    aria-label={`Login to favourite ${session.name}`}
                  >
                    <HeartIcon filled={false} />
                  </Link>
                )}

                <Link href={`/jams/${session.id}`} className="jam-card-link">
                  <img src={session.imageUrl} alt={`${session.genre} musicians jamming`} className="jam-image" />
                </Link>
              </div>

              <div className="jam-content">
                <p className="genre-tag">{session.genre}</p>
                <h2>
                  <Link href={`/jams/${session.id}`} className="jam-card-title-link">
                    {session.name}
                  </Link>
                </h2>
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
          );
        })}
      </section>
    </main>
  );
}

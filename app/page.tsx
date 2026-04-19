const jamSessions = [
  {
    genre: 'Jazz',
    name: 'Harbour Swing Circle',
    time: '7:30 PM',
    date: 'Wednesday, April 22, 2026',
    location: 'The Lantern Room, Newtown, Sydney',
    frequency: 'Weekly',
    image:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80'
  },
  {
    genre: 'Bluegrass',
    name: 'Southern Cross Pickers',
    time: '6:30 PM',
    date: 'Friday, April 24, 2026',
    location: 'Stringlight Hall, Surry Hills, Sydney',
    frequency: 'Monthly',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    genre: 'Folk',
    name: 'Darlinghurst Folk Fire',
    time: '5:00 PM',
    date: 'Sunday, April 26, 2026',
    location: 'Willow Courtyard, Darlinghurst, Sydney',
    frequency: 'Weekly',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    genre: 'Blues',
    name: 'Midnight Wharf Blues Jam',
    time: '8:00 PM',
    date: 'Saturday, May 2, 2026',
    location: 'Brickhouse Cellar, Pyrmont, Sydney',
    frequency: 'Monthly',
    image:
      'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80'
  },
  {
    genre: 'Fusion',
    name: 'Metro Pulse Collective',
    time: '7:00 PM',
    date: 'Thursday, April 30, 2026',
    location: 'Echo Studio Loft, Chippendale, Sydney',
    frequency: 'Weekly',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="page-header">
        <span className="badge">Mock Jam Sessions</span>
        <h1>Find your next jam in Sydney</h1>
        <p>
          Browse upcoming jam sessions by genre. This list is currently powered by mock data while the database model
          is being prepared.
        </p>
      </section>

      <section className="jam-grid" aria-label="Jam session list">
        {jamSessions.map((session) => (
          <article className="jam-card" key={session.name}>
            <img src={session.image} alt={`${session.genre} musicians jamming`} className="jam-image" />
            <div className="jam-content">
              <p className="genre-tag">{session.genre}</p>
              <h2>{session.name}</h2>
              <ul>
                <li>
                  <strong>Date:</strong> {session.date}
                </li>
                <li>
                  <strong>Time:</strong> {session.time}
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
        ))}
      </section>
    </main>
  );
}

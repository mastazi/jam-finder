import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login');
  }

  return (
    <main>
      <section className="profile-shell clerk-shell">
        <h1>Your profile</h1>
        <p>Manage your account details directly through Clerk.</p>

        <div className="clerk-card-wrap">
          <UserProfile path="/profile" routing="path" />
        </div>
      </section>
    </main>
  );
}

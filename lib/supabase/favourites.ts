import { env } from '@/lib/config/env';

const requireServiceRoleKey = () => {
  if (!env.supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY. Favourites writes must run server-side with the service role key.');
  }

  return env.supabaseServiceRoleKey;
};

type FavouriteJamRow = {
  jam_session_id: number;
};

const buildFavouriteFilterQuery = (clerkUserId: string, jamId?: number) => {
  const params = new URLSearchParams({
    clerk_user_id: `eq.${clerkUserId}`
  });

  if (typeof jamId === 'number') {
    params.set('jam_session_id', `eq.${jamId}`);
  }

  return params.toString();
};

const buildServiceHeaders = () => {
  const serviceRoleKey = requireServiceRoleKey();

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`
  };
};

export const getFavouriteJamIds = async (clerkUserId: string): Promise<number[]> => {
  const query = buildFavouriteFilterQuery(clerkUserId);
  const endpoint = `${env.supabaseUrl}/rest/v1/favourite_jams?select=jam_session_id&${query}`;

  const response = await fetch(endpoint, {
    headers: buildServiceHeaders(),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Failed to load favourites from Supabase: ${response.status}`);
  }

  const rows = (await response.json()) as FavouriteJamRow[];
  return rows.map((row) => row.jam_session_id);
};

export const setFavouriteState = async ({
  clerkUserId,
  jamId,
  shouldBeFavourited
}: {
  clerkUserId: string;
  jamId: number;
  shouldBeFavourited: boolean;
}) => {
  if (shouldBeFavourited) {
    const endpoint = `${env.supabaseUrl}/rest/v1/favourite_jams`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        ...buildServiceHeaders(),
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({
        clerk_user_id: clerkUserId,
        jam_session_id: jamId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to save favourite in Supabase: ${response.status}`);
    }

    return;
  }

  const query = buildFavouriteFilterQuery(clerkUserId, jamId);
  const endpoint = `${env.supabaseUrl}/rest/v1/favourite_jams?${query}`;

  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: buildServiceHeaders()
  });

  if (!response.ok) {
    throw new Error(`Failed to remove favourite from Supabase: ${response.status}`);
  }
};

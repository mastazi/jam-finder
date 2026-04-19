import { createSupabaseServerClient } from '@/lib/supabase/server';

export type JamSession = {
  id: number;
  genre: string;
  name: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  frequency: string;
  imageUrl: string;
};

type JamSessionRow = {
  id: number;
  genre: string;
  name: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  frequency: string;
  image_url: string;
};

const mapJamSession = (row: JamSessionRow): JamSession => ({
  id: row.id,
  genre: row.genre,
  name: row.name,
  description: row.description,
  eventDate: row.event_date,
  eventTime: row.event_time,
  location: row.location,
  frequency: row.frequency,
  imageUrl: row.image_url
});

export const getJamSessions = async (): Promise<JamSession[]> => {
  const { url, anonKey } = createSupabaseServerClient();

  const endpoint = `${url}/rest/v1/jam_sessions?select=id,genre,name,description,event_date,event_time,location,frequency,image_url&order=event_date.asc,event_time.asc`;

  const response = await fetch(endpoint, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Failed to load jam sessions from Supabase: ${response.status}`);
  }

  const data = (await response.json()) as JamSessionRow[];
  return data.map(mapJamSession);
};

export const getJamSessionById = async (id: number): Promise<JamSession | null> => {
  const { url, anonKey } = createSupabaseServerClient();

  const endpoint = `${url}/rest/v1/jam_sessions?select=id,genre,name,description,event_date,event_time,location,frequency,image_url&id=eq.${id}&limit=1`;

  const response = await fetch(endpoint, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Failed to load jam session from Supabase: ${response.status}`);
  }

  const data = (await response.json()) as JamSessionRow[];
  const row = data[0];

  if (!row) {
    return null;
  }

  return mapJamSession(row);
};

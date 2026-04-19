export const SESSION_KEY = 'jam-finder-supabase-token';
export const SESSION_EVENT = 'jam-finder-session-changed';

export const notifySessionChanged = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(SESSION_EVENT));
};

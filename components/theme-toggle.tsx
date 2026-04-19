'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'jam-finder-theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const nextTheme = getInitialTheme();
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-switch"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark and light mode"
      title={isDark ? 'Dark mode enabled' : 'Light mode enabled'}
    >
      <span className="theme-switch-track" aria-hidden>
        <span className="theme-switch-icon">{isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  );
}

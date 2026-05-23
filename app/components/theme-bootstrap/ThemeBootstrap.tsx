'use client';

import { useEffect } from 'react';

type ThemePreference = 'light' | 'dark' | 'system';

const storageKey = 'janjdev-theme';

function resolveTheme(preference: ThemePreference) {
  if (preference === 'light' || preference === 'dark') {
    return preference;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeBootstrap() {
  useEffect(() => {
    try {
      const root = document.documentElement;
      const storedTheme = localStorage.getItem(storageKey);
      const preference: ThemePreference = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : 'system';
      const resolvedTheme = resolveTheme(preference);

      root.dataset.theme = resolvedTheme;
      root.dataset.themePreference = preference;
      root.classList.toggle('dark', resolvedTheme === 'dark');
    } catch {
      // Ignore storage or matchMedia failures and fall back to CSS defaults.
    }
  }, []);

  return null;
}
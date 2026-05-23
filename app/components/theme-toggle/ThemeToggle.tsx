'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const storageKey = 'janjdev-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference;
}

function getInitialPreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
    return storedTheme;
  }

  return 'system';
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const theme = resolveTheme(preference);
  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  root.classList.toggle('dark', theme === 'dark');
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [preference, setPreference] = useState<ThemePreference>(getInitialPreference);

  useEffect(() => {
    localStorage.setItem(storageKey, preference);
    applyTheme(preference);

    if (preference !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, [preference]);

  const preferenceOrder: ThemePreference[] = ['system', 'light', 'dark'];
  const nextPreference = preferenceOrder[(preferenceOrder.indexOf(preference) + 1) % preferenceOrder.length];
  const themeLabel = preference === 'system' ? 'Automatic' : preference === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      type="button"
      onClick={() => setPreference(nextPreference)}
      aria-label={`Theme: ${themeLabel}. Activate to switch to ${nextPreference === 'system' ? 'automatic' : nextPreference} theme.`}
      title={`Theme: ${themeLabel}`}
      className={`${styles.button} ${compact ? styles.compact : styles.default}`}
      data-theme-state={preference}
    >
      <span className={styles.iconWrap} aria-hidden="true" key={preference}>
        {preference === 'light' ? <SunIcon /> : preference === 'dark' ? <MoonIcon /> : <AutoIcon />}
      </span>
      <span className="sr-only" suppressHydrationWarning>{themeLabel}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M16.2 14.8A6.6 6.6 0 0 1 9.2 7.8a7 7 0 1 0 7 7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6.5h16v10H4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 19h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 16.5V19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';
import SunIcon from '../../assets/sun.svg';
import MoonIcon from '../../assets/moon.svg';
import AutoIcon from '../../assets/auto.svg';

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
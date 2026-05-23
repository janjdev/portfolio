'use client';

import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type ThemeAsset = string | SvgComponent;

type Props = {
  lightSrc: ThemeAsset;
  darkSrc: ThemeAsset;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

export default function ThemeImage({ lightSrc, darkSrc, alt = '', className = '', width, height }: Props) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'light';
    const root = document.documentElement;
    const pref = (root.dataset.themePreference as string) || root.dataset.theme || 'system';
    if (pref === 'light' || pref === 'dark') return pref as Theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    function resolve() {
      const pref = (root.dataset.themePreference as string) || root.dataset.theme || 'system';
      if (pref === 'light' || pref === 'dark') {
        setTheme(pref as Theme);
        return;
      }
      setTheme(mq.matches ? 'dark' : 'light');
    }

    // watch for manual storage changes (other tabs)
    function onStorage(e: StorageEvent) {
      if (e.key === 'janjdev-theme') resolve();
    }

    // prefer modern addEventListener on MediaQueryList
    function onMQ() {
      // only update when preference is system
      const pref = (root.dataset.themePreference as string) || root.dataset.theme || 'system';
      if (pref === 'system') setTheme(mq.matches ? 'dark' : 'light');
    }

    // observe dataset changes on html (theme toggles set dataset.theme/dataset.themePreference)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && (m as MutationRecord).attributeName === 'data-theme' || (m as MutationRecord).attributeName === 'data-theme-preference' || (m as MutationRecord).attributeName === 'class') {
          resolve();
          break;
        }
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-theme-preference', 'class'] });

    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onMQ);
    else mq.addListener(onMQ);

    window.addEventListener('storage', onStorage);

    // initial resolve in case state changed before mount
    resolve();

    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', onMQ);
      else mq.removeListener(onMQ);
      window.removeEventListener('storage', onStorage);
      observer.disconnect();
    };
  }, []);

  const src = theme === 'dark' ? darkSrc : lightSrc;

  if (typeof src !== 'string') {
    const Svg = src;

    return <Svg className={className} width={width} height={height} aria-label={alt} role={alt ? 'img' : 'presentation'} focusable="false" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} width={width} height={height} />
  );
}

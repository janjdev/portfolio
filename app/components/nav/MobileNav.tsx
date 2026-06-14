'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { navItems } from './navItems';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import EmailSection from '../email-section/EmailSection';
import Socials from '../socials/Socials';
import styles from './MobileNav.module.css';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

const navLinks = navItems.map(item => ({
  label: item.name,
  href: item.href,
}));

  useEffect(() => {
    if (isOpen) {
      // focus the close button when panel opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);

      // scroll active item into view
      const active = panelRef.current?.querySelector(`.${styles.navItemActive}`) as HTMLElement | null;
      if (active && typeof active.scrollIntoView === 'function') {
        active.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // return focus to the toggle button when closed
      toggleButtonRef.current?.focus();
    }
  }, [isOpen]);

  // focus trap and keyboard handlers
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className={`${styles['mobileHeader']} flex md:hidden items-center justify-between w-full`}>
      <div className='header-controls w-full flex items-center justify-between p-4 fixed top-0 left-0 z-[80] bg-[color:var(--background)] '>
        <div className="flex items-baseline gap-1 w-full">
          <span className="text-4xl font-black leading-none tracking-tight text-[color:var(--primary-text)]">JJ</span>
          <span className="w-1.5 h-1.5 rounded-full --accent" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <button
            ref={toggleButtonRef}
            onClick={toggleMenu}
            className="relative z-[70] p-2 focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span
                className={`absolute left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-[var(--primary-text)] transition-all duration-300 origin-center ${
                  isOpen ? 'top-1/2 rotate-45 -translate-y-1/2' : 'top-[4px]'
                }`}
              />
              <span
                className={`absolute left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-[var(--primary-text)] transition-all duration-300 origin-center ${
                  isOpen ? 'top-1/2 opacity-0 -translate-y-1/2' : 'top-1/2 opacity-100 -translate-y-1/2'
                }`}
              />
              <span
                className={`absolute left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-[var(--primary-text)] transition-all duration-300 origin-center ${
                  isOpen ? 'top-1/2 -rotate-45 -translate-y-1/2' : 'bottom-[4px]'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
      <div className='nav-overlay'>
        <nav className="md:hidden">
          <div ref={panelRef} className={`${styles.mobilePanel} ${isOpen ? styles.open : ''} h-screen flex-col justify-between`} aria-hidden={!isOpen}>
            <ul className={styles.navList}>
              {navLinks.map((link, idx) => {
                const index = String(idx + 1).padStart(2, '0');
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <li key={link.href} className={`${styles.navItem} cursor-pointer ${isActive ? styles.navItemActive : ''}`}>
                    <Link href={link.href} className="flex w-full items-center justify-between gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                      <span className={styles.navIndex}>{index}</span>
                        <span className={styles.navLabel}>{link.label}</span>
                      </div>
                      <span className={styles.dot} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="text-xs text-[color:var(--muted-text)] mt-10">
              <Socials direction="row" />
            </div>
            <EmailSection className="mt-10" />
          </div>
        </nav>
      </div>  
    </header>
  );
}

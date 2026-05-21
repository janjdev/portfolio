'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { navItems } from './navItems';
import GitHubIcon from "../../assets/git.svg";
import LinkedInIcon from "../../assets/linkedin.svg";
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
    <header className={`${styles['mobileHeader']} flex md:hidden items-center justify-between p-4`}>
      <div className="flex items-baseline gap-1 w-full">
        <span className="text-4xl font-black leading-none tracking-tight">JJ</span>
        <span className="w-1.5 h-1.5 rounded-full --accent" />
      </div>
      {/* Toggle Button */}
        <button
          ref={toggleButtonRef}
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span
              className={`absolute left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-black transition-all duration-300 origin-center ${
                isOpen ? 'top-1/2 rotate-45 -translate-y-1/2' : 'top-[4px]'
              }`}
            />
            <span
              className={`absolute left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-black transition-all duration-300 origin-center ${
                isOpen ? 'top-1/2 opacity-0 -translate-y-1/2' : 'top-1/2 opacity-100 -translate-y-1/2'
              }`}
            />
            <span
              className={`absolute left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-black transition-all duration-300 origin-center ${
                isOpen ? 'top-1/2 -rotate-45 -translate-y-1/2' : 'bottom-[4px]'
              }`}
            />
          </div>
        </button>
      <nav className="md:hidden">
        <div ref={panelRef} className={`${styles.mobilePanel} ${isOpen ? styles.open : ''} h-screen flex-col justify-between`} aria-hidden={!isOpen}>
          <ul className={styles.navList}>
            {navLinks.map((link, idx) => {
              const index = String(idx + 1).padStart(2, '0');
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <li key={link.href} className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <span className={styles.navIndex}>{index}</span>
                    <Link href={link.href} className={styles.navLabel} onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  </div>
                  <span className={styles.dot} />
                </li>
              );
            })}
          </ul>
          <div className="text-xs text-black/40 mt-10 ">
            <div className="socials  flex flex-row gap-6 justify-center">
              <div className="text-black/50 hover:text-[#FF2D75] transition-colors duration-200">
                <a href="https://github.com/janjdev" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon alt="GitHub" className="inline w-10 h-10 mr-1 hover:fill-[#FF2D75] transition-colors duration-200" width={16} height={16} />
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/janjdev/" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon alt="LinkedIn" className="inline w-10 h-10 mr-1 hover:fill-[#FF2D75] transition-colors duration-200" width={16} height={16} />
                </a>
              </div>
            </div>
          </div>
          <div className={`flex justify-center items-baseline mt-10 ${styles.connect}`}> 
            <span className={`mr-3 ${styles.dot}`} />
            <div> 
              <span className={`${styles.connectLabel} flex`}>Let&apos;s Connect</span>
              <Link href="mailto:hello@janj.dev" className={`text-black/80 hover:text-[#FF2D75] tracking-[-0.01em] transition-colors duration-200 ${styles.connectEmail}`}>
              hello@janj.dev
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

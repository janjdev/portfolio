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
    <header className={`${styles['mobileHeader']} flex md:hidden items-center justify-between p-4 border-b border-black/10`}>
      <div className="flex items-baseline gap-1 w-full">
        <span className="text-4xl font-black leading-none tracking-tight">JJ</span>
        <span className="w-1.5 h-1.5 rounded-full --accent" />
      </div>
      {/* Hamburger Button */}
        <button
          ref={toggleButtonRef}
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                isOpen ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                isOpen ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </div>
        </button>
      <nav className="md:hidden">
        <div ref={panelRef} className={`${styles.mobilePanel} ${isOpen ? styles.open : ''} h-screen flex-col justify-between`} aria-hidden={!isOpen}>
          <button
            ref={closeButtonRef}
            onClick={toggleMenu}
            className={`${styles.panelClose} p-2 focus:outline-none`}
            aria-label="Close menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="h-0.5 w-6 bg-black rotate-45" />
              <span className="h-0.5 w-6 bg-black -rotate-45" />
            </div>
          </button>

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
          <div className="text-xs text-black/40 mt-20">
            <div className="socials  flex flex-row gap-6 ">
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
          <div className="flex-1"> 
            <span className={styles.dot} />
          </div>
        </div>
      </nav>
    </header>
  );
}

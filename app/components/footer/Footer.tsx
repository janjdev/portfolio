import Socials from '../socials/Socials';
import styles from './Footer.module.css';

type FooterProps = {
  variant: 'sidebar' | 'page';
  className?: string;
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m5 7 7 6 7-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 3.5h6.5L19 9v11.5A1.5 1.5 0 0 1 17.5 22h-10A1.5 1.5 0 0 1 6 20.5v-15A1.5 1.5 0 0 1 7.5 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.5 3.5V9H19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer({ variant, className }: FooterProps) {
  const variantClass = variant === 'sidebar' ? styles.sidebar : styles.page;
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${variantClass} ${className || ''}`}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <span className={styles.dot} />
          <span className={styles.label}>Let&apos;s Connect</span>
        </div>

        <Socials direction="row" size="sm" />

        <div className={styles.divider} />

        <a className={styles.contactRow} href="mailto:hello@janj.dev">
          <span className={styles.iconWrap}>
            <MailIcon />
          </span>
          <span className={styles.contactText}>hello@janj.dev</span>
        </a>

        <a className={styles.linkRow} href="/resume.pdf" download>
          <span className={styles.iconWrap}>
            <DocumentIcon />
          </span>
          <span className={styles.linkText}>Download Resume</span>
          <span className={styles.linkArrow}>
            <ArrowIcon />
          </span>
        </a>

        <div className={styles.divider} />

        <p className={styles.copy}>© {year} Janjdev. All rights reserved.</p>
      </div>
    </footer>
  );
}

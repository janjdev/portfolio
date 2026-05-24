import Socials from '../socials/Socials';
import styles from './Footer.module.css';
import ThemeImage from "../theme-image/ThemeImage";
import MailIcon from '../../assets/mail.svg';
import DocumentIcon from '../../assets/document.svg';
import ArrowIcon from '../../assets/arrow-right.svg';


type FooterProps = {
  variant: 'sidebar' | 'page';
  className?: string;
};

export default function Footer({ variant, className }: FooterProps) {
  const variantClass = variant === 'sidebar' ? styles.sidebar : styles.page;
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${variantClass} ${className || ''}`}>
      <div className={styles.inner}>
        <div className="flex justify-between items-end">
            <div>
                <div className={`${styles.headingRow}`}>
                    <span className={styles.dot} />
                    <span className={styles.label}>Let&apos;s Connect</span>
                </div>
                <Socials direction="row" size="sm" />
            </div>
            <div className="relative w-15 h-15 pointer-events-all rounded-full border-2 border-[color:var(--primary-text)] background-[color:var(--background)] ">
                <ThemeImage
                    lightSrc="/logo-light.svg"
                    darkSrc="/logo-dark.svg"
                    alt="Janjdev Logo"
                    className="mx-w-full h-full absolute mx-auto left-0 top-0"
                />
            </div>
        </div>
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

        <p className={styles.copy}>© {year} janjdev. All rights reserved.</p>
      </div>
    </footer>
  );
}

import styles from './EmailSection.module.css';

type EmailSectionProps = {
  className?: string;
};

export default function EmailSection({ className = '' }: EmailSectionProps) {
  return (
    <a href="mailto:hello@janj.dev" className={`${className} ${styles.connect}`}>
      <span className={`mr-3 ${styles.dot}`} />
      <div>
        <span className={`${styles.connectLabel} flex`}>Let&apos;s Connect</span>
        <span className={`text-[color:var(--primary-text)] hover:text-[#FF2D75] tracking-[-0.01em] transition-colors duration-200 ${styles.connectEmail}`}>
          hello@janj.dev
        </span>
      </div>
    </a>
  );
}
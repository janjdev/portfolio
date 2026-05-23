import GitHubIcon from '../../assets/git.svg';
import LinkedInIcon from '../../assets/linkedin.svg';
import styles from './Socials.module.css';

type SocialsProps = {
  direction?: 'column' | 'row';
  size?: 'sm' | 'md';
  className?: string;
};


export default function Socials({ direction = 'column', size = 'md', className = '' }: SocialsProps) {
  const directionClass = direction === 'row' ? styles.row : styles.column;
  const sizeClass = size === 'sm' ? styles.small : styles.medium;


  return (
    <div className={`${styles.socials} ${directionClass} ${sizeClass} ${className}`}>
      <a
        href="https://github.com/janjdev"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="GitHub"
      >
        <GitHubIcon alt="GitHub" className={styles.socialIcon} width={16} height={16} />
      </a>
      <a
        href="https://www.linkedin.com/in/janjdev/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
        aria-label="LinkedIn"
      >
        <LinkedInIcon alt="LinkedIn" className={styles.socialIcon} width={16} height={16} />
      </a>
    </div>
  );
}

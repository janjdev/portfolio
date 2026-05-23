'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from './navItems';
import styles from './Nav.module.css';



export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 text-sm font-medium text-[color:var(--muted-text)]">
      <ul className="space-y-14">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <li className="flex items-center gap-6 cursor-pointer" key={item.href}>
              <Link
                href={item.href}
                className={`${styles['item-hover']} text-[color:var(--muted-text)] active:text-[color:var(--primary-text)] flex w-full items-center gap-6 cursor-pointer ${styles['navLink']} ${isActive ? styles['item-active'] : ''}`}
              >
                <span>0{i + 1}</span>
                <div className="flex-1">{item.name}</div>
                <span className={`${styles.dot} w-1.5 h-1.5 rounded-full dot`} />
              </Link>
            </li>
          );
        })} 
      </ul>
    </nav>
  );
}
import { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const links = [
  {
    title: '📝 Notes',
    description: 'All the notes I take while studying and working',
    href: '/docs/intro',
  },
  {
    title: '📦 Blog',
    description: 'Thoughts, guides, and whatever is on my mind',
    href: '/blog',
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.links}>
      {links.map((link) => (
        <Link key={link.title} to={link.href} className={styles.linkCard}>
          <h3 className={styles.linkTitle}>{link.title}</h3>
          <p className={styles.linkDesc}>{link.description}</p>
          <span className={styles.linkArrow}>→</span>
        </Link>
      ))}
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function BouncingAvatar({ onBounce }: { onBounce: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const bounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const impactRef = useRef(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const size = 120;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = -size;
    let y = vh * 0.2 + Math.random() * vh * 0.4;
    let dx = 0.6 + Math.random() * 0.4;
    let dy = 0.5 + Math.random() * 0.5;
    let rotation = 0;
    let running = true;

    img.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    function frame() {
      if (!running) return;

      x += dx;
      y += dy;
      rotation = (rotation + 1.5) % 360;

      let hit = false;

      if (x < 0) { x = 0; dx = Math.abs(dx); hit = true; }
      if (x + size > vw) { x = vw - size; dx = -Math.abs(dx); hit = true; }
      if (y < 0) { y = 0; dy = Math.abs(dy); hit = true; }
      if (y + size > vh) { y = vh - size; dy = -Math.abs(dy); hit = true; }

      if (hit && !impactRef.current) {
        impactRef.current = true;
        img.classList.add(styles.bounceImpact);
        if (bounceTimer.current) clearTimeout(bounceTimer.current);
        bounceTimer.current = setTimeout(() => {
          img.classList.remove(styles.bounceImpact);
          impactRef.current = false;
        }, 250);
      }

      img.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    return () => { running = false; };
  }, []);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <img
      ref={imgRef}
      src="/img/me-nobg.png"
      alt="Mars avatar"
      className={styles.bouncingAvatar}
      onClick={onBounce}
    />,
    document.body
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [booted, setBooted] = useState(false);

  function handleAvatarClick() {
    setBooted(true);
    setTimeout(() => setBooted(false), 3200);
  }

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title.split(',')[0]}
            <br />
            <span className={styles.heroTitleAccent}>
              {siteConfig.title.split(',')[1]?.trim() ?? 'all the notes'}
            </span>
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        </div>

        {booted && (
          <div className={styles.glitch}>
            <div className={styles.glitchLayer} data-text="OUCH!! STOP IT!" />
            <div className={styles.glitchLayer} data-text="OUCH!! STOP IT!" />
            <div className={styles.glitchLayer} data-text="OUCH!! STOP IT!" />
          </div>
        )}
      </section>

      <main>
        <HomepageFeatures />
      </main>

      <BouncingAvatar onBounce={handleAvatarClick} />
    </Layout>
  );
}

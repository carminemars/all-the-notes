import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Layout from '@theme-original/Layout';

import 'mouse-follower/dist/mouse-follower.min.css';

export default function LayoutWrapper({ children, ...props }: { children: ReactNode }) {
  useEffect(() => {
    let cursor: any;
    let currentLink: Element | null = null;

    function onOver(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a, button, [role="button"]');
      if (link && link !== currentLink) {
        currentLink = link;
        cursor.addState('text');
      }
    }

    function onOut(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a, button, [role="button"]');
      if (link && link === currentLink) {
        const related = e.relatedTarget as HTMLElement;
        if (!related || !link.contains(related)) {
          currentLink = null;
          cursor.removeState('text');
        }
      }
    }

    async function init() {
      const MouseFollower = (await import('mouse-follower')).default;
      const gsap = (await import('gsap')).default;
      MouseFollower.registerGSAP(gsap);
      cursor = new MouseFollower({ speed: 0.3 });

      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);
    }

    init();

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cursor?.destroy();
    };
  }, []);

  return (
    <Layout {...props}>
      {children}
    </Layout>
  );
}

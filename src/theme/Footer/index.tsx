import { useThemeConfig } from '@docusaurus/theme-common';
import FooterCopyright from '@theme/Footer/Copyright';

export default function Footer() {
  const { footer } = useThemeConfig();
  if (!footer) return null;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__section">
          <FooterCopyright copyright={footer.copyright ?? ''} />
        </div>
        <div className="footer__section footer__section--right">
          <a
            href="https://github.com/carminemars"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__github"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

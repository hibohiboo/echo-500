import type { ParentComponent } from 'solid-js';

const Footer: ParentComponent = () => (
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="footer-text">
          Echo:500 - A world where synthetic beings explore the ruins of
          civilization
        </p>
      </div>
      <div class="footer-right">
        <nav class="footer-nav">
          <a href="/privacy">Privacy Policy</a>
          <span class="separator">|</span>
          <a href="/terms">Terms of Service</a>
          <span class="separator">|</span>
          <a
            href="https://x.com/hibohiboo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </nav>
      </div>
    </div>
    <style>
      {`
    @scope {
          /* Footer */
        .site-footer {
          background: rgba(13, 13, 13, 0.9);
          border-top: 1px solid var(--color-nature-secondary);
          padding: var(--spacing-lg);
          backdrop-filter: blur(10px);
        }

        .footer-content {
          max-width: var(--content-max-width);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .footer-text {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .footer-nav {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
          font-size: 0.85rem;
        }

        .footer-nav a {
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .footer-nav a:hover {
          color: var(--color-cyber-primary);
        }

        .separator {
          color: var(--color-ruin-steel);
        }
    }
  `}
    </style>
  </footer>
);
export default Footer;

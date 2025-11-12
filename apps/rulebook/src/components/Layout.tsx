import type { ParentComponent } from 'solid-js';

const Layout: ParentComponent = (props) => {
  return (
    <div class="app-container">
      <div class="layout-background">
        <div class="ivy-overlay"></div>
        <div class="ruin-texture"></div>
      </div>

      <div class="layout-content">
        <header class="site-header">
          <div class="header-content">
            <div class="header-left">
              <a href="/" class="site-logo">
                <span class="logo-text">Echo:</span>
                <span class="logo-number">500</span>
              </a>
              <div class="site-subtitle">Post-Apocalyptic TRPG Rulebook</div>
            </div>
            <div class="header-right">
              <div class="status-indicator">
                <span class="status-dot"></span>
                <span class="status-text">SYSTEM ACTIVE</span>
              </div>
            </div>
          </div>
        </header>

        <main class="site-main">{props.children}</main>

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
        </footer>
      </div>

      <style>{`
        .app-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
        }

        .layout-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        /* Ivy Overlay - Nature reclaiming */
        .ivy-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(75, 124, 44, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(107, 156, 66, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(45, 80, 22, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Ruin Texture - Concrete cracks */
        .ruin-texture {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(58, 58, 58, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58, 58, 58, 0.05) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: 0.3;
          pointer-events: none;
        }

        .layout-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Header */
        .site-header {
          height: var(--header-height);
          background: rgba(13, 13, 13, 0.9);
          border-bottom: 2px solid var(--color-cyber-primary);
          box-shadow: 0 0 20px var(--color-cyber-glow);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: var(--content-max-width);
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .site-logo {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          text-decoration: none;
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
          transition: all var(--transition-normal);
        }

        .logo-text {
          color: var(--color-cyber-primary);
          text-shadow: 0 0 10px var(--color-cyber-glow);
        }

        .logo-number {
          color: var(--color-nature-accent);
          text-shadow: 0 0 10px rgba(107, 156, 66, 0.5);
        }

        .site-logo:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        .site-subtitle {
          font-family: var(--font-primary);
          font-size: 0.75rem;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .header-right {
          display: flex;
          align-items: center;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-family: var(--font-primary);
          font-size: 0.7rem;
          color: var(--color-cyber-primary);
          letter-spacing: 0.05em;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-cyber-primary);
          box-shadow: 0 0 10px var(--color-cyber-primary);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(0.9);
          }
        }

        .status-text {
          opacity: 0.8;
        }

        /* Main Content */
        .site-main {
          flex: 1;
          padding: var(--spacing-2xl) var(--spacing-lg);
          max-width: var(--content-max-width);
          width: 100%;
          margin: 0 auto;
        }

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

        /* Responsive */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            height: auto;
            padding: var(--spacing-sm) var(--spacing-md);
            gap: var(--spacing-sm);
          }

          .site-header {
            height: auto;
          }

          .header-left {
            flex-direction: column;
            gap: var(--spacing-xs);
            align-items: flex-start;
          }

          .site-subtitle {
            font-size: 0.65rem;
          }

          .status-indicator {
            font-size: 0.65rem;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-sm);
          }

          .footer-nav {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;

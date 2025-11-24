export function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="header-left">
          <a href={`/${BASE_PATH}/`} className="site-logo">
            <span className="logo-text">Echo:</span>
            <span className="logo-number">500</span>
          </a>
          <div className="site-subtitle">Post-Apocalyptic TRPG Rulebook</div>
        </div>
        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>
      <style>
        {`
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

        /* Responsive */
        @media (max-width: 768px) {
          .header-content {
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .site-header {
            height: var(--header-height);
          }

          .header-left {
            gap: 0;
          }

          .site-logo {
            font-size: 1.5rem;
          }

          /* スマホ時は非表示 */
          .site-subtitle {
            display: none;
          }

          .status-indicator {
            font-size: 0.6rem;
          }

          .status-dot {
            width: 6px;
            height: 6px;
          }
        }
      `}
      </style>
    </header>
  );
}

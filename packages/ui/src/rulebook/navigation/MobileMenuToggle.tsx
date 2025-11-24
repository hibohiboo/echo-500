interface MobileMenuToggleProps {
  onClick: () => void;
}

export function MobileMenuToggle({ onClick }: MobileMenuToggleProps) {
  return (
    <button className="mobile-menu-toggle" onClick={onClick} aria-label="Toggle mobile menu">
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>

      <style>{`
        .mobile-menu-toggle {
          display: none;
          position: fixed;
          top: var(--spacing-md);
          left: var(--spacing-md);
          z-index: 1000;
          width: 40px;
          height: 40px;
          background: var(--bg-secondary);
          border: var(--border-cyber);
          border-radius: 4px;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          transition: all var(--transition-normal);
        }

        .mobile-menu-toggle:hover {
          background: var(--bg-tertiary);
          box-shadow: var(--shadow-cyber);
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: var(--color-cyber-primary);
          transition: all var(--transition-fast);
        }

        @media (max-width: 1024px) {
          .mobile-menu-toggle {
            display: flex;
          }
        }
      `}</style>
    </button>
  );
}

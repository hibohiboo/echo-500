interface MobileMenuToggleProps {
  onClick: () => void;
  ariaLabel?: string;
}

export function MobileMenuToggle(props: MobileMenuToggleProps) {
  return (
    <button
      class="mobile-menu-toggle"
      onClick={props.onClick}
      aria-label={props.ariaLabel || 'Toggle navigation menu'}
    >
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <style>{`
        @scope {
          .mobile-menu-toggle {
            display: flex;
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            background: var(--bg-secondary);
            border: var(--border-cyber);
            border-radius: 4px;
            width: 44px;
            height: 44px;
            cursor: pointer;
            transition: all var(--transition-fast);
          }

          .mobile-menu-toggle:hover {
            background: var(--bg-tertiary);
            box-shadow: var(--shadow-cyber);
          }

          .hamburger-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 100%;
            height: 100%;
          }

          .hamburger-icon span {
            display: block;
            width: 20px;
            height: 2px;
            background: var(--color-cyber-primary);
            transition: all var(--transition-fast);
          }
        }
      `}</style>
    </button>
  );
}

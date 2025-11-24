import type { ReactNode } from 'react';

interface NavSectionProps {
  label: string;
  children: ReactNode;
  open?: boolean;
}

export function NavSection({ label, children, open }: NavSectionProps) {
  return (
    <details className="nav-details" open={open}>
      <summary className="nav-summary">
        <span className="nav-section-icon">▶</span>
        <span className="nav-section-label">{label}</span>
      </summary>
      <ul className="nav-sublist">{children}</ul>

      <style>{`
        .nav-details {
          margin: 0;
        }

        .nav-summary {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          color: var(--text-primary);
          font-family: var(--font-primary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          list-style: none;
          user-select: none;
          outline: none;
        }

        .nav-summary:focus-visible {
          outline: 2px solid var(--color-cyber-primary);
          outline-offset: 2px;
        }

        .nav-summary::-webkit-details-marker {
          display: none;
        }

        .nav-summary::marker {
          display: none;
        }

        .nav-summary:hover {
          color: var(--color-nature-accent);
          background: rgba(107, 156, 66, 0.05);
          outline: 2px solid var(--color-cyber-primary);
          outline-offset: 2px;
        }

        .nav-section-icon {
          font-size: 0.7rem;
          color: var(--color-nature-accent);
          transition: transform var(--transition-fast);
          display: inline-block;
        }

        .nav-details[open] .nav-section-icon {
          transform: rotate(90deg);
        }

        .nav-section-label {
          flex: 1;
        }

        .nav-sublist {
          list-style: none;
          margin: 0;
          padding: 0;
          padding-left: var(--spacing-lg);
          margin-top: var(--spacing-xs);
          border-left: 1px solid var(--color-nature-secondary);
          margin-left: var(--spacing-md);
        }
      `}</style>
    </details>
  );
}

interface CommandCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function CommandCard(props: CommandCardProps) {
  return (
    <button
      className={`command-card ${
        props.disabled ? 'command-card--disabled' : ''
      } ${props.selected ? 'command-card--selected' : ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="command-card__header">
        <h3 className="command-card__title">{props.title}</h3>
      </div>
      <p className="command-card__description">{props.description}</p>

      <style>{`
        .command-card {
          position: relative;
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid var(--color-nature-secondary);
          border-radius: 8px;
          padding: var(--spacing-lg);
          cursor: pointer;
          transition: all var(--transition-normal);
          text-align: left;
          width: 100%;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .command-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 204, 0.1),
            transparent
          );
          transition: left var(--transition-normal);
        }

        .command-card:hover::before {
          left: 100%;
        }

        .command-card:hover {
          border-color: var(--color-cyber-primary);
          box-shadow: 0 0 20px var(--color-cyber-glow);
          transform: translateY(-4px);
        }

        .command-card:active {
          transform: translateY(-2px);
        }

        .command-card--selected {
          border-color: var(--color-cyber-primary);
          background: rgba(0, 255, 204, 0.1);
          box-shadow: 0 0 20px var(--color-cyber-glow);
        }

        .command-card--disabled {
          opacity: 0.5;
          cursor: not-allowed;
          border-color: var(--color-ruin-steel);
        }

        .command-card--disabled:hover {
          transform: none;
          box-shadow: none;
          border-color: var(--color-ruin-steel);
        }

        .command-card--disabled::before {
          display: none;
        }

        .command-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
        }

        .command-card__title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: var(--color-cyber-primary);
          margin: 0;
          text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
        }

        .command-card--selected .command-card__title {
          color: var(--color-cyber-primary);
          text-shadow: 0 0 12px rgba(0, 255, 204, 0.8);
        }

        .command-card--disabled .command-card__title {
          color: var(--text-tertiary);
          text-shadow: none;
        }

        .command-card__description {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        .command-card--disabled .command-card__description {
          color: var(--text-tertiary);
        }
      `}</style>
    </button>
  );
}

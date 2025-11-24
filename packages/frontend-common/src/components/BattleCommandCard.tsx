import { useState } from 'react';
import type { BattleCommandCardProps } from '../types/battleCommand';

export function BattleCommandCard(props: BattleCommandCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="battle-command-card" onClick={props.onClick}>
      <div className="battle-command-card__border">
        <div className="battle-command-card__header">
          <h3 className="battle-command-card__name">{props.name}</h3>
          <span className="battle-command-card__cp">CP {props.cp}</span>
        </div>

        <div className="battle-command-card__grid">
          <div className="battle-command-card__field">
            <span className="battle-command-card__label">タイミング</span>
            <span className="battle-command-card__value">{props.timing}</span>
          </div>
          <div className="battle-command-card__field">
            <span className="battle-command-card__label">対象</span>
            <span className="battle-command-card__value">{props.target}</span>
          </div>
          <div className="battle-command-card__field">
            <span className="battle-command-card__label">射程</span>
            <span className="battle-command-card__value">{props.range}</span>
          </div>
          <div className="battle-command-card__field">
            <span className="battle-command-card__label">コスト</span>
            <span className="battle-command-card__value">{props.cost}</span>
          </div>
        </div>

        <div className="battle-command-card__effect">
          <span className="battle-command-card__label">効果</span>
          <p className="battle-command-card__effect-text">{props.effect}</p>
        </div>

        {props.flavor && (
          <div className="battle-command-card__flavor">
            <p className="battle-command-card__flavor-text">"{props.flavor}"</p>
          </div>
        )}

        {props.tags.length > 0 && (
          <div className="battle-command-card__tags">
            {props.tags.map((tag, index) => (
              <span key={index} className="battle-command-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {props.details && (
          <>
            <button
              className="battle-command-card__toggle"
              onClick={toggleExpand}
              type="button"
            >
              {isExpanded ? '詳細を閉じる ▲' : '詳細を開く ▼'}
            </button>

            {isExpanded && (
              <div className="battle-command-card__details">
                <span className="battle-command-card__label">詳細</span>
                <p className="battle-command-card__details-text">
                  {props.details}
                </p>
              </div>
            )}
          </>
        )}

        <div className="battle-command-card__circuit">
          <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 10 L 20 10 M 30 10 L 50 10 M 60 10 L 80 10 M 90 10 L 100 10"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <circle cx="25" cy="10" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="55" cy="10" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="85" cy="10" r="2" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      </div>

      <style>{`
        .battle-command-card {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .battle-command-card:hover {
          transform: translateY(-4px);
        }

        @scope {
          .battle-command-card__border {
            background: rgba(13, 13, 13, 0.9);
            border: 2px solid var(--color-nature-secondary);
            border-radius: 8px;
            padding: var(--spacing-md);
            position: relative;
            overflow: hidden;
            transition: all var(--transition-normal);
            clip-path: polygon(
              0 0,
              calc(100% - 12px) 0,
              100% 12px,
              100% 100%,
              0 100%
            );
          }

          .battle-command-card:hover .battle-command-card__border {
            border-color: var(--color-cyber-primary);
            box-shadow: 0 0 20px var(--color-cyber-glow);
          }

          .battle-command-card__type-badge {
            position: absolute;
            top: 4px;
            right: 4px;
            font-family: var(--font-primary);
            font-size: 0.65rem;
            color: var(--color-cyber-primary);
            background: rgba(0, 255, 204, 0.2);
            padding: 2px 6px;
            border-radius: 3px;
            letter-spacing: 0.1em;
          }

          .battle-command-card__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--spacing-md);
          }

          .battle-command-card__name {
            font-family: var(--font-heading);
            font-size: 1.1rem;
            color: var(--text-primary);
            margin: 0;
          }

          .battle-command-card__cp {
            font-family: var(--font-primary);
            font-size: 0.75rem;
            color: var(--color-cyber-primary);
            background: rgba(0, 255, 204, 0.1);
            padding: 4px 8px;
            border-radius: 3px;
            border: 1px solid var(--color-cyber-primary);
            letter-spacing: 0.05em;
          }

          .battle-command-card__grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
          }

          .battle-command-card__field {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .battle-command-card__label {
            font-family: var(--font-primary);
            font-size: 0.65rem;
            color: var(--text-tertiary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .battle-command-card__value {
            font-family: var(--font-body);
            font-size: 0.85rem;
            color: var(--text-secondary);
          }

          .battle-command-card__effect {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
            margin-bottom: var(--spacing-md);
            padding: var(--spacing-sm);
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            border-left: 3px solid var(--color-cyber-primary);
          }

          .battle-command-card__effect-text {
            font-family: var(--font-body);
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.6;
          }

          .battle-command-card__flavor {
            margin-bottom: var(--spacing-md);
            padding: var(--spacing-sm);
            background: rgba(139, 92, 246, 0.05);
            border-radius: 4px;
            border-left: 3px solid var(--color-nature-secondary);
          }

          .battle-command-card__flavor-text {
            font-family: var(--font-body);
            font-size: 0.8rem;
            color: var(--text-tertiary);
            font-style: italic;
            margin: 0;
            line-height: 1.5;
          }

          .battle-command-card__tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-xs);
            margin-bottom: var(--spacing-md);
          }

          .battle-command-card__tag {
            font-family: var(--font-primary);
            font-size: 0.65rem;
            color: var(--color-nature-secondary);
            background: rgba(139, 92, 246, 0.1);
            padding: 2px 8px;
            border-radius: 10px;
            border: 1px solid var(--color-nature-secondary);
            letter-spacing: 0.03em;
          }

          .battle-command-card__toggle {
            width: 100%;
            padding: var(--spacing-sm);
            background: rgba(0, 255, 204, 0.05);
            border: 1px solid var(--color-cyber-primary);
            border-radius: 4px;
            color: var(--color-cyber-primary);
            font-family: var(--font-primary);
            font-size: 0.75rem;
            cursor: pointer;
            transition: all var(--transition-normal);
            margin-bottom: var(--spacing-sm);
            letter-spacing: 0.05em;
          }

          .battle-command-card__toggle:hover {
            background: rgba(0, 255, 204, 0.1);
            box-shadow: 0 0 10px rgba(0, 255, 204, 0.3);
          }

          .battle-command-card__details {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
            padding: var(--spacing-md);
            background: rgba(0, 0, 0, 0.4);
            border-radius: 4px;
            border: 1px solid var(--color-cyber-primary);
            animation: slideDown 0.3s ease-out;
            margin-bottom: var(--spacing-sm);
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 500px;
            }
          }

          .battle-command-card__details-text {
            font-family: var(--font-body);
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin: 0;
            line-height: 1.6;
            white-space: pre-wrap;
          }

          .battle-command-card__circuit {
            width: 100%;
            height: 20px;
            color: var(--color-nature-accent);
            opacity: 0.6;
          }

          /* Scan line animation */
          .battle-command-card__border::after {
            content: '';
            position: absolute;
            top: -100%;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              90deg,
              transparent,
              var(--color-cyber-primary),
              transparent
            );
            /* animation: scan 3s ease-in-out infinite; */
          }

          @keyframes scan {
            0% {
              top: -100%;
            }
            50% {
              top: 100%;
            }
            100% {
              top: -100%;
            }
          }
        }
      `}</style>
    </div>
  );
}

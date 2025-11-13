import { InventoryIcon, type InventoryIconType } from '../inventory-icon';

interface InventoryCardProps {
  type: 'command' | 'item' | 'memory';
  name: string;
  icon?: InventoryIconType;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  onClick?: () => void;
}

export function InventoryCard(props: InventoryCardProps) {
  const rarityColors = {
    common: '#6b9c42',
    rare: '#00d4ff',
    epic: '#9d4edd',
    legendary: '#ffd700',
  };

  const typeLabels = {
    command: 'CMD',
    item: 'ITEM',
    memory: 'MEM',
  };

  return (
    <button class="inventory-card" onClick={props.onClick}>
      <div
        class="inventory-card__border"
        style={{
          'border-color': rarityColors[props.rarity || 'common'],
          'box-shadow': `0 0 10px ${rarityColors[props.rarity || 'common']}40`,
        }}
      >
        <div class="inventory-card__type-badge">{typeLabels[props.type]}</div>

        <div class="inventory-card__content">
          {props.icon && (
            <div class="inventory-card__icon">
              <InventoryIcon icon={props.icon} size="medium" />
            </div>
          )}
          <div class="inventory-card__name">{props.name}</div>
        </div>

        <div class="inventory-card__circuit">
          <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 0 10 L 20 10 M 30 10 L 50 10 M 60 10 L 80 10 M 90 10 L 100 10"
              stroke="currentColor"
              stroke-width="1"
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
        .inventory-card {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .inventory-card:hover {
          transform: translateY(-4px);
        }

        @scope {

          .inventory-card__border {
            background: rgba(13, 13, 13, 0.9);
            border: 2px solid;
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

          .inventory-card:hover .inventory-card__border {
            box-shadow: 0 0 20px currentColor !important;
          }

          .inventory-card__type-badge {
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

          .inventory-card__content {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-xs);
          }

          .inventory-card__icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .inventory-card__name {
            font-family: var(--font-heading);
            font-size: 0.9rem;
            color: var(--text-primary);
            text-align: left;
            flex: 1;
          }

          .inventory-card__circuit {
            width: 100%;
            height: 20px;
            color: var(--color-nature-accent);
            opacity: 0.6;
          }

          /* Scan line animation */
          .inventory-card__border::after {
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
            animation: scan 3s ease-in-out infinite;
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
    </button>
  );
}

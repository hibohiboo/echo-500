import { InventoryIcon, type InventoryIconType } from '../inventory-icon';
import type { JSX } from 'solid-js';

interface ItemDetailProps {
  type: 'command' | 'item' | 'memory';
  name: string;
  icon?: InventoryIconType;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  description: JSX.Element | string;
  details?: JSX.Element | string;
  onClose: () => void;
}

export function ItemDetail(props: ItemDetailProps) {
  const rarityColors = {
    common: '#6b9c42',
    rare: '#00d4ff',
    epic: '#9d4edd',
    legendary: '#ffd700',
  };

  const typeLabels = {
    command: 'COMMAND',
    item: 'ITEM',
    memory: 'MEMORY CHIP',
  };
  const { rarity = 'common' } = props;
  const rarityColor = rarityColors[rarity];

  return (
    <div class="item-detail-overlay" onClick={props.onClose}>
      <div class="item-detail" onClick={(e) => e.stopPropagation()}>
        <button class="item-detail__close" onClick={props.onClose}>
          ✕
        </button>

        <div
          class="item-detail__header"
          style={{
            'border-color': rarityColor,
          }}
        >
          <div class="item-detail__type">{typeLabels[props.type]}</div>
          <div class="item-detail__title">
            {props.icon && (
              <span class="item-detail__icon">
                <InventoryIcon icon={props.icon} size="large" />
              </span>
            )}
            <h2>{props.name}</h2>
          </div>
          <div class="item-detail__rarity" style={{ color: rarityColor }}>
            {props.rarity?.toUpperCase()}
          </div>
        </div>

        <div class="item-detail__body">
          <div class="item-detail__section">
            <h3>概要</h3>
            <div class="item-detail__description">{props.description}</div>
          </div>

          {props.details && (
            <div class="item-detail__section">
              <h3>詳細</h3>
              <div class="item-detail__details">{props.details}</div>
            </div>
          )}
        </div>

        <div class="item-detail__footer">
          <div class="item-detail__circuit-lines">
            <svg
              viewBox="0 0 300 40"
              xmlns="http://www.w3.org/2000/svg"
              style="width: 100%; height: 40px;"
            >
              <path
                d="M 0 20 L 50 20 L 60 10 L 80 10 M 100 10 L 120 10 L 130 20 L 150 20"
                stroke={rarityColor}
                stroke-width="1.5"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M 150 20 L 200 20 L 210 30 L 230 30 M 250 30 L 270 30 L 280 20 L 300 20"
                stroke={rarityColor}
                stroke-width="1.5"
                fill="none"
                opacity="0.5"
              />
              <circle cx="90" cy="10" r="3" fill={rarityColor} />
              <circle cx="140" cy="20" r="3" fill={rarityColor} />
              <circle cx="240" cy="30" r="3" fill={rarityColor} />
            </svg>
          </div>
        </div>

        <style>{`
          .item-detail-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
            backdrop-filter: blur(4px);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .item-detail {
            background: rgba(13, 13, 13, 0.95);
            border: 2px solid var(--color-cyber-primary);
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            animation: slideUp 0.4s ease;
            box-shadow: 0 0 40px var(--color-cyber-glow);
            position: relative;
          }

          @keyframes slideUp {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @scope {

            .item-detail__close {
              position: absolute;
              top: var(--spacing-md);
              right: var(--spacing-md);
              background: transparent;
              border: none;
              color: var(--text-tertiary);
              font-size: 1.5rem;
              cursor: pointer;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
              transition: all var(--transition-fast);
              z-index: 10;
            }

            .item-detail__close:hover {
              background: rgba(255, 255, 255, 0.1);
              color: var(--text-primary);
            }

            .item-detail__header {
              border-bottom: 2px solid;
              padding: var(--spacing-xl);
              padding-right: calc(var(--spacing-xl) + 40px);
            }

            .item-detail__type {
              font-family: var(--font-primary);
              font-size: 0.75rem;
              color: var(--color-cyber-primary);
              letter-spacing: 0.2em;
              margin-bottom: var(--spacing-sm);
            }

            .item-detail__title {
              display: flex;
              align-items: center;
              gap: var(--spacing-md);
              margin-bottom: var(--spacing-sm);
            }

            .item-detail__icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .item-detail__title h2 {
              font-family: var(--font-heading);
              font-size: 2rem;
              color: var(--text-primary);
              margin: 0;
            }

            .item-detail__rarity {
              font-family: var(--font-primary);
              font-size: 0.85rem;
              letter-spacing: 0.15em;
              text-shadow: 0 0 10px currentColor;
            }

            .item-detail__body {
              padding: var(--spacing-xl);
              max-height: calc(80vh - 300px);
              overflow-y: auto;
            }

            .item-detail__section {
              margin-bottom: var(--spacing-lg);
            }

            .item-detail__section:last-child {
              margin-bottom: 0;
            }

            .item-detail__section h3 {
              font-family: var(--font-heading);
              font-size: 1.2rem;
              color: var(--color-nature-accent);
              margin-bottom: var(--spacing-md);
              text-shadow: 0 0 8px rgba(107, 156, 66, 0.5);
            }

            .item-detail__description,
            .item-detail__details {
              color: var(--text-secondary);
              line-height: 1.8;
            }

            .item-detail__description p,
            .item-detail__details p {
              margin-bottom: var(--spacing-md);
            }

            .item-detail__footer {
              padding: var(--spacing-lg);
              border-top: 1px solid rgba(107, 156, 66, 0.3);
            }

            .item-detail__circuit-lines {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

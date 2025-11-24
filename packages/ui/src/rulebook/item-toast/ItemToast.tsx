import { useEffect } from 'react';
import type { InventoryItem } from '../inventory-panel';

interface ItemToastProps {
  item: InventoryItem;
  onAnimationEnd: () => void;
}

export function ItemToast({ item, onAnimationEnd }: ItemToastProps) {
  useEffect(() => {
    // アニメーション終了後にコールバックを呼ぶ
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 2500); // 2.5秒後に消える

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  const rarityColors = {
    common: '#6b9c42',
    rare: '#00d4ff',
    epic: '#9d4edd',
    legendary: '#ffd700',
  };

  const rarityColor = rarityColors[item.rarity || 'common'];

  return (
    <div className="item-toast">
      <div className="toast-content">
        <div className="toast-icon">{item.icon}</div>
        <div className="toast-info">
          <div className="toast-label">フラグメント獲得</div>
          <div className="toast-name" style={{ color: rarityColor }}>
            {item.name}
          </div>
        </div>
      </div>

      <style>{`
        .item-toast {
          position: fixed;
          bottom: 6rem;
          right: 2rem;
          z-index: 950;
          animation: toast-appear 2.5s ease-out forwards;
        }

        @keyframes toast-appear {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          10% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(40px) scale(0.3);
          }
        }

        @scope {

          .toast-content {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            background: rgba(13, 13, 13, 0.95);
            border: 2px solid var(--color-cyber-primary);
            border-radius: 12px;
            padding: var(--spacing-md) var(--spacing-lg);
            box-shadow:
              0 4px 20px rgba(0, 255, 204, 0.3),
              0 0 40px rgba(0, 255, 204, 0.2);
            backdrop-filter: blur(10px);
          }

          .toast-icon {
            font-size: 2rem;
            line-height: 1;
            filter: drop-shadow(0 0 8px var(--color-cyber-primary));
            animation: icon-glow 1s ease-in-out infinite;
          }

          @keyframes icon-glow {
            0%, 100% {
              filter: drop-shadow(0 0 8px var(--color-cyber-primary));
            }
            50% {
              filter: drop-shadow(0 0 16px var(--color-cyber-primary));
            }
          }

          .toast-info {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
          }

          .toast-label {
            font-family: var(--font-primary);
            font-size: 0.7rem;
            color: var(--text-tertiary);
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .toast-name {
            font-family: var(--font-heading);
            font-size: 1rem;
            font-weight: bold;
            text-shadow: 0 0 10px currentColor;
          }

          @media (max-width: 768px) {
            .item-toast {
              bottom: 4.5rem;
              right: 1rem;
            }

            .toast-content {
              padding: var(--spacing-sm) var(--spacing-md);
            }

            .toast-icon {
              font-size: 1.5rem;
            }

            .toast-label {
              font-size: 0.65rem;
            }

            .toast-name {
              font-size: 0.9rem;
            }
          }
        }
      `}</style>
    </div>
  );
}

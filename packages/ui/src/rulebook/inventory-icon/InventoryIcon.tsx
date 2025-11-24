import type { ReactNode } from 'react';

export type InventoryIconType = string | ReactNode;

export interface InventoryIconProps {
  icon?: InventoryIconType;
  size?: 'small' | 'medium' | 'large';
}

export function InventoryIcon({ icon, size = 'medium' }: InventoryIconProps) {
  const sizeMap = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  };

  const fontSize = sizeMap[size];

  return (
    <div className="inventory-icon" style={{ fontSize }}>
      {icon}

      <style>{`
          .inventory-icon {
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .inventory-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

      `}</style>
    </div>
  );
}

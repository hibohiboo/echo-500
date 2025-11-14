import type { JSX } from 'solid-js';

export type InventoryIconType = string | JSX.Element;

export interface InventoryIconProps {
  icon?: InventoryIconType;
  size?: 'small' | 'medium' | 'large';
}

export function InventoryIcon(props: InventoryIconProps) {
  const sizeMap = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  };

  const fontSize = sizeMap[props.size || 'medium'];

  return (
    <div class="inventory-icon" style={{ 'font-size': fontSize }}>
      {props.icon}

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

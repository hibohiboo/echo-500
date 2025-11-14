import { createSignal, For, Show } from 'solid-js';
import { InventoryCard } from '../inventory-card';
import { ItemDetail } from '../item-detail';
import type { InventoryIconType } from '../inventory-icon';
import type { JSX } from 'solid-js';

export interface InventoryItem {
  id: string;
  type: 'command' | 'item' | 'memory';
  name: string;
  icon?: InventoryIconType;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  description: JSX.Element | string;
  details?: JSX.Element | string;
}

interface InventoryPanelProps {
  isOpen: boolean;
  items: InventoryItem[];
  onClose: () => void;
  onExecute: (item: InventoryItem) => void;
}

export function InventoryPanel(props: InventoryPanelProps) {
  const [selectedItem, setSelectedItem] = createSignal<
    InventoryItem | undefined
  >(undefined);

  const handleCardClick = (item: InventoryItem) => {
    setSelectedItem(item);
  };

  const handleDetailClose = () => {
    setSelectedItem(undefined);
  };

  return (
    <>
      <Show when={props.isOpen}>
        <div class="inventory-overlay" onClick={props.onClose}></div>
        <div class="inventory-panel" classList={{ open: props.isOpen }}>
          <div class="inventory-panel__header">
            <h2 class="inventory-panel__title">
              <span class="title-icon">⚙</span>
              Core Monitor
            </h2>
            <button class="inventory-panel__close" onClick={props.onClose}>
              ✕
            </button>
          </div>

          <div class="inventory-panel__tabs">
            <button class="tab tab--active">COMMANDS</button>
            <button class="tab">ITEMS</button>
            <button class="tab">MEMORY</button>
          </div>

          <div class="inventory-panel__content">
            <div class="inventory-grid">
              <For each={props.items}>
                {(item) => (
                  <InventoryCard
                    type={item.type}
                    name={item.name}
                    icon={item.icon}
                    rarity={item.rarity}
                    onClick={() => handleCardClick(item)}
                    onExecute={
                      item.type === 'command'
                        ? () => props.onExecute(item)
                        : undefined
                    }
                  />
                )}
              </For>
            </div>
          </div>

          <style>{`
            .inventory-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 998;
              animation: fadeIn 0.3s ease;
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            .inventory-panel {
              position: fixed;
              bottom: -100%;
              left: 0;
              width: 100%;
              max-height: 70vh;
              background: rgba(13, 13, 13, 0.98);
              border-top: 3px solid var(--color-cyber-primary);
              box-shadow: 0 -10px 40px rgba(0, 255, 204, 0.2);
              z-index: 999;
              transition: bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              backdrop-filter: blur(20px);
            }

            .inventory-panel.open {
              bottom: 0;
            }

            @scope {

              .inventory-panel__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--spacing-lg) var(--spacing-xl);
                border-bottom: 1px solid rgba(107, 156, 66, 0.3);
              }

              .inventory-panel__title {
                font-family: var(--font-heading);
                font-size: 1.5rem;
                color: var(--color-cyber-primary);
                margin: 0;
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                text-shadow: 0 0 10px var(--color-cyber-glow);
                letter-spacing: 0.1em;
              }

              .title-icon {
                font-size: 1.8rem;
              }

              .inventory-panel__close {
                background: transparent;
                border: 2px solid var(--color-cyber-primary);
                color: var(--color-cyber-primary);
                font-size: 1.2rem;
                width: 40px;
                height: 40px;
                border-radius: 4px;
                cursor: pointer;
                transition: all var(--transition-fast);
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .inventory-panel__close:hover {
                background: var(--color-cyber-primary);
                color: var(--bg-primary);
                box-shadow: var(--shadow-cyber);
              }

              .inventory-panel__tabs {
                display: flex;
                gap: var(--spacing-sm);
                padding: var(--spacing-md) var(--spacing-xl);
                border-bottom: 1px solid rgba(107, 156, 66, 0.2);
                overflow-x: auto;
              }

              .tab {
                font-family: var(--font-primary);
                font-size: 0.85rem;
                padding: var(--spacing-sm) var(--spacing-lg);
                background: transparent;
                border: 1px solid var(--color-nature-secondary);
                color: var(--text-secondary);
                cursor: pointer;
                transition: all var(--transition-fast);
                white-space: nowrap;
                letter-spacing: 0.1em;
              }

              .tab:hover {
                border-color: var(--color-nature-accent);
                color: var(--color-nature-accent);
              }

              .tab--active {
                background: var(--color-nature-accent);
                color: var(--bg-primary);
                border-color: var(--color-nature-accent);
              }

              .inventory-panel__content {
                padding: var(--spacing-xl);
                max-height: calc(70vh - 160px);
                overflow-y: auto;
              }

              .inventory-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                gap: var(--spacing-lg);
              }

              /* Scrollbar */
              .inventory-panel__content::-webkit-scrollbar {
                width: 8px;
              }

              .inventory-panel__content::-webkit-scrollbar-track {
                background: rgba(42, 42, 42, 0.5);
              }

              .inventory-panel__content::-webkit-scrollbar-thumb {
                background: var(--color-nature-secondary);
                border-radius: 4px;
              }

              .inventory-panel__content::-webkit-scrollbar-thumb:hover {
                background: var(--color-nature-accent);
              }

              @media (max-width: 768px) {
                .inventory-panel {
                  max-height: 80vh;
                }

                .inventory-grid {
                  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                  gap: var(--spacing-md);
                }

                .inventory-panel__content {
                  padding: var(--spacing-md);
                }
              }
            }
          `}</style>
        </div>
      </Show>

      <Show when={selectedItem()}>
        <ItemDetail
          type={selectedItem()!.type}
          name={selectedItem()!.name}
          icon={selectedItem()!.icon}
          rarity={selectedItem()!.rarity}
          description={selectedItem()!.description}
          details={selectedItem()!.details}
          onClose={handleDetailClose}
        />
      </Show>
    </>
  );
}

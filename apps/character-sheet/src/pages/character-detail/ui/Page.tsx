import {
  StatCard,
  MemorySlots,
  CommandCard,
  Button,
  type MemorySlot,
} from '@echo-500/ui';
import { useDetailPage } from '../hooks/useDetailPage';
import type { PlayerCharacterMemory } from '@echo-500/schema';

export default function CharacterDetailPage() {
  const { onDelete, onEdit, character, onBack } = useDetailPage();

  // メモリースロットの変換
  const memorySlots: MemorySlot[] =
    character.memorySlots?.map((memory: PlayerCharacterMemory) => ({
      title: memory.title,
      description: memory.description,
      tags: memory.tags,
    })) ?? [];

  return (
    <div className="character-detail-container">
      {/* ヘッダー */}
      <div className="detail-header">
        <div className="header-content">
          <h1 className="character-name">{character.name}</h1>
          <div className="header-actions">
            <Button onClick={onEdit} variant="secondary">
              編集
            </Button>
            <Button onClick={onDelete} variant="danger">
              削除
            </Button>
            <Button onClick={onBack} variant="secondary">
              戻る
            </Button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="detail-content">
        {/* ステータスセクション */}
        <section className="stats-section">
          <h2 className="section-title">
            <span>📊</span>
            ステータス
          </h2>
          <div className="stats-grid">
            <StatCard
              label="キャラクターID"
              value={character.id}
              description="一意の識別子"
            />
            <StatCard
              label="作成日時"
              value={new Date(character.createdAt).toLocaleDateString('ja-JP')}
              description="キャラクター作成日"
            />
            <StatCard
              label="更新日時"
              value={new Date(character.updatedAt).toLocaleDateString('ja-JP')}
              description="最終更新日"
            />
          </div>
        </section>

        {/* メモリースロットセクション */}
        {memorySlots.length > 0 && (
          <section className="memory-section">
            <MemorySlots memorySlots={memorySlots} />
          </section>
        )}

        {/* バトルコマンドセクション */}
        {character.battleCommands && character.battleCommands.length > 0 && (
          <section className="commands-section">
            <h2 className="section-title">
              <span>⚔️</span>
              バトルコマンド
            </h2>
            <div className="commands-grid">
              {character.battleCommands.map((command) => (
                <CommandCard
                  key={command.id}
                  title={command.name}
                  description={command.effect}
                  disabled={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        .character-detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.9) 100%);
        }

        .detail-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--color-cyber-primary, #00ffcc);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .character-name {
          font-family: var(--font-heading, 'Orbitron', monospace);
          font-size: 2rem;
          color: var(--color-cyber-primary, #00ffcc);
          text-shadow: 0 0 12px rgba(0, 255, 204, 0.6);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section-title {
          font-family: var(--font-heading, 'Orbitron', monospace);
          font-size: 1.5rem;
          color: var(--color-cyber-primary, #00ffcc);
          text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title span {
          font-size: 1.5rem;
        }

        .stats-section {
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid var(--color-nature-secondary, #8b9a7a);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .memory-section {
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid var(--color-nature-secondary, #8b9a7a);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .commands-section {
          background: rgba(26, 26, 26, 0.8);
          border: 2px solid var(--color-nature-secondary, #8b9a7a);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .commands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        /* レスポンシブ対応 */
        @media (max-width: 768px) {
          .character-detail-container {
            padding: 1rem;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .character-name {
            font-size: 1.5rem;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .stats-grid,
          .commands-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

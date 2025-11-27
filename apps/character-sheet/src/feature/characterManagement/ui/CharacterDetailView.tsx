import { BattleCommandCard } from '@echo-500/frontend-common';
import { battleFrameTypeToString } from '@echo-500/schema';
import type { Character } from '@/entities/character';
import type { BattleStyle } from '@echo-500/frontend-common';

interface CharacterDetailViewProps {
  character: Character;
  finalStats: {
    hp: number;
    evasion: number;
    armor: number;
    initialCount: number;
    movement: number;
    size: number;
    modifiers: { movement: number; evasion: number };
  } | null;
  battleStylesData: BattleStyle[];
  learnedCommands: Array<{
    name: string;
    cp: number;
    timing: string;
    target: string;
    range: string;
    cost: string;
    effect: string;
    flavor: string;
    tags: string[];
    details: string;
  }>;
  totalCP: number;
  getStyleModifierText: (style: BattleStyle) => string[];
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

// StatCard Component
interface StatCardProps {
  label: string;
  value: number | string;
  description: string;
  modifier?: number;
  baseValue?: number;
}

function StatCard({
  label,
  value,
  description,
  modifier = 0,
  baseValue,
}: StatCardProps) {
  return (
    <div className="p-3 bg-bg-secondary rounded">
      <div className="text-xs text-text-tertiary mb-1">{label}</div>
      <div
        className={`text-2xl font-bold mb-1 ${
          modifier !== 0 ? 'text-nature-accent' : 'text-cyber-primary'
        }`}
      >
        {value}
        {modifier !== 0 && baseValue !== undefined && (
          <span className="text-sm ml-1">
            (基本{baseValue}
            {modifier > 0 ? '+' : ''}
            {modifier})
          </span>
        )}
      </div>
      <div className="text-[11px] text-text-tertiary">{description}</div>
    </div>
  );
}

// ModifierBanner Component
interface ModifierBannerProps {
  modifiers: { movement: number; evasion: number };
}

function ModifierBanner({ modifiers }: ModifierBannerProps) {
  const hasModifiers = modifiers.movement !== 0 || modifiers.evasion !== 0;
  if (!hasModifiers) return null;

  return (
    <div className="mb-4 px-3 py-2 bg-[rgba(107,156,66,0.1)] border border-nature-accent rounded">
      <p className="text-sm text-nature-accent m-0 font-bold">
        ⚡ スタイル補正適用済み
        {modifiers.movement !== 0 &&
          ` / 移動力${modifiers.movement > 0 ? '+' : ''}${modifiers.movement}`}
        {modifiers.evasion !== 0 &&
          ` / 回避値${modifiers.evasion > 0 ? '+' : ''}${modifiers.evasion}`}
      </p>
    </div>
  );
}

// MemorySlots Component
interface MemorySlotsProps {
  memorySlots: Character['memorySlots'];
}

function MemorySlots({ memorySlots }: MemorySlotsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
        <span>🧠</span>
        記憶スロット
      </h2>
      <div className="flex flex-col gap-4">
        {memorySlots.map((slot, index) => (
          <div
            key={index}
            className="p-4 bg-bg-tertiary border border-cyber-secondary rounded"
          >
            <h3 className="text-base text-cyber-secondary mb-2">
              {slot.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-2">
              {slot.description}
            </p>
            {slot.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {slot.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-cyber-primary text-bg-primary text-xs rounded-full font-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface BattleFrameStatsProps {
  character: Character;
  finalStats: CharacterDetailViewProps['finalStats'];
}

function BattleFrameStats({ character, finalStats }: BattleFrameStatsProps) {
  if (!character.battleFrame || !finalStats) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
        <span>⚔️</span>
        戦闘フレーム - {battleFrameTypeToString(character.battleFrame.type)}
      </h2>

      <ModifierBanner modifiers={finalStats.modifiers} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-bg-tertiary border-2 border-nature-accent rounded">
        <StatCard
          label="HP (ヒットポイント)"
          value={finalStats.hp}
          description="0になると戦闘不能"
        />
        <StatCard
          label="回避値"
          value={finalStats.evasion}
          description="2d6がこの値未満なら攻撃失敗"
          modifier={finalStats.modifiers.evasion}
          baseValue={character.battleFrame.stats.evasion}
        />
        <StatCard
          label="装甲値"
          value={character.battleFrame.stats.armor}
          description="ダメージをこの値分減少"
        />
        <StatCard
          label="初期カウント"
          value={finalStats.initialCount}
          description="カウンターボードの配置位置"
        />
        <StatCard
          label="移動力"
          value={finalStats.movement}
          description="1ターンに移動できるマス数"
          modifier={finalStats.modifiers.movement}
          baseValue={character.battleFrame.stats.movement}
        />
        <StatCard
          label="サイズ"
          value={finalStats.size === 1 ? '1x1' : '2x2'}
          description="占有マスの大きさ"
        />
      </div>
    </div>
  );
}

interface BattleCommandsProps {
  learnedCommands: CharacterDetailViewProps['learnedCommands'];
  totalCP: number;
}

function BattleCommands({ learnedCommands, totalCP }: BattleCommandsProps) {
  if (!learnedCommands || learnedCommands.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
        <span>💾</span>
        習得済み戦闘モジュール
      </h2>

      <div className="mb-4 px-3 py-2 bg-bg-secondary rounded">
        <p className="text-sm text-text-secondary">
          習得モジュール数: {learnedCommands.length} / 消費CP: {totalCP}点
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {learnedCommands.map((cmd) => (
          <BattleCommandCard
            key={cmd.name}
            name={cmd.name}
            cp={cmd.cp}
            timing={cmd.timing}
            target={cmd.target}
            range={cmd.range}
            cost={cmd.cost}
            effect={cmd.effect}
            flavor={cmd.flavor}
            tags={cmd.tags}
            details={cmd.details}
          />
        ))}
      </div>
    </div>
  );
}

// BattleStyles Component
interface BattleStylesComponentProps {
  battleStylesData: BattleStyle[];
  getStyleModifierText: (style: BattleStyle) => string[];
}

function BattleStylesComponent({
  battleStylesData,
  getStyleModifierText,
}: BattleStylesComponentProps) {
  if (!battleStylesData || battleStylesData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
        <span>⚡</span>
        戦闘スタイル
      </h2>
      <div className="flex flex-col gap-4">
        {battleStylesData.map((style, index) => {
          const modifierText = getStyleModifierText(style);

          return (
            <div
              key={index}
              className="p-4 bg-bg-tertiary border-2 border-nature-accent rounded"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg text-nature-accent font-bold">
                  {style.name}
                </h3>
                <span className="text-xs text-text-tertiary">
                  (CP: {style.cpCost})
                </span>
              </div>
              <p
                className={`text-sm text-text-secondary ${modifierText.length > 0 ? 'mb-2' : ''}`}
              >
                {style.description}
              </p>
              {modifierText.length > 0 && (
                <p className="text-sm text-cyber-primary font-bold">
                  補正: {modifierText.join(', ')}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 px-3 py-2 bg-bg-secondary rounded">
        <p className="text-sm text-text-secondary">
          習得スタイル数: {battleStylesData.length} / 合計CP消費:{' '}
          {battleStylesData.length * 30}点
        </p>
      </div>
    </div>
  );
}

export default function CharacterDetailView({
  character,
  finalStats,
  battleStylesData,
  learnedCommands,
  totalCP,
  getStyleModifierText,
  onEdit,
  onDelete,
  onBack,
}: CharacterDetailViewProps) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Character Details</h1>
        <p>Echo:500 - Character Database</p>
      </header>

      <div className="card">
        <div className="mb-8">
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back to List
          </button>
        </div>

        <div className="mb-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Name</h2>
            <p className="text-lg text-text-secondary">{character.name}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Character ID
            </h2>
            <p className="text-sm text-text-secondary font-mono">
              {character.id}
            </p>
          </div>

          <MemorySlots memorySlots={character.memorySlots} />

          <BattleFrameStats character={character} finalStats={finalStats} />

          <BattleStylesComponent
            battleStylesData={battleStylesData}
            getStyleModifierText={getStyleModifierText}
          />

          <BattleCommands learnedCommands={learnedCommands} totalCP={totalCP} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn btn-primary" onClick={onEdit}>
            Edit Character
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete Character
          </button>
        </div>
      </div>
    </div>
  );
}

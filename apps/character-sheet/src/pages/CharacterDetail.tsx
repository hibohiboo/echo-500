import {
  useBattleCommandData,
  BattleCommandCard,
  BATTLE_STYLES,
} from '@echo-500/frontend-common';
import { battleFrameTypeToString } from '@echo-500/schema';
import type { Character } from '../types';
import type { BattleStyle } from '@echo-500/frontend-common';

interface CharacterDetailProps {
  character: Character;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const calculateStyleModifiers = (
  battleStyles?: Array<'saber' | 'gunner' | 'wizard'>,
) => {
  if (!battleStyles || battleStyles.length === 0) {
    return { movement: 0, evasion: 0 };
  }

  return battleStyles.reduce(
    (acc, styleKey) => {
      const style = BATTLE_STYLES[styleKey];
      return {
        movement:
          acc.movement +
          ('movement' in style.modifier ? style.modifier.movement || 0 : 0),
        evasion:
          acc.evasion +
          ('evasion' in style.modifier ? style.modifier.evasion || 0 : 0),
      };
    },
    { movement: 0, evasion: 0 },
  );
};

const calculateFinalStats = (character: Character) => {
  if (!character.battleFrame) {
    return null;
  }

  const baseStats = character.battleFrame.stats;
  const modifiers = calculateStyleModifiers(character.battleStyles);

  return {
    hp: baseStats.hp,
    evasion: baseStats.evasion + modifiers.evasion,
    armor: baseStats.armor,
    initialCount: baseStats.initialCount,
    movement: baseStats.movement + modifiers.movement,
    size: baseStats.size,
    modifiers,
  };
};

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

// Helper function for BattleStyles
function getStyleModifierText(style: BattleStyle): string[] {
  const modifierText: string[] = [];

  if (style.modifier.movement !== undefined) {
    modifierText.push(
      `移動力${style.modifier.movement > 0 ? '+' : ''}${style.modifier.movement}`,
    );
  }
  if (style.modifier.evasion !== undefined) {
    modifierText.push(
      `回避値${style.modifier.evasion > 0 ? '+' : ''}${style.modifier.evasion}`,
    );
  }

  return modifierText;
}

interface BattleFrameStatsProps {
  character: Character;
  finalStats: ReturnType<typeof calculateFinalStats>;
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
  battleCommands: Character['battleCommands'];
}

function BattleCommands({ battleCommands }: BattleCommandsProps) {
  const apiKey = import.meta.env.VITE_SPREAD_SHEET_API_KEY || '';
  const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID || '';
  const { data: availableCommands } = useBattleCommandData(
    apiKey,
    spreadSheetId,
  );

  if (!battleCommands || battleCommands.length === 0) {
    return null;
  }

  const learnedCommands = availableCommands.filter((cmd) =>
    battleCommands.includes(cmd.name),
  );

  const totalCP = learnedCommands.reduce((sum, cmd) => sum + cmd.cp, 0);

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
  battleStyles: Character['battleStyles'];
}

function BattleStylesComponent({ battleStyles }: BattleStylesComponentProps) {
  if (!battleStyles || battleStyles.length === 0) {
    return null;
  }

  const battleStylesData: BattleStyle[] = battleStyles.map(
    (styleKey) => BATTLE_STYLES[styleKey],
  );

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
          習得スタイル数: {battleStyles.length} / 合計CP消費:{' '}
          {battleStyles.length * 30}点
        </p>
      </div>
    </div>
  );
}

export default function CharacterDetail({
  character,
  onEdit,
  onDelete,
  onBack,
}: CharacterDetailProps) {
  const finalStats = calculateFinalStats(character);

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

          <BattleStylesComponent battleStyles={character.battleStyles} />

          <BattleCommands battleCommands={character.battleCommands} />
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

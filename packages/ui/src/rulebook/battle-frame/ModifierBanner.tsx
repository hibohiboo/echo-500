export interface ModifierBannerProps {
  modifiers: { movement: number; evasion: number };
}

export function ModifierBanner({ modifiers }: ModifierBannerProps) {
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

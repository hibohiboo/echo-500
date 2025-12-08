import { BattleCommandCard } from '@echo-500/frontend-common';
import type { BattleCommand } from '@echo-500/schema';

interface Props {
  cmd: BattleCommand;
  toggleBattleCommand: (name: string) => void;
  isSelected: boolean;
}
export const BattleCommandItem = (args: Props) => {
  const { cmd, toggleBattleCommand, isSelected } = args;
  return (
    <div
      key={cmd.name}
      onClick={() => toggleBattleCommand(cmd.name)}
      className={`cursor-pointer transition-all duration-200 relative ${
        isSelected ? 'opacity-100 scale-100' : 'opacity-70 scale-[0.98]'
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-(--color-nature-accent) text-(--bg-primary) px-2 py-1 rounded text-xs font-bold z-10">
          ✓ 習得済み
        </div>
      )}
      <BattleCommandCard
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
    </div>
  );
};

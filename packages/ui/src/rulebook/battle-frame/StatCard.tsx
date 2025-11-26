export interface StatCardProps {
  label: string;
  value: number | string;
  description: string;
  modifier?: number;
  baseValue?: number;
}

export function StatCard({
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

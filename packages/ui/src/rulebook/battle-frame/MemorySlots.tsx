export interface MemorySlot {
  title: string;
  description: string;
  tags: string[];
}

export interface MemorySlotsProps {
  memorySlots: MemorySlot[];
}

export function MemorySlots({ memorySlots }: MemorySlotsProps) {
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

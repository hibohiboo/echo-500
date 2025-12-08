import type { ReactNode } from 'react';

export interface SectionTitleProps {
  icon?: ReactNode;
  children: ReactNode;
}

export function SectionTitle({ icon, children }: SectionTitleProps) {
  return (
    <h2 className="font-heading text-2xl lg:text-3xl text-cyber-secondary mb-4 lg:mb-6 flex items-center gap-2">
      {icon && <span className="text-nature-light text-xl">{icon}</span>}
      {children}
    </h2>
  );
}

export interface ContentCardProps {
  children: ReactNode;
}

export function ContentCard({ children }: ContentCardProps) {
  return (
    <div className="bg-bg-secondary border-[1px] border-nature-secondary rounded-lg p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
}

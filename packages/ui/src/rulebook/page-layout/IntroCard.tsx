import type { ReactNode } from 'react';

export interface IntroCardProps {
  children: ReactNode;
}

export function IntroCard({ children }: IntroCardProps) {
  return (
    <div className="bg-[rgba(0,255,204,0.05)] border border-cyber-primary rounded-lg p-6 lg:p-8 shadow-[0_0_15px_rgba(0,255,204,0.1)]">
      <div className="[&>p]:mb-4 [&>p:last-child]:mb-0 [&>p]:text-text-secondary [&>p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}

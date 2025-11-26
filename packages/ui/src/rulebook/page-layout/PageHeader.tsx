import type { ReactNode } from 'react';

export interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
}

export function PageHeader({ icon, title }: PageHeaderProps) {
  return (
    <section className="mb-8 lg:mb-12">
      <h1 className="font-heading text-4xl lg:text-5xl text-cyber-primary drop-shadow-[0_0_10px_rgba(0,255,204,0.3)] mb-4 lg:mb-6 flex items-center gap-3 lg:gap-4">
        {icon && (
          <span className="text-nature-accent text-3xl lg:text-4xl">{icon}</span>
        )}
        {title}
      </h1>
      <div className="h-0.5 bg-gradient-to-r from-cyber-primary via-nature-accent to-transparent shadow-[0_0_10px_rgba(0,255,204,0.3)]" />
    </section>
  );
}

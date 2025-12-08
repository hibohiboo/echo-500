import type { ReactNode } from 'react';

export interface NoteBoxProps {
  children: ReactNode;
  variant?: 'default' | 'nature';
}

export function NoteBox({ children, variant = 'default' }: NoteBoxProps) {
  const bgColor =
    variant === 'nature'
      ? 'bg-[rgba(107,156,66,0.05)]'
      : 'bg-[rgba(0,255,204,0.05)]';
  const borderColor =
    variant === 'nature' ? 'border-nature-accent' : 'border-cyber-primary';
  const iconColor =
    variant === 'nature' ? 'text-nature-accent' : 'text-cyber-primary';
  const textColor = 'text-text-tertiary';

  return (
    <div
      className={`flex items-start gap-2 ${bgColor} border-l-3 ${borderColor} px-4 py-3 rounded`}
    >
      <span className={`${iconColor} text-xl font-bold flex-shrink-0`}>
        ※
      </span>
      <div className={`${textColor} text-sm leading-relaxed flex-1`}>
        {children}
      </div>
    </div>
  );
}

export interface ExampleBoxProps {
  title?: string;
  children: ReactNode;
}

export function ExampleBox({ title = '例', children }: ExampleBoxProps) {
  return (
    <div className="bg-bg-tertiary border-l-4 border-nature-accent px-4 py-3 mt-4 rounded">
      {title && (
        <p className="font-heading text-nature-accent mb-2 text-sm">{title}</p>
      )}
      <div className="[&>ul]:list-none [&>ul]:p-0 [&>ul]:m-0 [&>ul>li]:text-text-secondary [&>ul>li]:py-1 [&>ul>li]:pl-4 [&>ul>li]:relative [&>ul>li]:before:content-['›'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-nature-accent">
        {children}
      </div>
    </div>
  );
}

import type { ComponentType } from 'react';
import { CodeXml, PenLine, Zap, type LucideProps } from 'lucide-react';
import type { CoreStrength } from '@/types/portfolio';

const icons: Record<CoreStrength['iconType'], ComponentType<LucideProps>> = {
  design: PenLine,
  code: CodeXml, // replaces the "</>" text glyph
  ship: Zap,
};

export interface StrengthCardProps {
  strength: CoreStrength;
}

export function StrengthCard({ strength }: StrengthCardProps) {
  const Icon = icons[strength.iconType];

  return (
    <article className="flex flex-col items-center rounded-3xl border border-line/[0.06] bg-paper/60 p-5 text-center shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-paper sm:p-6">
      <span className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-contrast text-contrast-fg" aria-hidden="true">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <h3 className="font-serif-title mb-1.5 text-xl text-ink sm:text-2xl">{strength.title}</h3>
      <p className="text-xs leading-relaxed text-ink-muted">{strength.description}</p>
    </article>
  );
}

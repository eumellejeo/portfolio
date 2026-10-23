import type { DailyTool } from '@/types/portfolio';

export interface ToolBadgeProps {
  tool: DailyTool;
}

export function ToolBadge({ tool }: ToolBadgeProps) {
  return (
    <li className="rounded-xl border border-line/5 bg-paper px-3 py-1.5 text-xs font-medium text-ink-soft shadow-xs transition-colors hover:border-line/20">
      {tool.name}
    </li>
  );
}

'use client';

import type { TechCategory } from '@/types/portfolio';
import { Icosahedron } from '@/components/ui/Icosahedron';

export interface TechStackDiagramProps {
  categories: TechCategory[];
}

/* ------------------------------------------------------------------ */
/* Connector geometry (px). The horizontal rule and the angled branch */
/* share the same baseline (y = 0) so they join seamlessly.           */
/* ------------------------------------------------------------------ */
const BRANCH_W = 64; // total width of the bend SVG
const ELBOW_X = 16; // where the horizontal turns into the diagonal
const BRANCH_RISE = 38; // vertical travel of the diagonal
const DOT_R = 5.5;
const STROKE = 2.5;

type Side = 'left' | 'right';
type Vertical = 'top' | 'bottom';

function Branch({ side, vertical }: { side: Side; vertical: Vertical }) {
  // y grows downward; top categories angle DOWN toward the polygon, bottom ones angle UP.
  const endY = vertical === 'top' ? BRANCH_RISE : -BRANCH_RISE;
  const dotX = BRANCH_W - DOT_R - 2;

  const d =
    side === 'left'
      ? `M 0 0 L ${ELBOW_X} 0 L ${dotX} ${endY}`
      : `M ${BRANCH_W} 0 L ${BRANCH_W - ELBOW_X} 0 L ${BRANCH_W - dotX} ${endY}`;
  const cx = side === 'left' ? dotX : BRANCH_W - dotX;

  return (
    <svg
      width={BRANCH_W}
      height={STROKE}
      viewBox={`0 ${-STROKE / 2} ${BRANCH_W} ${STROKE}`}
      className="shrink-0 overflow-visible text-ink"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Soft pulse halo */}
      <circle cx={cx} cy={endY} r={DOT_R} fill="currentColor" opacity="0.25">
        <animate attributeName="r" values={`${DOT_R};${DOT_R * 2.2}`} dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={endY} r={DOT_R} fill="currentColor" />
    </svg>
  );
}

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="rounded-full border border-line/10 bg-paper px-3.5 py-1 text-xs font-medium text-ink shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-line/30 sm:text-sm">
      {skill}
    </span>
  );
}

function CategoryBlock({
  category,
  side,
  vertical,
}: {
  category: TechCategory;
  side: Side;
  vertical: Vertical;
}) {
  const isLeft = side === 'left';

  return (
    <div className="group flex flex-col">
      {/* Title sits on top of the horizontal rule */}
      <h4
        className={`pb-2 font-sans text-lg font-bold tracking-tight text-ink lg:text-xl ${
          isLeft ? 'pr-16 text-left' : 'pl-16 text-right'
        }`}
      >
        {category.title}
      </h4>

      {/* Continuous connector: horizontal rule + angled branch + dot */}
      <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        <span
          className="block flex-1 bg-ink"
          style={{ height: STROKE, borderRadius: STROKE }}
        />
        {/* Overlap 1px to avoid sub-pixel seams between rule and SVG */}
        <div className={isLeft ? '-ml-px' : '-mr-px'}>
          <Branch side={side} vertical={vertical} />
        </div>
      </div>

      {/* Pill badges */}
      <div
        className={`mt-3 flex flex-wrap gap-2.5 ${
          isLeft ? 'justify-start pr-16' : 'justify-end pl-16'
        }`}
      >
        {category.skills.map((skill) => (
          <SkillPill key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function TechStackDiagram({ categories }: TechStackDiagramProps) {
  const topLeft = categories.find((c) => c.position === 'top-left') ?? categories[0];
  const bottomLeft = categories.find((c) => c.position === 'bottom-left') ?? categories[1];
  const topRight = categories.find((c) => c.position === 'top-right') ?? categories[2];
  const bottomRight = categories.find((c) => c.position === 'bottom-right') ?? categories[3];

  return (
    <div className="w-full">
      {/* -------------------------------------------------------------- */}
      {/* Desktop / Tablet Diagram Layout (matches reference image)      */}
      {/* -------------------------------------------------------------- */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-x-0 md:gap-y-16 lg:gap-y-20">
        {/* Row 1: Top Left */}
        <div className="col-start-1 row-start-1 min-w-0">
          {topLeft && <CategoryBlock category={topLeft} side="left" vertical="top" />}
        </div>

        {/* Center: spinning icosahedron (spans both rows, vertically centered between connectors) */}
        <div className="col-start-2 row-start-1 row-span-2 flex shrink-0 items-center justify-center px-4 pt-6 lg:px-6 lg:pt-8">
          <Icosahedron size={250} />
        </div>

        {/* Row 1: Top Right */}
        <div className="col-start-3 row-start-1 min-w-0">
          {topRight && <CategoryBlock category={topRight} side="right" vertical="top" />}
        </div>

        {/* Row 2: Bottom Left — Frameworks & Libraries (aligned horizontally with Engineering Tools) */}
        <div className="col-start-1 row-start-2 min-w-0">
          {bottomLeft && <CategoryBlock category={bottomLeft} side="left" vertical="bottom" />}
        </div>

        {/* Row 2: Bottom Right — Engineering Tools (aligned horizontally with Frameworks & Libraries) */}
        <div className="col-start-3 row-start-2 min-w-0">
          {bottomRight && <CategoryBlock category={bottomRight} side="right" vertical="bottom" />}
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Mobile Stacked Layout (< md)                                   */}
      {/* -------------------------------------------------------------- */}
      <div className="flex flex-col items-center md:hidden">
        {/* Centered 3D Icosahedron */}
        <div className="mb-8 flex items-center justify-center">
          <Icosahedron size={190} />
        </div>

        {/* Categorized cards */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col">
              <div className="border-b-[2px] border-ink pb-1">
                <h4 className="font-sans text-base font-bold text-ink">
                  {cat.title}
                </h4>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line/10 bg-paper px-3 py-1 text-xs font-medium text-ink shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

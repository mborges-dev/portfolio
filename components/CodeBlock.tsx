'use client';

import { useState } from 'react';

type Token =
  | { t: 'kw'; v: string }
  | { t: 'str'; v: string }
  | { t: 'num'; v: string }
  | { t: 'cm'; v: string }
  | { t: 'pn'; v: string }
  | { t: 'tx'; v: string };

type Props = {
  filename: string;
  language?: string;
  /** Lines of pre-tokenized code (muted palette only). */
  lines: Token[][];
};

const COLOR: Record<Token['t'], string> = {
  kw: 'text-sage',
  str: 'text-bone/80',
  num: 'text-bone/80',
  cm: 'text-muted/60 italic',
  pn: 'text-muted',
  tx: 'text-bone/85',
};

export function CodeBlock({ filename, language = 'ts', lines }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-hairline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-bone/[0.02] transition-colors"
        aria-expanded={open}
      >
        <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted flex items-center gap-3">
          <span className="text-muted/60">{language}</span>
          <span className="text-muted-faint">·</span>
          <span>{filename}</span>
        </span>
        <span
          aria-hidden
          className={`font-mono text-[11px] text-muted transition-transform ${
            open ? 'rotate-90' : ''
          }`}
        >
          ›
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <pre className="border-t border-hairline px-4 py-4 font-mono text-[12.5px] leading-[1.7] overflow-x-auto">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none pr-4 text-muted/30 tabular-nums w-6 text-right">
                  {i + 1}
                </span>
                <span className="whitespace-pre">
                  {line.map((tok, j) => (
                    <span key={j} className={COLOR[tok.t]}>
                      {tok.v}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

type Props = {
  /** Optional numbered eyebrow (e.g. "001"). Only renders when both number AND label are present. */
  number?: string;
  /** Optional eyebrow label (e.g. "The work"). Pair with `number`. */
  label?: string;
  title: React.ReactNode;
  /** Extra classes for the wrapper */
  className?: string;
};

export function SectionHeader({ number, label, title, className = '' }: Props) {
  const showEyebrow = Boolean(number && label);
  return (
    <header className={`mb-16 md:mb-20 ${className}`}>
      {showEyebrow ? (
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-soft mb-5">
          {number} — {label}
        </p>
      ) : null}
      <h2 className="section-title">{title}</h2>
    </header>
  );
}

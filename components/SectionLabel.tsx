type Props = {
  children: React.ReactNode;
  id?: string;
};

export function SectionLabel({ children, id }: Props) {
  return (
    <div className="flex items-center gap-6 mb-16">
      <h2
        id={id}
        className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted whitespace-nowrap"
      >
        {children}
      </h2>
      <span className="flex-1 h-px bg-hairline" aria-hidden />
    </div>
  );
}

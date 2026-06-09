type Props = {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

/**
 * Fade-up wrapper. Pure CSS animation — content stays visible if JS never runs.
 * Inline `--d` sets the animation delay (ms).
 */
export function Reveal({ as = 'div', delay = 0, className = '', children, id }: Props) {
  const Tag = as as any;
  const style = delay ? ({ ['--d']: `${delay}ms` } as React.CSSProperties) : undefined;
  return (
    <Tag id={id} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

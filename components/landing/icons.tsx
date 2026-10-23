export function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export type StepKind = "order" | "return" | "wash";

/* Ícones desenhados em volta do centro (60, 60) do círculo, numa caixa de ~50px. */
const stepPaths: Record<StepKind, React.ReactNode> = {
  order: (
    <>
      <path d="M38 50h44l-5 36H43z" />
      <path d="M48 50c0-10 5-16 12-16s12 6 12 16" />
    </>
  ),
  return: (
    <>
      <path d="M36 60a24 24 0 0 1 44.8-12" />
      <path d="M82.4 39.1l-1.6 8.9-8.5-3.1" />
      <path d="M84 60a24 24 0 0 1-44.8 12" />
      <path d="M37.6 80.9l1.6-8.9 8.5 3.1" />
    </>
  ),
  wash: (
    <>
      <path d="M60 33c-11 13-18 23-18 33a18 18 0 0 0 36 0c0-10-7-20-18-33z" />
      <path d="M51 68a9 9 0 0 0 9 9" />
    </>
  ),
};

export function StepIllustration({ kind }: { kind: StepKind }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="60" cy="60" r="58" fill="var(--color-bg-canvas)" stroke="none" />
      {stepPaths[kind]}
    </svg>
  );
}

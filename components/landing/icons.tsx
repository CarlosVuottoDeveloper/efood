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

const stepPaths: Record<StepKind, React.ReactNode> = {
  order: <path d="M70 70h60l-6 50H76zM86 70c0-14 6-22 14-22s14 8 14 22" />,
  return: <path d="M60 100a40 40 0 0 1 72-24M140 100a40 40 0 0 1-72 24M128 62l6 14-14 4M72 138l-6-14 14-4" />,
  wash: <path d="M100 50c20 26 36 42 36 62a36 36 0 0 1-72 0c0-20 16-36 36-62zM84 116a16 16 0 0 0 16 16" />,
};

export function StepIllustration({ kind }: { kind: StepKind }) {
  return (
    <svg width="160" height="128" viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="100" cy="95" r="62" fill="var(--color-bg-canvas)" stroke="none" />
      {stepPaths[kind]}
    </svg>
  );
}

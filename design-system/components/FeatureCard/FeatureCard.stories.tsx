import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarGroup } from "../Avatar/AvatarGroup";
import { Badge } from "../Badge/Badge";
import { IconButton } from "../Button/IconButton";
import { Container } from "../Layout/Container";
import { FeatureCard } from "./FeatureCard";

function Plus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Illustration({ kind }: { kind: "order" | "return" | "wash" }) {
  const paths = {
    order: <path d="M70 70h60l-6 50H76zM86 70c0-14 6-22 14-22s14 8 14 22" />,
    return: <path d="M60 100a40 40 0 0 1 72-24M140 100a40 40 0 0 1-72 24M128 62l6 14-14 4M72 138l-6-14 14-4" />,
    wash: <path d="M100 50c20 26 36 42 36 62a36 36 0 0 1-72 0c0-20 16-36 36-62zM84 116a16 16 0 0 0 16 16" />,
  };
  return (
    <svg viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="100" cy="95" r="62" fill="var(--color-bg-canvas)" stroke="none" />
      {paths[kind]}
    </svg>
  );
}

const people = [{ name: "Ana Lima" }, { name: "Bruno Reis" }, { name: "Carla Dias" }];

type Step = { number: string; title: string; kind: "order" | "return" | "wash" };

const steps: Step[] = [
  { number: "01", title: "Peça no restaurante parceiro", kind: "order" },
  { number: "02", title: "Devolva em qualquer ponto da rede", kind: "return" },
  { number: "03", title: "A gente higieniza e devolve ao ciclo", kind: "wash" },
];

function Card({ step, tone }: { step: Step; tone?: "gray" | "mint" }) {
  const id = `step-${step.number}`;
  return (
    <FeatureCard.Root tone={tone} aria-labelledby={id}>
      <FeatureCard.Content>
        <FeatureCard.Meta>
          <Badge tone="white">{step.number}</Badge>
          <AvatarGroup people={people} max={3} size="sm" />
          <IconButton label={`Ver detalhes do passo ${Number(step.number)}`} variant="primary">
            <Plus />
          </IconButton>
        </FeatureCard.Meta>
        <FeatureCard.Title id={id}>{step.title}</FeatureCard.Title>
      </FeatureCard.Content>
      <FeatureCard.Media>
        <Illustration kind={step.kind} />
      </FeatureCard.Media>
    </FeatureCard.Root>
  );
}

function Sequence({ tone }: { tone?: "gray" | "mint" }) {
  return (
    <Container>
      <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))" }}>
        {steps.map((step) => (
          <Card key={step.number} step={step} tone={tone} />
        ))}
      </div>
    </Container>
  );
}

function LongText() {
  return (
    <Container>
      <Card step={{ number: "01", title: "Peça no restaurante parceiro e escolha o ponto de retirada mais próximo", kind: "order" }} />
    </Container>
  );
}

const meta = {
  title: "Componentes/Card de destaque",
  component: Sequence,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sequence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComoFunciona: Story = {};

export const Mint: Story = { args: { tone: "mint" } };

export const TextoLongo: Story = { render: () => <LongText /> };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import { Button, ButtonIcon, ButtonLink } from "./Button";
import { IconButton } from "./IconButton";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z" />
    <path d="M4 20c3-6 6-9 11-11" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </svg>
);

const meta = {
  title: "Componentes/Botões",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: { variant: "dark", children: "Fale com a gente" },
};

export const Primary: Story = {
  args: { variant: "primary", children: "Fale com a gente" },
};

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Button {...args}>
      Quero ser parceiro
      <ButtonIcon>
        <LeafIcon />
      </ButtonIcon>
    </Button>
  ),
};

export const Ghost: Story = {
  args: { variant: "ghost" },
  render: (args) => (
    <Button {...args}>
      Saiba mais
      <ButtonIcon tone="dark">
        <ArrowIcon />
      </ButtonIcon>
    </Button>
  ),
};

export const Link: Story = {
  render: () => <ButtonLink href="#contato">Fale com a gente</ButtonLink>,
};

export const IconButtons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-4)" }}>
      {(["outline", "mint", "primary", "dark"] as const).map((variant) => (
        <IconButton key={variant} label="Mudar idioma" variant={variant}>
          <GlobeIcon />
        </IconButton>
      ))}
    </div>
  ),
};

const NarrowContainer = ({ children }: { children: ReactNode }) => (
  <div style={{ width: "280px" }}>{children}</div>
);

export const LongText: Story = {
  name: "Texto longo",
  args: { variant: "outline" },
  decorators: [(Story) => <NarrowContainer>{Story()}</NarrowContainer>],
  render: (args) => (
    <Button {...args}>
      Quero cadastrar meu restaurante na rede eFood
      <ButtonIcon>
        <ArrowIcon />
      </ButtonIcon>
    </Button>
  ),
};

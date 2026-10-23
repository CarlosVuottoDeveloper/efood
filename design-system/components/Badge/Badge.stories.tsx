import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Componentes/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem", background: "var(--color-bg-page)" }}>
      <Badge tone="white">01</Badge>
      <Badge tone="gray">+90 avaliações</Badge>
      <Badge tone="mint">+90 avaliações</Badge>
    </div>
  ),
};

export const Branco: Story = { args: { tone: "white", children: "01" } };
export const Cinza: Story = { args: { tone: "gray", children: "+90 avaliações" } };
export const Menta: Story = { args: { tone: "mint", children: "+90 avaliações" } };

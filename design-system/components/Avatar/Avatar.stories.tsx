import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import vivendi from "@/public/img/vivendi.webp";
import { Badge } from "../Badge/Badge";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

const people = [
  { name: "Maria Costa" },
  { name: "João Pereira" },
  { name: "Ana Beatriz Souza" },
  { name: "Thaynara" },
  { name: "Carlos Lima" },
];

const meta = {
  title: "Componentes/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { person: people[0] },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Iniciais: Story = {};

export const ComFoto: Story = {
  args: { person: { name: "Maria Costa", src: vivendi } },
};

export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar person={people[0]} size="sm" />
      <Avatar person={people[0]} size="md" />
    </div>
  ),
};

export const GrupoSemExcedente: Story = {
  render: () => <AvatarGroup people={people.slice(0, 3)} />,
};

export const GrupoComExcedente: Story = {
  render: () => <AvatarGroup people={people} />,
};

export const ProvaSocial: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <AvatarGroup people={people} max={3} />
      <Badge tone="gray">+90 avaliações</Badge>
    </div>
  ),
};

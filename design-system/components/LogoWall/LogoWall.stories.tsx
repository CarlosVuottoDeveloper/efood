import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "../Layout/Container";
import { LogoWall } from "./LogoWall";

const names = ["Café Vila", "Cantina Lume", "Bistrô Raiz", "Padaria Grão", "Sabor da Feira", "Horta Urbana"];

function Wall() {
  return (
    <Container>
      <LogoWall.Root label="Restaurantes parceiros">
        {names.map((name, index) => (
          <LogoWall.Item key={name} variant={index === 0 ? "featured" : "default"}>
            <span translate="no">{name}</span>
          </LogoWall.Item>
        ))}
      </LogoWall.Root>
    </Container>
  );
}

const meta = {
  title: "Componentes/Grade de logos",
  component: Wall,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Wall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

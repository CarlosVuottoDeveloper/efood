import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Display } from "./Display";
import { Emphasis } from "./Emphasis";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";
import { Highlight } from "./Highlight";
import { Text } from "./Text";

const meta = {
  title: "Componentes/Tipografia",
  component: Display,
  tags: ["autodocs"],
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayWithHighlight: Story = {
  name: "Display",
  render: (args) => (
    <Display {...args}>
      Comida boa, embalagem que <Highlight>volta</Highlight>
    </Display>
  ),
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <Heading level={2}>Título de seção</Heading>
      <Heading level={3}>Título de card</Heading>
      <Heading level={4}>Título pequeno</Heading>
      <Heading level={2} size="sm">Nível 2 com tamanho pequeno</Heading>
    </div>
  ),
};

export const TextVariants: Story = {
  name: "Text",
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      {(["lead", "body", "small"] as const).flatMap((size) =>
        (["default", "muted"] as const).map((tone) => (
          <Text key={`${size}-${tone}`} size={size} tone={tone}>
            Texto {size} em tom {tone}: embalagens reutilizáveis que chegam até a sua{" "}
            <Emphasis>porta</Emphasis> e voltam para o restaurante.
          </Text>
        )),
      )}
    </div>
  ),
};

export const EyebrowStory: Story = {
  name: "Eyebrow",
  render: () => <Eyebrow>Como funciona</Eyebrow>,
};

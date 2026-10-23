import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Eyebrow } from "../Typography/Eyebrow";
import { Heading } from "../Typography/Heading";
import { Text } from "../Typography/Text";
import { Container } from "./Container";
import { PageCanvas } from "./PageCanvas";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { SkipLink } from "./SkipLink";

const meta = {
  title: "Componentes/Layout",
  component: Section,
  tags: ["autodocs"],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Canvas: Story = {
  args: { id: "exemplo" },
  parameters: { layout: "fullscreen" },
  render: () => (
    <PageCanvas>
      <SkipLink />
      <main id="main">
        <Section id="sobre" aria-labelledby="sobre-title">
          <Container>
            <SectionHeader>
              <Eyebrow>Sobre nós</Eyebrow>
              <Heading level={2} id="sobre-title">Comida boa, sem lixo no caminho</Heading>
            </SectionHeader>
            <Text>Entregamos refeições em embalagens retornáveis que voltam para o ciclo.</Text>
          </Container>
        </Section>
      </main>
    </PageCanvas>
  ),
};

export const Plain: Story = {
  args: { id: "plain", tone: "plain", "aria-labelledby": "plain-title" },
  render: (args) => (
    <Section {...args}>
      <Container>
        <Heading level={2} id="plain-title">Seção simples</Heading>
        <Text>Fundo transparente, sem cantos arredondados.</Text>
      </Container>
    </Section>
  ),
};

export const Surface: Story = {
  args: { id: "surface", tone: "surface", "aria-labelledby": "surface-title" },
  render: (args) => (
    <Section {...args}>
      <Container>
        <Heading level={2} id="surface-title">Seção com superfície</Heading>
        <Text>Fundo de superfície com cantos arredondados.</Text>
      </Container>
    </Section>
  ),
};

export const CenteredHeader: Story = {
  args: { id: "parceiros" },
  render: () => (
    <SectionHeader align="center">
      <Eyebrow>Nossos parceiros</Eyebrow>
      <Heading level={2}>Restaurantes que já servem em embalagens que voltam</Heading>
    </SectionHeader>
  ),
};

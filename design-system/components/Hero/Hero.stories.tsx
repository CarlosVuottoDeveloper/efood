import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import lifecycle from "@/public/img/product-lifecycle.png";
import { ButtonIcon, ButtonLink } from "../Button/Button";
import { Container } from "../Layout/Container";
import { Display } from "../Typography/Display";
import { Emphasis } from "../Typography/Emphasis";
import { Highlight } from "../Typography/Highlight";
import { Text } from "../Typography/Text";
import { Hero } from "./Hero";

function Leaf() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function HeroExample() {
  return (
    <Container>
      <Hero.Root aria-labelledby="hero-title">
        <Hero.Content>
          <Display as="h1" id="hero-title">
            Comida boa, embalagem que <Highlight>volta</Highlight>
          </Display>
          <Text size="lead">
            Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros. Você <Emphasis>pede</Emphasis>,{" "}
            <Emphasis>devolve</Emphasis> e a gente higieniza.
          </Text>
          <Hero.Actions>
            <ButtonLink href="#partners" variant="outline">
              Quero ser parceiro
              <ButtonIcon><Leaf /></ButtonIcon>
            </ButtonLink>
            <ButtonLink href="#about" variant="ghost">
              Saiba mais
              <ButtonIcon tone="dark"><Arrow /></ButtonIcon>
            </ButtonLink>
          </Hero.Actions>
        </Hero.Content>
        <Hero.Media>
          <Image src={lifecycle} alt="Ciclo de vida da embalagem reutilizável" priority />
        </Hero.Media>
      </Hero.Root>
    </Container>
  );
}

const meta = {
  title: "Componentes/Hero",
  component: HeroExample,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HeroExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

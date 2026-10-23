import Image from "next/image";
import reusableContainers from "@/public/img/pexels/reusable-containers.webp";
import { ButtonIcon, ButtonLink, Container, Display, Emphasis, Hero, Highlight, Text } from "@/design-system";
import { ArrowIcon, LeafIcon } from "./icons";

export function HeroSection() {
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
              <ButtonIcon>
                <LeafIcon />
              </ButtonIcon>
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghost">
              Como funciona
              <ButtonIcon tone="dark">
                <ArrowIcon />
              </ButtonIcon>
            </ButtonLink>
          </Hero.Actions>
        </Hero.Content>
        <Hero.Media>
          <Image
            src={reusableContainers}
            alt="Potes verdes reutilizáveis com batatas, arroz, legumes e massa, e uma mão pegando um deles"
            sizes="(min-width: 960px) 45vw, 100vw"
            placeholder="blur"
            priority
          />
        </Hero.Media>
      </Hero.Root>
    </Container>
  );
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import logo from "@/public/img/logo.png";
import lifecycle from "@/public/img/product-lifecycle.png";
import spRestaurants from "@/public/img/sp-restaurants.jpg";
import {
  AvatarGroup,
  Badge,
  Button,
  ButtonIcon,
  ButtonLink,
  Checkbox,
  Container,
  Display,
  Emphasis,
  Eyebrow,
  FeatureCard,
  Field,
  Heading,
  Hero,
  Highlight,
  LogoWall,
  NavPills,
  PageCanvas,
  Section,
  SectionHeader,
  SiteHeader,
  SkipLink,
  Text,
} from "@/design-system";
import styles from "./LandingPage.module.css";

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type StepKind = "order" | "return" | "wash";

function StepIllustration({ kind }: { kind: StepKind }) {
  const paths = {
    order: <path d="M70 70h60l-6 50H76zM86 70c0-14 6-22 14-22s14 8 14 22" />,
    return: <path d="M60 100a40 40 0 0 1 72-24M140 100a40 40 0 0 1-72 24M128 62l6 14-14 4M72 138l-6-14 14-4" />,
    wash: <path d="M100 50c20 26 36 42 36 62a36 36 0 0 1-72 0c0-20 16-36 36-62zM84 116a16 16 0 0 0 16 16" />,
  };
  return (
    <svg width="160" height="128" viewBox="0 0 200 160" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="100" cy="95" r="62" fill="var(--color-bg-canvas)" stroke="none" />
      {paths[kind]}
    </svg>
  );
}

const reviewers = [{ name: "Ana Lima" }, { name: "Bruno Reis" }, { name: "Carla Dias" }, { name: "Diego Souza" }];

const steps: { number: string; title: string; description: string; kind: StepKind }[] = [
  {
    number: "01",
    title: "Peça no restaurante parceiro",
    description: "Sua refeição chega numa embalagem durável, escolhida por higiene e segurança.",
    kind: "order",
  },
  {
    number: "02",
    title: "Devolva em qualquer ponto da rede",
    description: "Leve a embalagem a qualquer café ou restaurante parceiro e ganhe desconto na próxima compra.",
    kind: "return",
  },
  {
    number: "03",
    title: "A gente higieniza e devolve ao ciclo",
    description: "A embalagem volta limpa para a rede e substitui mais um descartável.",
    kind: "wash",
  },
];

const partners = ["Café Vila", "Cantina Lume", "Bistrô Raiz", "Padaria Grão", "Sabor da Feira"];

function LandingPage() {
  return (
    <>
      <SkipLink />
      <PageCanvas>
        <SiteHeader.Root>
          <SiteHeader.Brand href="#main">
            <Image src={logo} alt="" width={32} height={32} />
            eFood
          </SiteHeader.Brand>
          <NavPills.Root label="Principal">
            <NavPills.Item href="#main" current>
              Início
            </NavPills.Item>
            <NavPills.Item href="#about-us">Sobre nós</NavPills.Item>
            <NavPills.Item href="#eco-restaurants">Restaurantes</NavPills.Item>
            <NavPills.Item href="#partners">Parceiros</NavPills.Item>
          </NavPills.Root>
          <SiteHeader.Actions>
            <SiteHeader.SocialProof>
              <AvatarGroup people={reviewers} size="sm" />
              <Badge tone="gray">+90 avaliações</Badge>
            </SiteHeader.SocialProof>
            <ButtonLink href="#partners" variant="dark">
              Fale com a gente
            </ButtonLink>
          </SiteHeader.Actions>
        </SiteHeader.Root>

        <main id="main">
          <Container>
            <Hero.Root aria-labelledby="hero-title">
              <Hero.Content>
                <Display as="h1" id="hero-title">
                  Comida boa, embalagem que <Highlight>volta</Highlight>
                </Display>
                <Text size="lead">
                  Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros. Você{" "}
                  <Emphasis>pede</Emphasis>, <Emphasis>devolve</Emphasis> e a gente higieniza.
                </Text>
                <Hero.Actions>
                  <ButtonLink href="#partners" variant="outline">
                    Quero ser parceiro
                    <ButtonIcon>
                      <LeafIcon />
                    </ButtonIcon>
                  </ButtonLink>
                  <ButtonLink href="#about-us" variant="ghost">
                    Saiba mais
                    <ButtonIcon tone="dark">
                      <ArrowIcon />
                    </ButtonIcon>
                  </ButtonLink>
                </Hero.Actions>
              </Hero.Content>
              <Hero.Media>
                <Image
                  className={styles.photo}
                  src={lifecycle}
                  alt="Ciclo de vida da embalagem: a eFood fornece a embalagem retornável, o restaurante parceiro serve nela e o cliente ganha desconto ao devolver"
                  sizes="(min-width: 960px) 50vw, 100vw"
                  priority
                />
              </Hero.Media>
            </Hero.Root>
          </Container>

          <Section id="about-us" aria-labelledby="about-us-title">
            <Container>
              <div className={styles.split} data-align="start">
                <SectionHeader>
                  <Eyebrow>Sobre nós</Eyebrow>
                  <Heading level={2} id="about-us-title">
                    Uso compartilhado, menos recursos, menos desperdício
                  </Heading>
                  <Text size="lead" tone="muted">
                    A eFood substitui as embalagens descartáveis de uso único por versões reutilizáveis equivalentes,
                    gerenciadas e compartilhadas pela rede de cafés e restaurantes que já existe.
                  </Text>
                </SectionHeader>
                <div className={styles.topics}>
                  <div className={styles.topic}>
                    <Heading level={3} size="sm">
                      Por que devolver?
                    </Heading>
                    <Text tone="muted">
                      Devolver e reutilizar evita que a embalagem de uso único chegue ao aterro e reduz o uso de
                      recursos e as perdas da reciclagem. Devolver é como reciclar, só que muito melhor.
                    </Text>
                  </div>
                  <div className={styles.topic}>
                    <Heading level={3} size="sm">
                      Feitas para durar
                    </Heading>
                    <Text tone="muted">
                      Usamos um conjunto compartilhado de produtos e materiais escolhidos por higiene, segurança e
                      durabilidade.
                    </Text>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          <Section id="eco-restaurants" tone="surface" aria-labelledby="eco-restaurants-title">
            <Container>
              <div className={styles.split}>
                <div className={styles.stack}>
                  <SectionHeader>
                    <Eyebrow>Restaurantes ecológicos</Eyebrow>
                    <Heading level={2} id="eco-restaurants-title">
                      Seu restaurante reconhecido pelo cuidado com a embalagem
                    </Heading>
                  </SectionHeader>
                  <Text size="lead">
                    O restaurante parceiro passa a ser reconhecido pela responsabilidade com as embalagens dos seus
                    produtos e paga só um valor mensal pelo compartilhamento delas.
                  </Text>
                  <ButtonLink href="#partners" variant="primary">
                    Quero ser parceiro
                  </ButtonLink>
                </div>
                <Image
                  className={styles.photo}
                  src={spRestaurants}
                  alt="Salão de um restaurante vegano parceiro em São Paulo"
                  sizes="(min-width: 960px) 50vw, 100vw"
                />
              </div>
            </Container>
          </Section>

          <Section id="how-it-works" aria-labelledby="how-it-works-title">
            <Container width="narrow">
              <SectionHeader align="center">
                <Eyebrow>Como funciona</Eyebrow>
                <Heading level={2} id="how-it-works-title">
                  Três passos e a embalagem volta para o ciclo
                </Heading>
              </SectionHeader>
              <ol role="list" className={styles.steps}>
                {steps.map((step) => (
                  <li key={step.number}>
                    <FeatureCard.Root aria-labelledby={`step-${step.number}`}>
                      <FeatureCard.Content>
                        <FeatureCard.Meta>
                          <Badge tone="white">{step.number}</Badge>
                        </FeatureCard.Meta>
                        <FeatureCard.Title id={`step-${step.number}`}>{step.title}</FeatureCard.Title>
                        <Text tone="muted">{step.description}</Text>
                      </FeatureCard.Content>
                      <FeatureCard.Media>
                        <StepIllustration kind={step.kind} />
                      </FeatureCard.Media>
                    </FeatureCard.Root>
                  </li>
                ))}
              </ol>
            </Container>
          </Section>

          <Section id="partner-network" aria-labelledby="partner-network-title">
            <Container>
              <SectionHeader align="center">
                <Eyebrow>Nossos parceiros</Eyebrow>
                <Heading level={2} id="partner-network-title">
                  Restaurantes que já servem em embalagens que voltam
                </Heading>
              </SectionHeader>
              <LogoWall.Root label="Restaurantes parceiros" className={styles.wall}>
                {partners.map((name, index) => (
                  <LogoWall.Item key={name} variant={index === 0 ? "featured" : "default"}>
                    <span translate="no">{name}</span>
                  </LogoWall.Item>
                ))}
              </LogoWall.Root>
            </Container>
          </Section>

          <Section id="partners" tone="surface" aria-labelledby="partners-title">
            <Container>
              <div className={styles.split} data-align="start">
                <SectionHeader>
                  <Eyebrow>Seja parceiro</Eyebrow>
                  <Heading level={2} id="partners-title">
                    Leve as embalagens que voltam para o seu restaurante
                  </Heading>
                  <Text size="lead" tone="muted">
                    Conte um pouco sobre o seu negócio. A gente responde com uma proposta para a sua operação.
                  </Text>
                </SectionHeader>
                <form className={styles.form}>
                  <Field.Root>
                    <Field.Label>Nome</Field.Label>
                    <Field.Input name="name" autoComplete="name" />
                    <Field.Message />
                  </Field.Root>
                  <Field.Root hint="Usaremos para enviar o contato comercial">
                    <Field.Label>E-mail</Field.Label>
                    <Field.Input name="email" type="email" autoComplete="email" spellCheck={false} />
                    <Field.Message />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Telefone</Field.Label>
                    <Field.Input name="phone" type="tel" autoComplete="tel" />
                    <Field.Message />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Mensagem</Field.Label>
                    <Field.Textarea name="message" />
                    <Field.Message />
                  </Field.Root>
                  <Checkbox name="receiveEmails">Quero receber os e-mails informativos da eFood</Checkbox>
                  <div>
                    <Button variant="primary" type="submit">
                      Quero ser parceiro
                    </Button>
                  </div>
                </form>
              </div>
            </Container>
          </Section>
        </main>

        <footer className={styles.footer}>
          <Container>
            <Text size="small" tone="muted">
              <span translate="no">eFood</span> · Embalagens reutilizáveis compartilhadas pela rede de restaurantes
              parceiros.
            </Text>
          </Container>
        </footer>
      </PageCanvas>
    </>
  );
}

const meta = {
  title: "Exemplos/Landing page",
  component: LandingPage,
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile320", isRotated: false } },
};

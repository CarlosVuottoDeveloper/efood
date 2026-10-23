import { Badge, Container, Eyebrow, FeatureCard, Heading, Section, SectionHeader, Text } from "@/design-system";
import { StepIllustration, type StepKind } from "./icons";
import styles from "./landing.module.css";

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

export function HowItWorksSection() {
  return (
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
  );
}

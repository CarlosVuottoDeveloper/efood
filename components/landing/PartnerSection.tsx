import { Container, Eyebrow, Heading, Section, SectionHeader, Text } from "@/design-system";
import { PartnerForm } from "./PartnerForm";
import styles from "./landing.module.css";

export function PartnerSection() {
  return (
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
          <PartnerForm />
        </div>
      </Container>
    </Section>
  );
}

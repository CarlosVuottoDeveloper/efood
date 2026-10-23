import Image from "next/image";
import netBags from "@/public/img/pexels/net-bags.webp";
import { Container, Eyebrow, Heading, Section, SectionHeader, Text } from "@/design-system";
import styles from "./landing.module.css";

export function AboutSection() {
  return (
    <Section id="about-us" aria-labelledby="about-us-title">
      <Container>
        <div className={styles.split}>
          <div className={styles.stack}>
            <SectionHeader>
              <Eyebrow>Sobre nós</Eyebrow>
              <Heading level={2} id="about-us-title">
                Uso compartilhado, menos recursos, menos desperdício
              </Heading>
            </SectionHeader>
            <Text size="lead" tone="muted">
              A eFood substitui as embalagens descartáveis de uso único por versões reutilizáveis equivalentes,
              gerenciadas e compartilhadas pela rede de cafés e restaurantes que já existe.
            </Text>
            <div className={styles.topics}>
              <div className={styles.topic}>
                <Heading level={3} size="sm">
                  Por que devolver?
                </Heading>
                <Text tone="muted">
                  Devolver e reutilizar evita que a embalagem chegue ao aterro e reduz o uso de recursos e as perdas da
                  reciclagem. Devolver é como reciclar, só que muito melhor.
                </Text>
              </div>
              <div className={styles.topic}>
                <Heading level={3} size="sm">
                  Feitas para durar
                </Heading>
                <Text tone="muted">
                  Um conjunto compartilhado de embalagens e materiais escolhidos por higiene, segurança e durabilidade.
                </Text>
              </div>
            </div>
          </div>
          <Image
            className={styles.photo}
            src={netBags}
            alt="Sacolas de tecido reutilizáveis com limões, abacates e gengibre sobre uma mesa branca"
            sizes="(min-width: 960px) 45vw, 100vw"
            placeholder="blur"
          />
        </div>
      </Container>
    </Section>
  );
}

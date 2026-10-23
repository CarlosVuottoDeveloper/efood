import Image from "next/image";
import restaurantPlants from "@/public/img/pexels/restaurant-plants.webp";
import { ButtonLink, Container, Eyebrow, Heading, Section, SectionHeader, Text } from "@/design-system";
import styles from "./landing.module.css";

export function EcoRestaurantsSection() {
  return (
    <Section id="eco-restaurants" tone="surface" aria-labelledby="eco-restaurants-title">
      <Container>
        <div className={styles.split} data-media="start">
          <div className={styles.stack}>
            <SectionHeader>
              <Eyebrow>Restaurantes ecológicos</Eyebrow>
              <Heading level={2} id="eco-restaurants-title">
                Seu restaurante reconhecido pelo cuidado com a embalagem
              </Heading>
            </SectionHeader>
            <Text size="lead">
              O restaurante parceiro passa a ser reconhecido pela responsabilidade com as embalagens dos seus produtos e
              paga só um valor mensal pelo compartilhamento delas.
            </Text>
            <ButtonLink href="#partners" variant="primary">
              Quero ser parceiro
            </ButtonLink>
          </div>
          <Image
            className={styles.photo}
            src={restaurantPlants}
            alt="Salão de restaurante com vasos de plantas pendurados no teto e clientes nas mesas"
            sizes="(min-width: 960px) 45vw, 100vw"
            placeholder="blur"
          />
        </div>
      </Container>
    </Section>
  );
}

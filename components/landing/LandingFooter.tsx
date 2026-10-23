import { Container, Text } from "@/design-system";
import styles from "./landing.module.css";

const photoCredits = [
  { author: "Justin Doherty", href: "https://www.pexels.com/photo/containers-with-prepared-food-4929705/" },
  { author: "Karola G", href: "https://www.pexels.com/photo/food-in-net-bags-5852201/" },
  { author: "Rachel Claire", href: "https://www.pexels.com/photo/hanging-plants-inside-a-restaurant-5531035/" },
];

export function LandingFooter() {
  return (
    <footer>
      <Container className={styles.footer}>
        <Text size="small" tone="muted">
          <span translate="no">eFood</span>: embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros.
        </Text>
        <Text size="small" tone="muted">
          Fotos de{" "}
          {photoCredits.map((credit, index) => (
            <span key={credit.author}>
              {index > 0 && (index === photoCredits.length - 1 ? " e " : ", ")}
              <a href={credit.href}>{credit.author}</a>
            </span>
          ))}{" "}
          no <span translate="no">Pexels</span>.
        </Text>
      </Container>
    </footer>
  );
}

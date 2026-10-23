import { Container } from "@/design-system";
import { Poll } from "./Poll";
import styles from "./landing.module.css";

/* Sem o padding de topo de Section: a seção anterior já dá o respiro. */
export function PollSection() {
  return (
    <section className={styles.pollSection} aria-labelledby="poll-title">
      <Container width="narrow">
        <Poll />
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Button, Heading, Text } from "@/design-system";
import styles from "./landing.module.css";

export function Poll() {
  const [answered, setAnswered] = useState(false);

  return (
    <div className={styles.poll} role="group" aria-labelledby="poll-title">
      <Heading level={2} size="md" id="poll-title">
        Você gosta da ideia de usar embalagens retornáveis nas suas refeições?
      </Heading>
      {!answered && (
        <div className={styles.pollActions}>
          <Button variant="primary" onClick={() => setAnswered(true)}>
            Sim, usaria
          </Button>
          <Button variant="outline" onClick={() => setAnswered(true)}>
            Ainda não sei
          </Button>
        </div>
      )}
      <Text role="status">{answered ? "Obrigado por responder! Sua opinião ajuda a eFood a crescer." : ""}</Text>
    </div>
  );
}

"use client";

import { useEffect } from "react";

const DELAY_MS = 10_000;
const QUESTION =
  "Calma não é virus é só uma enquete: Você gosta da ideia de utilizar embalagens retornáveis em suas refeições?";

export default function Poll() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.confirm(QUESTION);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

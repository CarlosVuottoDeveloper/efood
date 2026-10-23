import type { ReactNode } from "react";
import styles from "./Layout.module.css";

export type SkipLinkProps = { href?: string; children?: ReactNode };

export function SkipLink({ href = "#main", children = "Pular para o conteúdo" }: SkipLinkProps) {
  return (
    <a href={href} className={styles.skipLink}>
      {children}
    </a>
  );
}

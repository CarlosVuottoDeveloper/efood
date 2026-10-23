import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Layout.module.css";

export type SkipLinkProps = ComponentProps<"a">;

export function SkipLink({
  href = "#main",
  children = "Pular para o conteúdo",
  className,
  ...rest
}: SkipLinkProps) {
  return (
    <a {...rest} href={href} className={cx(styles.skipLink, className)}>
      {children}
    </a>
  );
}

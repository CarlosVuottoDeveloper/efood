import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Layout.module.css";

export type SectionProps = ComponentProps<"section"> & {
  id: string;
  tone?: "plain" | "surface";
};

export function Section({ tone = "plain", className, ...rest }: SectionProps) {
  return <section {...rest} data-tone={tone} className={cx(styles.section, className)} />;
}

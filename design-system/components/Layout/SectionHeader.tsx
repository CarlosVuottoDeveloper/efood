import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Layout.module.css";

export type SectionHeaderProps = ComponentProps<"div"> & { align?: "start" | "center" };

export function SectionHeader({ align = "start", className, ...rest }: SectionHeaderProps) {
  return <div {...rest} data-align={align} className={cx(styles.sectionHeader, className)} />;
}

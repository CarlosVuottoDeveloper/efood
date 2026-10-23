import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Badge.module.css";

export type BadgeProps = ComponentProps<"span"> & { tone?: "white" | "gray" | "mint" };

export function Badge({ tone = "white", className, ...rest }: BadgeProps) {
  return <span {...rest} data-tone={tone} className={cx(styles.badge, className)} />;
}

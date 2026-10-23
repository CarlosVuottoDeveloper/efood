import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Typography.module.css";

export type DisplayProps = ComponentProps<"h1"> & { as?: "h1" | "h2" };

export function Display({ as: Tag = "h1", className, ...rest }: DisplayProps) {
  return <Tag {...rest} className={cx(styles.display, className)} />;
}

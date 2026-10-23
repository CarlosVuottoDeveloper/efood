import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Typography.module.css";

export function Highlight({ className, ...rest }: ComponentProps<"span">) {
  return <span {...rest} className={cx(styles.highlight, className)} />;
}

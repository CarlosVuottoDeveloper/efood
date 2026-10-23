import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Typography.module.css";

export function Emphasis({ className, ...rest }: ComponentProps<"em">) {
  return <em {...rest} className={cx(styles.emphasis, className)} />;
}

import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Typography.module.css";

export function Eyebrow({ className, ...rest }: ComponentProps<"p">) {
  return <p {...rest} className={cx(styles.eyebrow, className)} />;
}

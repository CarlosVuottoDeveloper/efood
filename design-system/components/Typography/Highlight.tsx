import type { ComponentProps } from "react";
import styles from "./Typography.module.css";

export function Highlight({ className, ...rest }: ComponentProps<"span">) {
  return <span {...rest} className={[styles.highlight, className].filter(Boolean).join(" ")} />;
}

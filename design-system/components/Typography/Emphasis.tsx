import type { ComponentProps } from "react";
import styles from "./Typography.module.css";

export function Emphasis({ className, ...rest }: ComponentProps<"em">) {
  return <em {...rest} className={[styles.emphasis, className].filter(Boolean).join(" ")} />;
}

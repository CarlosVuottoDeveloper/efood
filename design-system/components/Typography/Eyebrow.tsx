import type { ComponentProps } from "react";
import styles from "./Typography.module.css";

export function Eyebrow({ className, ...rest }: ComponentProps<"p">) {
  return <p {...rest} className={[styles.eyebrow, className].filter(Boolean).join(" ")} />;
}

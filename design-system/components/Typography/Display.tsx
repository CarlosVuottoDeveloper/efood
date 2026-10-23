import type { ComponentProps } from "react";
import styles from "./Typography.module.css";

export type DisplayProps = ComponentProps<"h1"> & { as?: "h1" | "h2" };

export function Display({ as: Tag = "h1", className, ...rest }: DisplayProps) {
  return <Tag {...rest} className={[styles.display, className].filter(Boolean).join(" ")} />;
}

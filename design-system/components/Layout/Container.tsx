import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Layout.module.css";

export type ContainerProps = ComponentProps<"div"> & { width?: "default" | "narrow" };

export function Container({ width = "default", className, ...rest }: ContainerProps) {
  return <div {...rest} data-width={width} className={cx(styles.container, className)} />;
}

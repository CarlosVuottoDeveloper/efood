import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Typography.module.css";

export type TextProps = ComponentProps<"p"> & {
  size?: "lead" | "body" | "small";
  tone?: "default" | "muted";
  as?: "p" | "span";
};

export function Text({ size = "body", tone = "default", as: Tag = "p", className, ...rest }: TextProps) {
  return (
    <Tag
      {...rest}
      data-size={size}
      data-tone={tone}
      className={cx(styles.text, className)}
    />
  );
}

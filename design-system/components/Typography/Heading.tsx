import type { ComponentProps } from "react";
import styles from "./Typography.module.css";

export type HeadingSize = "lg" | "md" | "sm";
export type HeadingProps = ComponentProps<"h2"> & {
  level: 2 | 3 | 4;
  size?: HeadingSize;
};

const defaultSize: Record<HeadingProps["level"], HeadingSize> = { 2: "lg", 3: "md", 4: "sm" };

export function Heading({ level, size, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      {...rest}
      data-size={size ?? defaultSize[level]}
      className={[styles.heading, className].filter(Boolean).join(" ")}
    />
  );
}

import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./LogoWall.module.css";

function Root({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <ul aria-label={label} className={cx(styles.root, className)}>
      {children}
    </ul>
  );
}

function Item({ variant = "default", className, ...rest }: ComponentProps<"li"> & { variant?: "default" | "featured" }) {
  return <li {...rest} data-variant={variant} className={cx(styles.item, className)} />;
}

export const LogoWall = { Root, Item };

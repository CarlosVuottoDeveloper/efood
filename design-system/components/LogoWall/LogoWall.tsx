import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./LogoWall.module.css";

function Root({ label, className, ...rest }: ComponentProps<"ul"> & { label: string }) {
  return <ul {...rest} aria-label={label} className={cx(styles.root, className)} />;
}

function Item({ variant = "default", className, ...rest }: ComponentProps<"li"> & { variant?: "default" | "featured" }) {
  return <li {...rest} data-variant={variant} className={cx(styles.item, className)} />;
}

export const LogoWall = { Root, Item };

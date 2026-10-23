import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./FeatureCard.module.css";

function Root({ tone = "gray", className, ...rest }: ComponentProps<"article"> & { tone?: "gray" | "mint" }) {
  return <article {...rest} data-tone={tone} className={cx(styles.root, className)} />;
}

function Meta({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.meta, className)} />;
}

function Title({ as: Tag = "h3", className, ...rest }: ComponentProps<"h3"> & { as?: "h3" | "h4" }) {
  return <Tag {...rest} className={cx(styles.title, className)} />;
}

function Media({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.media, className)} />;
}

export const FeatureCard = { Root, Meta, Title, Media };

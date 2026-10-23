import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Hero.module.css";

function Root({ className, ...rest }: ComponentProps<"section">) {
  return <section {...rest} className={cx(styles.root, className)} />;
}

function Content({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.content, className)} />;
}

function Actions({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.actions, className)} />;
}

function Media({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.media, className)} />;
}

export const Hero = { Root, Content, Actions, Media };

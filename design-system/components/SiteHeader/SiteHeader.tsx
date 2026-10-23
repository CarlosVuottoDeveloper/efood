import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./SiteHeader.module.css";

function Root({ className, ...rest }: ComponentProps<"header">) {
  return <header {...rest} className={cx(styles.root, className)} />;
}

type SiteHeaderBrandProps = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  href: string;
  children: ReactNode;
};

function Brand({ className, ...rest }: SiteHeaderBrandProps) {
  return <Link translate="no" {...rest} className={cx(styles.brand, className)} />;
}

function Actions({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.actions, className)} />;
}

function SocialProof({ className, ...rest }: ComponentProps<"div">) {
  return <div {...rest} className={cx(styles.socialProof, className)} />;
}

export const SiteHeader = { Root, Brand, Actions, SocialProof };
export type { SiteHeaderBrandProps };

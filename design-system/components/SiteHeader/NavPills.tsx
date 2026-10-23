import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./SiteHeader.module.css";

type NavPillsRootProps = Omit<ComponentProps<"nav">, "aria-label"> & {
  label: string;
  children: ReactNode;
};

function Root({ label, children, className, ...rest }: NavPillsRootProps) {
  return (
    <nav {...rest} aria-label={label} className={cx(styles.nav, className)}>
      <ul className={styles.navList}>{children}</ul>
    </nav>
  );
}

type NavPillsItemProps = ComponentProps<"a"> & {
  href: string;
  current?: boolean;
};

function Item({ current, className, ...rest }: NavPillsItemProps) {
  return (
    <li className={styles.navItem}>
      <a {...rest} aria-current={current ? "location" : undefined} className={cx(styles.navLink, className)} />
    </li>
  );
}

export const NavPills = { Root, Item };
export type { NavPillsRootProps, NavPillsItemProps };

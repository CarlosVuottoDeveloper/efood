import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Button.module.css";

export type ButtonVariant = "dark" | "primary" | "outline" | "ghost";

export type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };
export type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant };
export type ButtonIconProps = Omit<ComponentProps<"span">, "children"> & {
  children: ReactNode;
  tone?: "primary" | "dark";
};

export function Button({ variant = "dark", type = "button", className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      data-variant={variant}
      className={cx(styles.button, className)}
    />
  );
}

export function ButtonLink({ variant = "dark", className, ...rest }: ButtonLinkProps) {
  return <Link {...rest} data-variant={variant} className={cx(styles.button, className)} />;
}

export function ButtonIcon({ tone = "primary", className, ...rest }: ButtonIconProps) {
  return <span {...rest} aria-hidden="true" data-tone={tone} className={cx(styles.icon, className)} />;
}

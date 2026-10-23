import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Button.module.css";

export type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  label: string;
  variant?: "outline" | "mint" | "primary" | "dark";
};

export function IconButton({ label, variant = "outline", type = "button", className, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-label={label}
      data-variant={variant}
      className={cx(styles.iconButton, className)}
    />
  );
}

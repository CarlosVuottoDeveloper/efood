import type { ComponentProps, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Field.module.css";

export type CheckboxProps = Omit<ComponentProps<"input">, "type" | "children"> & {
  children: ReactNode;
};

export function Checkbox({ className, children, ...rest }: CheckboxProps) {
  return (
    <label className={cx(styles.checkbox, className)}>
      <input {...rest} type="checkbox" className={styles.checkboxInput} />
      <span>{children}</span>
    </label>
  );
}

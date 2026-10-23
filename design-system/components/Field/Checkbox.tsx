import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Field.module.css";

export type CheckboxProps = Omit<ComponentProps<"input">, "type" | "className"> & {
  className?: string;
};

export function Checkbox({ className, children, ...rest }: CheckboxProps) {
  return (
    <label className={cx(styles.checkbox, className)}>
      <input {...rest} type="checkbox" className={styles.checkboxInput} />
      <span>{children}</span>
    </label>
  );
}

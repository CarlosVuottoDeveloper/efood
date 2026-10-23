import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Layout.module.css";

export function PageCanvas({ children, className, ...rest }: ComponentProps<"div">) {
  return (
    <div {...rest} className={cx(styles.page, className)}>
      <div className={styles.canvas}>{children}</div>
    </div>
  );
}

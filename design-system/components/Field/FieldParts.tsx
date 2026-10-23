"use client";

import { createContext, use, useId, type ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Field.module.css";

type FieldContextValue = {
  id: string;
  messageId: string;
  hint?: string;
  error?: string;
};

const FieldContext = createContext<FieldContextValue | null>(null);

function useField() {
  const context = use(FieldContext);
  if (!context) throw new Error("Field.* deve ser usado dentro de Field.Root");
  return context;
}

export type FieldRootProps = ComponentProps<"div"> & { hint?: string; error?: string };

export function FieldRoot({ hint, error, className, children, ...rest }: FieldRootProps) {
  const id = useId();
  return (
    <FieldContext value={{ id, messageId: `${id}-message`, hint, error }}>
      <div {...rest} className={cx(styles.root, className)}>
        {children}
      </div>
    </FieldContext>
  );
}

export function FieldLabel({ className, ...rest }: ComponentProps<"label">) {
  const { id } = useField();
  return <label htmlFor={id} {...rest} className={cx(styles.label, className)} />;
}

function controlProps(field: FieldContextValue) {
  return {
    id: field.id,
    "aria-invalid": field.error ? (true as const) : undefined,
    "aria-describedby": field.hint || field.error ? field.messageId : undefined,
  };
}

export function FieldInput({ className, ...rest }: ComponentProps<"input">) {
  const field = useField();
  return <input {...rest} {...controlProps(field)} className={cx(styles.control, className)} />;
}

export function FieldTextarea({ className, ...rest }: ComponentProps<"textarea">) {
  const field = useField();
  return <textarea {...rest} {...controlProps(field)} className={cx(styles.control, styles.textarea, className)} />;
}

export function FieldMessage({ className, ...rest }: Omit<ComponentProps<"p">, "children">) {
  const { messageId, hint, error } = useField();
  return (
    <p
      {...rest}
      id={messageId}
      aria-live="polite"
      data-tone={error ? "error" : undefined}
      className={cx(styles.message, className)}
    >
      {error ? (
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3 2 20h20L12 3Z" />
          <path d="M12 10v5M12 18h.01" />
        </svg>
      ) : null}
      {error ?? hint}
    </p>
  );
}

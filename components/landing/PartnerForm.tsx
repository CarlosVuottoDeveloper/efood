"use client";

import { useState, type FormEvent } from "react";
import { Button, Checkbox, Field, Heading, Text } from "@/design-system";
import styles from "./landing.module.css";

type RequiredField = "name" | "email";
type FormErrors = Partial<Record<RequiredField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!String(data.get("name") ?? "").trim()) {
    errors.name = "Informe seu nome.";
  }
  if (!EMAIL_PATTERN.test(String(data.get("email") ?? "").trim())) {
    errors.email = "Informe um e-mail válido, como nome@restaurante.com.";
  }
  return errors;
}

export function PartnerForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = (["name", "email"] as const).find((field) => nextErrors[field]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    setSubmittedName(String(data.get("name")).trim());
  }

  function clearError(field: string) {
    if (field in errors) {
      setErrors(({ [field as RequiredField]: _removed, ...rest }) => rest);
    }
  }

  return (
    <div className={styles.formArea}>
      <div role="status">
        {submittedName !== null && (
          <div className={styles.success}>
            <Heading level={3} size="md">
              Obrigado pelo contato, {submittedName}!
            </Heading>
            <Text tone="muted">Já recebemos suas informações. A gente responde em breve com uma proposta.</Text>
          </div>
        )}
      </div>

      {submittedName === null && (
        <form
          className={styles.form}
          noValidate
          onSubmit={handleSubmit}
          onInput={(event) => clearError((event.target as HTMLInputElement).name)}
        >
          <Field.Root error={errors.name}>
            <Field.Label>Nome</Field.Label>
            <Field.Input name="name" autoComplete="name" />
            <Field.Message />
          </Field.Root>
          <Field.Root error={errors.email} hint="Usaremos só para o contato comercial.">
            <Field.Label>E-mail</Field.Label>
            <Field.Input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="nome@restaurante.com…"
            />
            <Field.Message />
          </Field.Root>
          <Field.Root hint="Opcional.">
            <Field.Label>Telefone</Field.Label>
            <Field.Input name="phone" type="tel" autoComplete="tel" />
            <Field.Message />
          </Field.Root>
          <Field.Root hint="Opcional. Conte o tipo de restaurante e quantas refeições para viagem saem por dia.">
            <Field.Label>Mensagem</Field.Label>
            <Field.Textarea name="message" rows={5} />
            <Field.Message />
          </Field.Root>
          <Checkbox name="receiveEmails">Quero receber os e-mails informativos da eFood</Checkbox>
          <div>
            <Button variant="primary" type="submit">
              Quero ser parceiro
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

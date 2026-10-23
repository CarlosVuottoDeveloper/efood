import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";
import { Field } from "./Field";

describe("Field", () => {
  it("Label se associa ao Input", () => {
    render(
      <Field.Root>
        <Field.Label>Nome</Field.Label>
        <Field.Input />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome").tagName).toBe("INPUT");
  });

  it("Label se associa ao Textarea", () => {
    render(
      <Field.Root>
        <Field.Label>Mensagem</Field.Label>
        <Field.Textarea />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Mensagem").tagName).toBe("TEXTAREA");
  });

  it("sem hint nem erro, não há aria-describedby", () => {
    render(
      <Field.Root>
        <Field.Label>Nome</Field.Label>
        <Field.Input />
        <Field.Message />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome")).not.toHaveAttribute("aria-describedby");
    expect(screen.getByLabelText("Nome")).not.toHaveAttribute("aria-invalid");
  });

  it("hint vira descrição acessível", () => {
    render(
      <Field.Root hint="Como aparece no cardápio">
        <Field.Label>Nome</Field.Label>
        <Field.Input />
        <Field.Message />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome")).toHaveAccessibleDescription("Como aparece no cardápio");
  });

  it("erro marca aria-invalid e vira a descrição", () => {
    render(
      <Field.Root error="Informe um e-mail válido, como nome@restaurante.com">
        <Field.Label>E-mail</Field.Label>
        <Field.Input type="email" />
        <Field.Message />
      </Field.Root>,
    );
    const input = screen.getByLabelText("E-mail");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Informe um e-mail válido, como nome@restaurante.com");
  });

  it("erro tem prioridade sobre hint", () => {
    render(
      <Field.Root hint="Dica" error="Erro">
        <Field.Label>Nome</Field.Label>
        <Field.Input />
        <Field.Message />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome")).toHaveAccessibleDescription("Erro");
  });

  it("mantém aria-describedby do consumidor sem hint nem erro", () => {
    render(
      <Field.Root>
        <Field.Label>Nome</Field.Label>
        <Field.Input aria-describedby="shipping-note" />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome")).toHaveAttribute("aria-describedby", "shipping-note");
  });

  it("combina aria-describedby do consumidor com o hint", () => {
    render(
      <Field.Root hint="Dica">
        <Field.Label>Nome</Field.Label>
        <Field.Input aria-describedby="note" />
        <Field.Message />
        <span id="note">Nota extra</span>
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome")).toHaveAccessibleDescription("Nota extra Dica");
  });

  it("mantém aria-invalid do consumidor sem erro", () => {
    render(
      <Field.Root>
        <Field.Label>Nome</Field.Label>
        <Field.Input aria-invalid="true" />
      </Field.Root>,
    );
    expect(screen.getByLabelText("Nome")).toHaveAttribute("aria-invalid", "true");
  });

  it("mensagem fica em região aria-live polite", () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Nome</Field.Label>
        <Field.Input />
        <Field.Message />
      </Field.Root>,
    );
    const message = container.querySelector("p");
    expect(message).toHaveAttribute("aria-live", "polite");
    expect(message).toBeEmptyDOMElement();
  });
});

describe("Checkbox", () => {
  it("clicar no texto do Checkbox marca a caixa", async () => {
    render(<Checkbox>Quero receber novidades</Checkbox>);
    await userEvent.click(screen.getByText("Quero receber novidades"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});

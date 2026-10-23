import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { Checkbox } from "./Checkbox";
import { Field } from "./Field";

const meta = {
  title: "Componentes/Formulário",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function PartnerForm({ emailError }: { emailError?: string }) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", maxWidth: "32rem" }}
    >
      <Field.Root>
        <Field.Label>Nome</Field.Label>
        <Field.Input autoComplete="name" />
        <Field.Message />
      </Field.Root>
      <Field.Root error={emailError} hint="Usaremos para enviar o contato comercial">
        <Field.Label>E-mail</Field.Label>
        <Field.Input type="email" autoComplete="email" spellCheck={false} defaultValue={emailError ? "nome@restaurante" : undefined} />
        <Field.Message />
      </Field.Root>
      <Field.Root>
        <Field.Label>Telefone</Field.Label>
        <Field.Input type="tel" autoComplete="tel" />
        <Field.Message />
      </Field.Root>
      <Field.Root>
        <Field.Label>Mensagem</Field.Label>
        <Field.Textarea />
        <Field.Message />
      </Field.Root>
      <Checkbox name="news">Quero receber novidades por e-mail</Checkbox>
      <div>
        <Button variant="primary" type="submit">Quero ser parceiro</Button>
      </div>
    </form>
  );
}

export const FormularioDeParceiro: Story = {
  name: "Formulário de parceiro",
  render: () => <PartnerForm />,
};

export const ComErro: Story = {
  name: "Com erro",
  render: () => <PartnerForm emailError="Informe um e-mail válido, como nome@restaurante.com" />,
};

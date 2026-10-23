import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PartnerForm } from "./PartnerForm";

describe("PartnerForm", () => {
  it("mostra erros nos campos obrigatórios e foca o primeiro", async () => {
    const user = userEvent.setup();
    render(<PartnerForm />);
    await user.click(screen.getByRole("button", { name: "Quero ser parceiro" }));

    const name = screen.getByLabelText("Nome");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Informe seu nome.");
    expect(screen.getByLabelText("E-mail")).toHaveAccessibleDescription(
      "Informe um e-mail válido, como nome@restaurante.com.",
    );
    expect(name).toHaveFocus();
  });

  it("recusa e-mail sem formato válido", async () => {
    const user = userEvent.setup();
    render(<PartnerForm />);
    await user.type(screen.getByLabelText("Nome"), "Maria");
    await user.type(screen.getByLabelText("E-mail"), "maria@");
    await user.click(screen.getByRole("button", { name: "Quero ser parceiro" }));

    const email = screen.getByLabelText("E-mail");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveFocus();
  });

  it("agradece pelo nome depois de enviar um formulário válido", async () => {
    const user = userEvent.setup();
    render(<PartnerForm />);
    await user.type(screen.getByLabelText("Nome"), "Maria");
    await user.type(screen.getByLabelText("E-mail"), "maria@restaurante.com");
    await user.click(screen.getByRole("button", { name: "Quero ser parceiro" }));

    expect(screen.getByRole("status")).toHaveTextContent("Obrigado pelo contato, Maria!");
    expect(screen.queryByRole("button", { name: "Quero ser parceiro" })).not.toBeInTheDocument();
  });
});

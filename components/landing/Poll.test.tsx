import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Poll } from "./Poll";

describe("Poll", () => {
  it("mostra a pergunta com as duas respostas", () => {
    render(<Poll />);
    expect(screen.getByRole("group", { name: /embalagens retornáveis/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sim, usaria" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ainda não sei" })).toBeInTheDocument();
  });

  it("agradece a resposta e troca os botões pela confirmação", async () => {
    const user = userEvent.setup();
    render(<Poll />);
    await user.click(screen.getByRole("button", { name: "Sim, usaria" }));

    expect(screen.getByRole("status")).toHaveTextContent("Obrigado por responder!");
    expect(screen.queryByRole("button", { name: "Sim, usaria" })).not.toBeInTheDocument();
  });
});

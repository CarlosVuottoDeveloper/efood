import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button, ButtonIcon, ButtonLink } from "./Button";
import { IconButton } from "./IconButton";

describe("Button", () => {
  it("IconButton exige label no tipo", () => {
    // @ts-expect-error label é obrigatório
    render(<IconButton>x</IconButton>);
  });

  it("Button tem type=button e data-variant=dark por padrão", () => {
    render(<Button>Fale com a gente</Button>);
    const button = screen.getByRole("button", { name: "Fale com a gente" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "dark");
  });

  it("Button chama onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Fale com a gente</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("ButtonLink renderiza link com href", () => {
    render(<ButtonLink href="/contato">Fale com a gente</ButtonLink>);
    const link = screen.getByRole("link", { name: "Fale com a gente" });
    expect(link).toHaveAttribute("href", "/contato");
    expect(link).toHaveAttribute("data-variant", "dark");
  });

  it("ButtonIcon fica escondido de leitores de tela", () => {
    render(
      <Button variant="outline">
        Quero ser parceiro
        <ButtonIcon data-testid="icon">→</ButtonIcon>
      </Button>,
    );
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("icon")).toHaveAttribute("data-tone", "primary");
    expect(screen.getByRole("button", { name: "Quero ser parceiro" })).toBeInTheDocument();
  });
});

describe("IconButton", () => {
  it("IconButton expõe label como nome acessível", () => {
    render(
      <IconButton label="Mudar idioma">
        <svg aria-hidden="true" />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Mudar idioma" })).toHaveAttribute("type", "button");
  });

  it("IconButton aplica data-variant", () => {
    render(
      <IconButton label="Mudar idioma" variant="mint">
        <svg aria-hidden="true" />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "mint");
  });
});

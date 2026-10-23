import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { ButtonLink } from "./Button";

// Marca os links que passam pelo roteador do Next para distinguir de um <a> nativo.
vi.mock("next/link", () => ({
  default: ({ href, ...rest }: ComponentProps<"a"> & { href: string }) => <a {...rest} href={href} data-router-link="" />,
}));

describe("ButtonLink", () => {
  it("âncora da mesma página usa <a> nativo, para o navegador rolar até a seção em todo clique", () => {
    render(<ButtonLink href="#partners">Quero ser parceiro</ButtonLink>);
    const link = screen.getByRole("link", { name: "Quero ser parceiro" });
    expect(link).toHaveAttribute("href", "#partners");
    expect(link).not.toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("data-variant", "dark");
  });

  it("rota de outra página continua usando next/link", () => {
    render(<ButtonLink href="/parceiros">Ver parceiros</ButtonLink>);
    expect(screen.getByRole("link", { name: "Ver parceiros" })).toHaveAttribute("data-router-link");
  });
});

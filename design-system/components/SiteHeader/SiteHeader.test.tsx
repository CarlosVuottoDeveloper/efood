import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavPills } from "./NavPills";
import { SiteHeader } from "./SiteHeader";

function Menu() {
  return (
    <NavPills.Root label="Principal">
      <NavPills.Item href="#home" current>Início</NavPills.Item>
      <NavPills.Item href="#about-us">Sobre nós</NavPills.Item>
      <NavPills.Item href="#restaurants">Restaurantes</NavPills.Item>
      <NavPills.Item href="#partners">Parceiros</NavPills.Item>
    </NavPills.Root>
  );
}

describe("SiteHeader", () => {
  it("NavPills renderiza navegação nomeada com links", () => {
    render(<Menu />);
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(nav).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  it("Item atual recebe aria-current=location", () => {
    render(<Menu />);
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "location");
  });

  it("Itens não atuais não têm aria-current", () => {
    render(<Menu />);
    expect(screen.getByRole("link", { name: "Sobre nós" })).not.toHaveAttribute("aria-current");
  });

  it("SiteHeader.Brand é um link para a home", () => {
    render(
      <SiteHeader.Root>
        <SiteHeader.Brand href="#home">eFood</SiteHeader.Brand>
      </SiteHeader.Root>,
    );
    expect(screen.getByRole("link", { name: "eFood" })).toHaveAttribute("href", "#home");
  });

  it("SiteHeader.SocialProof renderiza filhos e concatena className", () => {
    render(
      <SiteHeader.SocialProof className="extra" data-testid="social">
        <span>+90 avaliações</span>
      </SiteHeader.SocialProof>,
    );
    expect(screen.getByText("+90 avaliações")).toBeInTheDocument();
    expect(screen.getByTestId("social")).toHaveClass("extra");
  });

  it("SiteHeader.Root é estático por padrão e fixo com position=sticky", () => {
    render(
      <>
        <SiteHeader.Root data-testid="static" />
        <SiteHeader.Root data-testid="sticky" position="sticky" />
      </>,
    );
    expect(screen.getByTestId("static")).toHaveAttribute("data-position", "static");
    expect(screen.getByTestId("sticky")).toHaveAttribute("data-position", "sticky");
  });
});

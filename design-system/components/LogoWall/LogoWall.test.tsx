import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogoWall } from "./LogoWall";

describe("LogoWall", () => {
  it("LogoWall é uma lista nomeada", () => {
    render(
      <LogoWall.Root label="Restaurantes parceiros">
        <LogoWall.Item>Café Vila</LogoWall.Item>
        <LogoWall.Item>Cantina Lume</LogoWall.Item>
        <LogoWall.Item>Bistrô Raiz</LogoWall.Item>
      </LogoWall.Root>,
    );
    const list = screen.getByRole("list", { name: "Restaurantes parceiros" });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("LogoWall.Item featured aplica data-variant", () => {
    render(
      <LogoWall.Root label="Parceiros">
        <LogoWall.Item variant="featured">Café Vila</LogoWall.Item>
        <LogoWall.Item>Cantina Lume</LogoWall.Item>
      </LogoWall.Root>,
    );
    const [first, second] = screen.getAllByRole("listitem");
    expect(first).toHaveAttribute("data-variant", "featured");
    expect(second).toHaveAttribute("data-variant", "default");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeatureCard } from "./FeatureCard";

describe("FeatureCard", () => {
  it("FeatureCard.Root é um article com data-tone", () => {
    render(
      <FeatureCard.Root tone="mint" aria-label="Passo 1">
        <FeatureCard.Title>Peça</FeatureCard.Title>
      </FeatureCard.Root>,
    );
    expect(screen.getByRole("article", { name: "Passo 1" })).toHaveAttribute("data-tone", "mint");
  });

  it("FeatureCard.Root usa tone gray por padrão", () => {
    render(<FeatureCard.Root aria-label="Passo" />);
    expect(screen.getByRole("article")).toHaveAttribute("data-tone", "gray");
  });

  it("FeatureCard.Title renderiza h3 por padrão e h4 com as", () => {
    render(
      <>
        <FeatureCard.Title>Um</FeatureCard.Title>
        <FeatureCard.Title as="h4">Dois</FeatureCard.Title>
      </>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Um" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Dois" })).toBeInTheDocument();
  });

  it("repassa className e props nativas em Meta e Media", () => {
    render(
      <>
        <FeatureCard.Meta data-testid="meta" className="extra" />
        <FeatureCard.Media data-testid="media" className="extra" />
      </>,
    );
    expect(screen.getByTestId("meta")).toHaveClass("extra");
    expect(screen.getByTestId("media")).toHaveClass("extra");
  });

  it("FeatureCard.Content agrupa meta, título e texto e repassa props", () => {
    render(
      <FeatureCard.Content data-testid="content" className="extra">
        <FeatureCard.Meta />
        <FeatureCard.Title>Peça</FeatureCard.Title>
      </FeatureCard.Content>,
    );
    const content = screen.getByTestId("content");
    expect(content).toHaveClass("extra");
    expect(content).toContainElement(screen.getByRole("heading", { name: "Peça" }));
  });
});

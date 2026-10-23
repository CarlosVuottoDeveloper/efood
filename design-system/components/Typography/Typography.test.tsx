import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Display } from "./Display";
import { Emphasis } from "./Emphasis";
import { Heading } from "./Heading";
import { Text } from "./Text";

describe("Typography", () => {
  it("Display renderiza h1 por padrão e h2 com as", () => {
    const { rerender } = render(<Display>Título</Display>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    rerender(<Display as="h2">Título</Display>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("Heading level 3 renderiza h3 com data-size md", () => {
    render(<Heading level={3}>Título</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("data-size", "md");
  });

  it("Heading respeita size explícito", () => {
    render(<Heading level={2} size="sm">Título</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("data-size", "sm");
  });

  it("Text aplica data-size e data-tone", () => {
    const { rerender } = render(<Text data-testid="t">Texto</Text>);
    expect(screen.getByTestId("t")).toHaveAttribute("data-size", "body");
    expect(screen.getByTestId("t")).toHaveAttribute("data-tone", "default");
    rerender(<Text data-testid="t" size="small" tone="muted" as="span">Texto</Text>);
    expect(screen.getByTestId("t").tagName).toBe("SPAN");
    expect(screen.getByTestId("t")).toHaveAttribute("data-size", "small");
    expect(screen.getByTestId("t")).toHaveAttribute("data-tone", "muted");
  });

  it("Emphasis usa <em>", () => {
    render(<Emphasis>ênfase</Emphasis>);
    expect(screen.getByText("ênfase").tagName).toBe("EM");
  });

  it("repassa props nativas e concatena className", () => {
    render(<Text id="a" className="x">Texto</Text>);
    const el = screen.getByText("Texto");
    expect(el).toHaveAttribute("id", "a");
    expect(el.className).toMatch(/\S+ x$/);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "../Typography/Heading";
import { Container } from "./Container";
import { PageCanvas } from "./PageCanvas";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { SkipLink } from "./SkipLink";
import styles from "./Layout.module.css";

describe("Layout", () => {
  it("Section exige id e renderiza region nomeada pelo título", () => {
    render(
      <Section id="sobre" aria-labelledby="sobre-title">
        <Heading level={2} id="sobre-title">Sobre nós</Heading>
      </Section>,
    );
    expect(screen.getByRole("region", { name: "Sobre nós" })).toHaveAttribute("id", "sobre");
  });

  it("Section aplica a classe que define scroll-margin-top", () => {
    render(<Section id="a" aria-label="A" tone="surface" />);
    const section = screen.getByRole("region", { name: "A" });
    expect(section).toHaveClass(styles.section);
    expect(section).toHaveAttribute("data-tone", "surface");
  });

  it("Container e SectionHeader aplicam data-width / data-align", () => {
    render(
      <>
        <Container data-testid="c" width="narrow" />
        <Container data-testid="c2" />
        <SectionHeader data-testid="h" align="center" />
        <SectionHeader data-testid="h2" />
      </>,
    );
    expect(screen.getByTestId("c")).toHaveAttribute("data-width", "narrow");
    expect(screen.getByTestId("c2")).toHaveAttribute("data-width", "default");
    expect(screen.getByTestId("h")).toHaveAttribute("data-align", "center");
    expect(screen.getByTestId("h2")).toHaveAttribute("data-align", "start");
  });

  it("PageCanvas renderiza filhos no canvas interno", () => {
    render(<PageCanvas data-testid="p"><p>Olá</p></PageCanvas>);
    const outer = screen.getByTestId("p");
    expect(outer).toHaveClass(styles.page);
    expect(screen.getByText("Olá").parentElement).toHaveClass(styles.canvas);
    expect(outer.firstElementChild).toBe(screen.getByText("Olá").parentElement);
  });

  it("SkipLink aponta para #main com texto padrão", () => {
    render(<SkipLink />);
    expect(screen.getByRole("link", { name: "Pular para o conteúdo" })).toHaveAttribute("href", "#main");
  });

  it("SkipLink repassa props nativas e anexa className", () => {
    render(<SkipLink id="skip" className="extra" />);
    const link = screen.getByRole("link", { name: "Pular para o conteúdo" });
    expect(link).toHaveAttribute("id", "skip");
    expect(link).toHaveClass(styles.skipLink, "extra");
  });
});

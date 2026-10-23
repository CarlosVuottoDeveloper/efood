import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "../Button/Button";
import { Display } from "../Typography/Display";
import { Hero } from "./Hero";

function Example() {
  return (
    <Hero.Root aria-labelledby="hero-title">
      <Hero.Content>
        <Display as="h1" id="hero-title">Comida boa, embalagem que volta</Display>
        <Hero.Actions>
          <ButtonLink href="#partners" variant="outline">Quero ser parceiro</ButtonLink>
          <ButtonLink href="#about" variant="ghost">Saiba mais</ButtonLink>
        </Hero.Actions>
      </Hero.Content>
      <Hero.Media>
        <span>mídia</span>
      </Hero.Media>
    </Hero.Root>
  );
}

describe("Hero", () => {
  it("Hero.Root é uma region nomeada pelo Display", () => {
    render(<Example />);
    expect(screen.getByRole("region", { name: /Comida boa/ })).toBeInTheDocument();
  });

  it("Hero.Actions contém os CTAs na ordem de leitura", () => {
    render(<Example />);
    const links = within(screen.getByRole("region")).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["Quero ser parceiro", "Saiba mais"]);
  });
});

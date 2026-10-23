import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

const people = ["Maria Costa", "João Silva", "Ana Souza", "Beto Lima", "Carla Dias"].map((name) => ({ name }));

describe("Avatar", () => {
  it("Avatar sem foto mostra iniciais e nome acessível", () => {
    render(<Avatar person={{ name: "Maria Costa" }} />);
    expect(screen.getByRole("img", { name: "Maria Costa" })).toBeInTheDocument();
    expect(screen.getByText("MC")).toBeInTheDocument();
  });

  it("Avatar com uma palavra mostra uma inicial", () => {
    render(<Avatar person={{ name: "Thaynara" }} />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("Avatar com foto renderiza imagem com o nome", () => {
    render(<Avatar person={{ name: "Maria Costa", src: "/img/vivendi.jpg" }} size="sm" />);
    const img = screen.getByRole("img", { name: "Maria Costa" });
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("width", "32");
  });
});

describe("AvatarGroup", () => {
  it("AvatarGroup mostra no máximo max avatares", () => {
    render(<AvatarGroup people={people} />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("AvatarGroup resume o excedente", () => {
    render(<AvatarGroup people={people} />);
    expect(screen.getByText("+2")).toHaveAttribute("aria-label", "mais 2 pessoas");
  });

  it("AvatarGroup sem excedente não mostra contador", () => {
    render(<AvatarGroup people={people.slice(0, 3)} />);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });
});

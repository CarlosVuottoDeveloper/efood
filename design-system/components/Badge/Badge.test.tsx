import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("Badge aplica data-tone, padrão white", () => {
    const { rerender } = render(<Badge>01</Badge>);
    expect(screen.getByText("01")).toHaveAttribute("data-tone", "white");
    rerender(<Badge tone="mint">01</Badge>);
    expect(screen.getByText("01")).toHaveAttribute("data-tone", "mint");
  });

  it("Badge repassa className e props nativas", () => {
    render(<Badge className="extra" id="b">01</Badge>);
    const el = screen.getByText("01");
    expect(el).toHaveClass("extra");
    expect(el).toHaveAttribute("id", "b");
  });
});

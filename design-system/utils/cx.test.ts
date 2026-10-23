import { describe, expect, it } from "vitest";
import { cx } from "./cx";

describe("cx", () => {
  it("junta as classes verdadeiras", () => {
    expect(cx("a", "b")).toBe("a b");
  });
  it("descarta valores falsos", () => {
    expect(cx("a", false, null, undefined, "", "b")).toBe("a b");
  });
  it("retorna string vazia sem classes", () => {
    expect(cx()).toBe("");
    expect(cx(false, undefined)).toBe("");
  });
});

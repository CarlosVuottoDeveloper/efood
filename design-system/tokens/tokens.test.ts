import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";
import {
  contrastPairs,
  fontSizes,
  lineHeights,
  palette,
  radii,
  resolveSemantic,
  semanticColors,
  space,
} from "./tokens";

const css = readFileSync(join(__dirname, "tokens.css"), "utf8");
const cssVars = new Map<string, string>();
for (const match of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
  cssVars.set(match[1], match[2].trim());
}

describe("contrastRatio", () => {
  it("calcula preto sobre branco como 21", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
  });

  it("é simétrico", () => {
    expect(contrastRatio("#457C5C", "#FFFFFF")).toBeCloseTo(contrastRatio("#FFFFFF", "#457C5C"));
  });
});

describe("tokens.css", () => {
  it("tem cada cor da paleta com o mesmo valor de tokens.ts", () => {
    for (const color of palette) {
      expect(cssVars.get(`--color-${color.name}`)?.toLowerCase()).toBe(color.value.toLowerCase());
    }
  });

  it("aponta cada cor semântica para o primitivo certo", () => {
    for (const color of semanticColors) {
      expect(cssVars.get(`--color-${color.name}`)).toBe(`var(--color-${color.ref})`);
    }
  });

  it("não tem --color-* fora de tokens.ts", () => {
    const documented = new Set([...palette, ...semanticColors].map((c) => `--color-${c.name}`));
    const undocumented = [...cssVars.keys()].filter((n) => n.startsWith("--color-") && !documented.has(n));
    expect(undocumented).toEqual([]);
  });

  it("tem escalas de fonte, entrelinha, espaço e raio iguais às de tokens.ts", () => {
    const scales = [
      ["font-size", fontSizes],
      ["leading", lineHeights],
      ["space", space],
      ["radius", radii],
    ] as const;
    for (const [prefix, scale] of scales) {
      for (const token of scale) {
        expect(cssVars.get(`--${prefix}-${token.name}`)).toBe(token.value);
      }
    }
  });
});

describe("contrastPairs", () => {
  it("cobre os pares essenciais", () => {
    const keys = contrastPairs.map((p) => `${p.foreground}/${p.background}`);
    for (const key of [
      "text/bg-canvas",
      "text/bg-surface",
      "text/bg-highlight",
      "text-muted/bg-canvas",
      "text-muted/bg-surface",
      "text-inverse/action-primary",
      "text-inverse/action-dark",
      "action-primary/bg-highlight",
    ]) {
      expect(keys).toContain(key);
    }
  });

  it.each(contrastPairs)("$foreground sobre $background atinge $min:1", (p) => {
    expect(contrastRatio(resolveSemantic(p.foreground), resolveSemantic(p.background))).toBeGreaterThanOrEqual(p.min);
  });
});

export type ColorToken = { name: string; value: string; usage: string };
export type SemanticColorToken = { name: string; ref: string; usage: string };
export type ScaleToken = { name: string; value: string };
export type ContrastPair = {
  foreground: string;
  background: string;
  min: 4.5 | 3;
  note: string;
};

export const palette: ColorToken[] = [
  { name: "sage-200", value: "#CCE1C3", usage: "Fundo externo da página." },
  { name: "white", value: "#FFFFFF", usage: "Tela (canvas) e texto inverso." },
  { name: "gray-100", value: "#F5F5F5", usage: "Superfícies: cards e logos." },
  { name: "mint-200", value: "#CDECBD", usage: "Destaques: card em evidência, contorno do título e separadores do menu." },
  { name: "green-600", value: "#457C5C", usage: "Ação primária: item de menu ativo, ícones de ação e foco." },
  { name: "gray-600", value: "#4F4F4F", usage: "Texto secundário." },
  { name: "ink-900", value: "#222222", usage: "Texto, botão escuro e bordas fortes." },
];

export const semanticColors: SemanticColorToken[] = [
  { name: "bg-page", ref: "sage-200", usage: "Fundo externo da página." },
  { name: "bg-canvas", ref: "white", usage: "Tela branca arredondada que contém o conteúdo." },
  { name: "bg-surface", ref: "gray-100", usage: "Cards, logos e demais superfícies." },
  { name: "bg-highlight", ref: "mint-200", usage: "Card em evidência e contorno do destaque no título." },
  { name: "text", ref: "ink-900", usage: "Texto principal." },
  { name: "text-muted", ref: "gray-600", usage: "Texto secundário e legendas." },
  { name: "text-inverse", ref: "white", usage: "Texto sobre fundos escuros ou verdes." },
  { name: "action-primary", ref: "green-600", usage: "Item de menu ativo e ícones de ação." },
  { name: "action-dark", ref: "ink-900", usage: "Botão escuro." },
  { name: "border-strong", ref: "ink-900", usage: "Bordas fortes, como botões contornados." },
  { name: "border-accent", ref: "mint-200", usage: "Separadores do menu e bordas de destaque." },
  { name: "focus", ref: "green-600", usage: "Anel de foco do teclado." },
];

export const fontSizes: ScaleToken[] = [
  { name: "100", value: "0.875rem" },
  { name: "200", value: "1rem" },
  { name: "300", value: "1.125rem" },
  { name: "400", value: "1.5rem" },
  { name: "500", value: "2.25rem" },
  { name: "600", value: "3rem" },
  { name: "700", value: "4.5rem" },
];

export const lineHeights: ScaleToken[] = [
  { name: "tight", value: "1.1" },
  { name: "snug", value: "1.25" },
  { name: "normal", value: "1.5" },
];

export const space: ScaleToken[] = [
  { name: "1", value: "0.25rem" },
  { name: "2", value: "0.5rem" },
  { name: "3", value: "0.75rem" },
  { name: "4", value: "1rem" },
  { name: "5", value: "1.5rem" },
  { name: "6", value: "2rem" },
  { name: "7", value: "3rem" },
  { name: "8", value: "4rem" },
  { name: "9", value: "6rem" },
  { name: "10", value: "8rem" },
];

export const radii: ScaleToken[] = [
  { name: "xl", value: "40px" },
  { name: "lg", value: "28px" },
  { name: "md", value: "20px" },
  { name: "sm", value: "12px" },
  { name: "pill", value: "999px" },
];

export const contrastPairs: ContrastPair[] = [
  { foreground: "text", background: "bg-canvas", min: 4.5, note: "Texto principal sobre a tela." },
  { foreground: "text", background: "bg-surface", min: 4.5, note: "Texto principal sobre cards." },
  { foreground: "text", background: "bg-highlight", min: 4.5, note: "Texto principal sobre destaques." },
  { foreground: "text-muted", background: "bg-canvas", min: 4.5, note: "Texto secundário sobre a tela." },
  { foreground: "text-muted", background: "bg-surface", min: 4.5, note: "Texto secundário sobre cards." },
  { foreground: "text-inverse", background: "action-primary", min: 4.5, note: "Texto sobre o verde de ação." },
  { foreground: "text-inverse", background: "action-dark", min: 4.5, note: "Texto sobre o botão escuro." },
  { foreground: "action-primary", background: "bg-highlight", min: 3, note: "Só ícones e texto ≥ 24px." },
];

/** Resolve uma cor semântica (ou primitiva) para o hex correspondente. */
export function resolveSemantic(name: string): string {
  const semantic = semanticColors.find((c) => c.name === name);
  const primitiveName = semantic ? semantic.ref : name;
  const primitive = palette.find((c) => c.name === primitiveName);
  if (!primitive) throw new Error(`Cor desconhecida: ${name}`);
  return primitive.value;
}

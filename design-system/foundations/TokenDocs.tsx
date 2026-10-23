import {
  contrastPairs,
  fontSizes,
  lineHeights,
  radii,
  resolveSemantic,
  semanticColors,
  space,
  type ColorToken,
} from "../tokens/tokens";
import { contrastRatio } from "../tokens/contrast";

const tableStyle = { width: "100%", borderCollapse: "collapse" as const };
const cellStyle = {
  textAlign: "left" as const,
  padding: "0.5rem 0.75rem",
  borderBottom: "1px solid #e0e0e0",
  verticalAlign: "middle" as const,
};

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "var(--radius-sm)",
        background: color,
        border: "1px solid #cccccc",
      }}
    />
  );
}

export function ColorSwatches({ tokens }: { tokens: ColorToken[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
        gap: "1rem",
      }}
    >
      {tokens.map((token) => (
        <li key={token.name}>
          <div
            aria-hidden="true"
            style={{
              height: "5rem",
              borderRadius: "var(--radius-md)",
              background: token.value,
              border: "1px solid #cccccc",
            }}
          />
          <strong style={{ display: "block", marginTop: "0.5rem" }}>{token.name}</strong>
          <code>{token.value}</code>
          <p style={{ margin: "0.25rem 0 0" }}>{token.usage}</p>
        </li>
      ))}
    </ul>
  );
}

export function SemanticColorTable() {
  return (
    <table style={tableStyle}>
      <caption style={{ textAlign: "left", paddingBottom: "0.5rem" }}>
        Cores semânticas e os primitivos a que se referem
      </caption>
      <thead>
        <tr>
          <th scope="col" style={cellStyle}>Token</th>
          <th scope="col" style={cellStyle}>Primitivo</th>
          <th scope="col" style={cellStyle}>Amostra</th>
          <th scope="col" style={cellStyle}>Uso</th>
        </tr>
      </thead>
      <tbody>
        {semanticColors.map((token) => (
          <tr key={token.name}>
            <th scope="row" style={cellStyle}><code>{token.name}</code></th>
            <td style={cellStyle}>{token.ref}</td>
            <td style={cellStyle}><Swatch color={resolveSemantic(token.name)} /></td>
            <td style={cellStyle}>{token.usage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ContrastTable() {
  return (
    <table style={tableStyle}>
      <caption style={{ textAlign: "left", paddingBottom: "0.5rem" }}>
        Razões de contraste calculadas a partir dos tokens
      </caption>
      <thead>
        <tr>
          <th scope="col" style={cellStyle}>Texto</th>
          <th scope="col" style={cellStyle}>Fundo</th>
          <th scope="col" style={cellStyle}>Razão</th>
          <th scope="col" style={cellStyle}>Mínimo</th>
          <th scope="col" style={cellStyle}>Resultado</th>
          <th scope="col" style={cellStyle}>Observação</th>
        </tr>
      </thead>
      <tbody>
        {contrastPairs.map((pair) => {
          const ratio = contrastRatio(
            resolveSemantic(pair.foreground),
            resolveSemantic(pair.background),
          );
          const passes = ratio >= pair.min;
          return (
            <tr key={`${pair.foreground}-${pair.background}`}>
              <td style={cellStyle}><code>{pair.foreground}</code></td>
              <td style={cellStyle}><code>{pair.background}</code></td>
              <td style={cellStyle}>{ratio.toFixed(2)}:1</td>
              <td style={cellStyle}>{pair.min}:1</td>
              <td style={cellStyle}>
                <strong>{passes ? (pair.min === 3 ? "AA (grande)" : "AA") : "Reprovado"}</strong>
              </td>
              <td style={cellStyle}>{pair.note}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const SAMPLE = "Embalagens que voltam para a mesa";

function leadingFor(sizeName: string): string {
  if (sizeName === "700" || sizeName === "600") return "tight";
  if (sizeName === "500" || sizeName === "400") return "snug";
  return "normal";
}

export function TypeScale() {
  return (
    <div>
      {fontSizes.map((size) => {
        const px = parseFloat(size.value) * 16;
        const leading = leadingFor(size.name);
        const leadingValue = lineHeights.find((l) => l.name === leading)?.value;
        return (
          <div key={size.name} style={{ padding: "1rem 0", borderBottom: "1px solid #e0e0e0" }}>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              <code>--font-size-{size.name}</code> · {size.value} / {px}px · entrelinha{" "}
              <code>--leading-{leading}</code> ({leadingValue})
            </p>
            <p
              style={{
                margin: "0.5rem 0 0",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: `var(--font-size-${size.name})`,
                lineHeight: `var(--leading-${leading})`,
                fontWeight: 400,
              }}
            >
              {SAMPLE}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function SpaceScale() {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {space.map((step) => (
        <li
          key={step.name}
          style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.25rem 0" }}
        >
          <code style={{ width: "10rem", flexShrink: 0 }}>--space-{step.name}</code>
          <span style={{ width: "5rem", flexShrink: 0 }}>{step.value}</span>
          <span
            aria-hidden="true"
            style={{
              display: "block",
              height: "1rem",
              width: `var(--space-${step.name})`,
              background: "var(--color-action-primary)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export function RadiusScale() {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: "2rem",
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        background: "var(--color-bg-page)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      {radii.map((radius) => (
        <li key={radius.name} style={{ width: "9rem" }}>
          <div
            aria-hidden="true"
            style={{
              height: "6rem",
              background: "var(--color-bg-canvas)",
              borderRadius: `var(--radius-${radius.name})`,
              border: "var(--border-width) solid var(--color-border-strong)",
            }}
          />
          <code style={{ display: "block", marginTop: "0.5rem" }}>--radius-{radius.name}</code>
          <span>{radius.value}</span>
        </li>
      ))}
    </ul>
  );
}

# eFood Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar o design system do eFood (tokens, componentes de landing page, Storybook e um README de uso) a partir da referência visual `docs/references/example.webp`.

**Architecture:** Tokens vivem em CSS custom properties (`tokens.css`, usado em runtime) espelhados por um módulo tipado (`tokens.ts`, usado pela documentação); um teste garante que os dois não divergem. Componentes são React 19 + CSS Modules em `design-system/components/*`, Server Components por padrão, com variantes explícitas (`variant`/`tone` como união de strings) e compound components para peças com várias partes. Storybook documenta fundações (cores, tipografia, espaçamento) e componentes, e renderiza o próprio README como página de introdução.

**Tech Stack:** Next.js 16.4 (App Router), React 19.3, TypeScript 5, CSS Modules, `next/font` (Urbanist), Vitest 5.0.5 + Testing Library + jsdom, Storybook 10.6.3 (`@storybook/nextjs-vite`, `addon-docs`, `addon-a11y`).

**Spec:** a seção "Direção de design" abaixo + `docs/references/example.webp`. Regras de composição: `.agents/skills/vercel-composition-patterns/`. Regras de interface: `.agents/skills/web-design-guidelines/` (busca as regras atuais da Vercel).

**Branch:** `feature/design-system`, criada a partir de `develop` (gitflow). Ao final, merge `--no-ff` em `develop`.

## Global Constraints

- Nomes de arquivos, pastas, componentes, props, variáveis, classes e tokens em inglês. Só o texto exibido ao usuário fica em português (incluindo textos de exemplo nas stories e o `aria-label` de componentes).
- React 19: nunca `forwardRef` (`ref` é prop comum); `use(Context)` em vez de `useContext`.
- Sem props booleanas para escolher modo visual. Variantes são uniões de strings (`variant`, `tone`, `size`) refletidas em `data-*` no elemento raiz; peças com várias partes são compound components (`Hero.Root`, `Hero.Content`…), compostas por `children`, nunca por `renderX`.
- Todo componente aceita as props nativas do seu elemento raiz (`ComponentProps<"button">` etc.), faz spread delas e concatena `className` recebido depois da classe própria.
- `"use client"` só onde há hook ou estado (neste plano: apenas `Field`).
- CSS dos componentes usa apenas `var(--…)` dos tokens; nenhum hex literal em `design-system/components/**/*.css`.
- Nunca `transition: all`; animar só `transform`/`opacity`; `prefers-reduced-motion: reduce` zera durações (em `base.css`).
- Todo elemento interativo tem `:focus-visible` com `outline: 2px solid var(--color-focus); outline-offset: 3px`.
- Contraste WCAG AA: texto normal ≥ 4.5:1, texto grande/ícones ≥ 3:1. `--color-action-primary` sobre `--color-bg-highlight` (3.8:1) só para ícones e texto ≥ 24px.
- Imagens via `next/image` com `width`/`height` (ou import estático); decorativas com `alt=""`.
- Títulos com `text-wrap: balance`; parágrafos com `text-wrap: pretty`. Copy em pt-BR, voz ativa, caixa de frase (sentence case), rótulos de botão específicos ("Quero ser parceiro", não "Enviar").
- Breakpoints (literais em media queries, não dá para usar var): `640px` e `960px`, mobile-first com `min-width`.
- Versões fixas: `storybook`, `@storybook/nextjs-vite`, `@storybook/addon-docs`, `@storybook/addon-a11y` = `10.6.3`; `vitest` `5.0.5`; `vite` `8.3.5`; `@vitejs/plugin-react` `6.1.2`; `@testing-library/react` `16.3.3`; `@testing-library/user-event` `14.6.8`; `@testing-library/jest-dom` `7.0.1`; `jsdom` `30.1.3`.

## Direção de design

Extraída da referência (cores amostradas em pixel). O que torna a página reconhecível: uma tela branca de cantos muito arredondados flutuando sobre um fundo sálvia, com quase tudo em forma de pílula; o verde escuro aparece pouco (item ativo, ícones de ação) e o menta faz os destaques. A ousadia fica em um lugar: o título do hero, grande, peso regular, com uma palavra contornada por uma pílula menta. Todo o resto é contido.

**Paleta (primitivos)**

| Token | Hex | Uso |
|---|---|---|
| `sage-200` | `#CCE1C3` | fundo externo da página |
| `white` | `#FFFFFF` | tela (canvas), texto inverso |
| `gray-100` | `#F5F5F5` | superfícies: cards, logos |
| `mint-200` | `#CDECBD` | destaques: card em evidência, contorno do título, separadores do menu |
| `green-600` | `#457C5C` | ação primária: item de menu ativo, ícones de ação, foco |
| `gray-600` | `#4F4F4F` | texto secundário |
| `ink-900` | `#222222` | texto, botão escuro, bordas fortes |

**Cores semânticas** (o que os componentes usam): `bg-page`→`sage-200`, `bg-canvas`→`white`, `bg-surface`→`gray-100`, `bg-highlight`→`mint-200`, `text`→`ink-900`, `text-muted`→`gray-600`, `text-inverse`→`white`, `action-primary`→`green-600`, `action-dark`→`ink-900`, `border-strong`→`ink-900`, `border-accent`→`mint-200`, `focus`→`green-600`.

**Tipografia:** Urbanist (Google Fonts, geométrica, a mais próxima da referência), pesos 400 e 500, uma única família. Escala tradicional (The Elements of Typographic Style): `100` 0.875rem · `200` 1rem · `300` 1.125rem · `400` 1.5rem · `500` 2.25rem · `600` 3rem · `700` 4.5rem. Entrelinha: `tight` 1.1 (display), `snug` 1.25 (títulos), `normal` 1.5 (texto). Tracking: `tight` -0.02em (display), `wide` 0.08em (eyebrow). Display usa `clamp(var(--font-size-500), 6vw, var(--font-size-700))`. Linhas de texto ≤ 65ch.

**Espaçamento** (base 4px): `1` 0.25rem · `2` 0.5rem · `3` 0.75rem · `4` 1rem · `5` 1.5rem · `6` 2rem · `7` 3rem · `8` 4rem · `9` 6rem · `10` 8rem.

**Raios** (hierarquia, do maior ao menor container): `xl` 40px (canvas) · `lg` 28px (cards) · `md` 20px · `sm` 12px · `pill` 999px (botões, badges, menu).

**Outros:** `--border-width` 1.5px · `--duration-fast` 150ms · `--ease-out` cubic-bezier(0.2, 0, 0, 1) · `--container-max` 1240px · `--container-narrow` 720px.

**Inventário de componentes** (referência → componente):

| Na referência | Componente |
|---|---|
| Fundo sálvia + tela branca arredondada | `PageCanvas` |
| Cabeçalho: marca, prova social, menu, ícones, CTA | `SiteHeader.*`, `NavPills.*`, `Badge`, `AvatarGroup`, `IconButton`, `ButtonLink` |
| "Home" ativo em pílula verde, demais itens separados por ponto menta | `NavPills.Item` com `aria-current` |
| Título grande com palavra contornada | `Display` + `Highlight` |
| Texto com trechos sublinhados | `Text` + `Emphasis` |
| "Join EcoFuture Now" (pílula contornada + círculo verde) | `Button`/`ButtonLink` `variant="outline"` + `ButtonIcon` |
| "Learn More →" | `ButtonLink` `variant="ghost"` + `ButtonIcon tone="dark"` |
| "Contact Us" | `ButtonLink` `variant="dark"` |
| Cards cinza com "001", avatares, "+" e ilustração | `FeatureCard.*` |
| "WE ARE PROUD OF" + título centralizado | `SectionHeader` + `Eyebrow` + `Heading` |
| Grade de logos, primeiro em menta e mais largo | `LogoWall.*` |
| (não está na referência; a landing atual precisa) | `Field.*`, `Checkbox`, `SkipLink`, `Section`, `Container` |

Dois tratamentos da referência viram regra de uso, não decoração livre: o `Eyebrow` em caixa alta aparece no máximo uma vez por seção, e numeração ("01", "02") só quando o conteúdo é de fato uma sequência (ex.: "como funciona" em passos). O `Highlight` aparece uma vez por página, no hero.

## Review Focus

- Texto em português costuma ser 20–30% mais longo que o inglês da referência: botões, itens de menu e títulos de card com texto longo devem quebrar linha sem estourar a pílula. Coberto por stories "Texto longo" (Tasks 4, 7, 9) e pela checagem visual da Task 11.
- Em 320px de largura, o cabeçalho (marca + menu + ações) não pode gerar scroll horizontal na página: o menu rola dentro do próprio container. Story `Mobile` (Task 7) e checagem da Task 11.
- Botão só com ícone sem nome acessível: `IconButton` exige `label` no tipo; teste na Task 4.
- Erro de formulário precisa ser anunciado e ligado ao campo (`aria-invalid` + `aria-describedby`); teste na Task 10.
- Âncoras do menu: a seção alvo não pode ficar escondida atrás do cabeçalho (`scroll-margin-top` em `Section`); teste na Task 6.

---

## File Structure

```
design-system/
  README.md                         guia de uso (estilos + componentes)        Task 11
  index.ts                          barrel de exports públicos                 Tasks 3–10
  fonts.ts                          Urbanist via next/font                     Task 1
  tokens/
    tokens.css                      custom properties (runtime)                Task 1
    base.css                        reset mínimo, foco, reduced motion         Task 1
    tokens.ts                       tokens tipados (documentação)              Task 1
    contrast.ts                     cálculo de contraste WCAG                  Task 1
    tokens.test.ts                  paridade ts↔css + contraste                Task 1
  foundations/
    Introduction.mdx                renderiza o README                         Task 11
    Colors.mdx · Typography.mdx · Spacing.mdx                                  Task 2
    TokenDocs.tsx                   ColorSwatches, TypeScale, SpaceScale        Task 2
  components/
    Typography/  Display, Heading, Text, Eyebrow, Highlight, Emphasis         Task 3
    Button/      Button, ButtonLink, ButtonIcon, IconButton                   Task 4
    Badge/       Badge                                                        Task 5
    Avatar/      Avatar, AvatarGroup                                          Task 5
    Layout/      PageCanvas, Container, Section, SectionHeader, SkipLink      Task 6
    SiteHeader/  SiteHeader, NavPills                                         Task 7
    Hero/        Hero                                                         Task 8
    FeatureCard/ FeatureCard                                                  Task 9
    LogoWall/    LogoWall                                                     Task 9
    Field/       Field, Checkbox                                              Task 10
  examples/
    LandingPage.stories.tsx         página completa com conteúdo do eFood      Task 11
.storybook/main.ts · .storybook/preview.tsx                                    Task 2
vitest.config.mts · vitest.setup.ts                                            Task 1
```

Cada pasta de componente contém `<Name>.tsx`, `<Name>.module.css`, `<Name>.test.tsx` e `<Name>.stories.tsx` (um arquivo de cada por pasta quando a pasta agrupa vários componentes pequenos, ex.: `Typography.module.css`).

---

### Task 0: Branch

- [ ] **Step 1:** `git checkout develop && git checkout -b feature/design-system`

---

### Task 1: Infra de testes, tokens e fonte

**Files:**
- Create: `vitest.config.mts`, `vitest.setup.ts`, `design-system/tokens/{tokens.css,base.css,tokens.ts,contrast.ts,tokens.test.ts}`, `design-system/fonts.ts`
- Modify: `package.json` (scripts + devDeps), `app/layout.tsx`

**Interfaces:**
- Produces:
  - `type ColorToken = { name: string; value: string; usage: string }`
  - `type SemanticColorToken = { name: string; ref: string; usage: string }`
  - `type ScaleToken = { name: string; value: string }`
  - `type ContrastPair = { foreground: string; background: string; min: 4.5 | 3; note: string }` (nomes semânticos)
  - `palette: ColorToken[]`, `semanticColors: SemanticColorToken[]`, `fontSizes`, `lineHeights`, `space`, `radii: ScaleToken[]`, `contrastPairs: ContrastPair[]`, `resolveSemantic(name: string): string` (hex) — em `tokens.ts`
  - `contrastRatio(foreground: string, background: string): number` — em `contrast.ts`
  - `urbanist` (resultado de `Urbanist({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-sans", display: "swap" })`) — em `fonts.ts`
  - Nomes de CSS vars: `--color-<name>`, `--font-size-<name>`, `--leading-<name>`, `--tracking-<name>`, `--space-<name>`, `--radius-<name>`, mais os "Outros" da Direção de design.

- [ ] **Step 1: Instalar dependências de teste e criar config**

```bash
npm i -D vitest@5.0.5 vite@8.3.5 @vitejs/plugin-react@6.1.2 jsdom@30.1.3 \
  @testing-library/react@16.3.3 @testing-library/user-event@14.6.8 @testing-library/jest-dom@7.0.1
```

`vitest.config.mts`: plugin react, `test.environment: "jsdom"`, `test.setupFiles: ["./vitest.setup.ts"]`, `resolve.alias: { "@": <raiz do projeto> }`. `vitest.setup.ts`: `import "@testing-library/jest-dom/vitest"` + `afterEach(cleanup)`. Script `"test": "vitest run"`.

- [ ] **Step 2: Escrever os testes que falham** em `tokens.test.ts`

```ts
// lê design-system/tokens/tokens.css e extrai `--nome: valor;` num Map
it("contrastRatio calcula preto sobre branco como 21", () =>
  expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1));
it("contrastRatio é simétrico", () =>
  expect(contrastRatio("#457C5C", "#FFFFFF")).toBeCloseTo(contrastRatio("#FFFFFF", "#457C5C")));
it("cada cor da paleta existe em tokens.css com o mesmo valor", ...)       // --color-sage-200: #CCE1C3 (comparação case-insensitive)
it("cada cor semântica aponta para o primitivo certo", ...)                // --color-bg-page: var(--color-sage-200)
it("tokens.css não tem --color-* fora de tokens.ts", ...)                  // documentação nunca fica para trás
it("escalas de fonte, espaço e raio batem com tokens.css", ...)
it.each(contrastPairs)("$foreground sobre $background atinge $min:1", (p) =>
  expect(contrastRatio(resolveSemantic(p.foreground), resolveSemantic(p.background))).toBeGreaterThanOrEqual(p.min));
```

`contrastPairs` deve conter pelo menos: `text`/`bg-canvas` 4.5, `text`/`bg-surface` 4.5, `text`/`bg-highlight` 4.5, `text-muted`/`bg-canvas` 4.5, `text-muted`/`bg-surface` 4.5, `text-inverse`/`action-primary` 4.5, `text-inverse`/`action-dark` 4.5, `action-primary`/`bg-highlight` 3 (nota: "só ícones e texto ≥ 24px").

- [ ] **Step 3:** `npm test` → FAIL (módulos não existem).

- [ ] **Step 4: Implementar** `contrast.ts` (luminância relativa WCAG 2.x), `tokens.ts` e `tokens.css` com os valores da Direção de design, e `base.css`: `box-sizing: border-box` global; `body` com `font-family: var(--font-sans), system-ui, sans-serif`, `color: var(--color-text)`, `background: var(--color-bg-page)`; `:focus-visible` global conforme Global Constraints; bloco `@media (prefers-reduced-motion: reduce)` zerando `animation-duration`/`transition-duration` e `scroll-behavior`.

- [ ] **Step 5:** `npm test` → PASS.

- [ ] **Step 6: Fonte e layout.** `fonts.ts` exporta `urbanist`. Em `app/layout.tsx`: trocar Poppins por `urbanist`, `<html lang="pt-BR" className={urbanist.variable}>`, importar `@/design-system/tokens/tokens.css` e `@/design-system/tokens/base.css` antes de `./globals.css`. Rodar `npx tsc --noEmit && npm run build` → sucesso.

- [ ] **Step 7: Commit** — `feat(design-system): add tokens, contrast checks and Urbanist font`

---

### Task 2: Storybook e páginas de fundação

**Files:**
- Create: `.storybook/main.ts`, `.storybook/preview.tsx`, `design-system/foundations/{TokenDocs.tsx,Colors.mdx,Typography.mdx,Spacing.mdx}`
- Modify: `package.json`, `.gitignore` (`storybook-static/`)

**Interfaces:**
- Consumes: `palette`, `semanticColors`, `contrastPairs`, `resolveSemantic`, `fontSizes`, `lineHeights`, `space`, `radii`, `contrastRatio`, `urbanist` (Task 1)
- Produces: `ColorSwatches({ tokens: ColorToken[] })`, `SemanticColorTable()`, `ContrastTable()`, `TypeScale()`, `SpaceScale()`, `RadiusScale()` em `TokenDocs.tsx`; config do Storybook que as tasks seguintes usam só adicionando `*.stories.tsx`.

- [ ] **Step 1: Instalar**

```bash
npm i -D storybook@10.6.3 @storybook/nextjs-vite@10.6.3 @storybook/addon-docs@10.6.3 @storybook/addon-a11y@10.6.3
```

Scripts: `"storybook": "storybook dev -p 6006"`, `"build-storybook": "storybook build"`.

- [ ] **Step 2: Config.** `main.ts`: `framework: "@storybook/nextjs-vite"`, `stories: ["../design-system/**/*.mdx", "../design-system/**/*.stories.tsx"]`, `addons: ["@storybook/addon-docs", "@storybook/addon-a11y"]`, `staticDirs: ["../public"]`. `preview.tsx`: importa `tokens.css` e `base.css`; decorator que envolve a story em `<div className={urbanist.variable} lang="pt-BR">`; `parameters.a11y.test = "error"`; `parameters.backgrounds` com `canvas` (#FFFFFF) como padrão e `page` (#CCE1C3); `tags: ["autodocs"]`.

- [ ] **Step 3: Páginas de fundação** (texto em pt-BR). `Colors.mdx` (título `Fundações/Cores`): paleta com hex e uso, tabela semântica (nome → primitivo → amostra), tabela de contraste com a razão calculada por `contrastRatio` e selo AA. `Typography.mdx` (`Fundações/Tipografia`): cada passo da escala renderizado com "Embalagens que voltam para a mesa", nome do token, rem/px, entrelinhas e regras de uso (Highlight uma vez por página, Eyebrow uma vez por seção). `Spacing.mdx` (`Fundações/Espaçamento e raios`): barras de espaço e amostras de raio com a hierarquia canvas → card → pílula.

- [ ] **Step 4: Verificar.** `npm run build-storybook` → termina sem erro; `npm run storybook` e abrir as três páginas: amostras corretas, painel de acessibilidade sem violações.

- [ ] **Step 5: Commit** — `feat(design-system): set up Storybook with foundation docs`

---

### Task 3: Tipografia

**Files:** `design-system/components/Typography/{Display,Heading,Text,Eyebrow,Highlight,Emphasis}.tsx`, `Typography.module.css`, `Typography.test.tsx`, `Typography.stories.tsx`; Modify: `design-system/index.ts`

**Interfaces:**
- Produces:
  - `Display(props: ComponentProps<"h1"> & { as?: "h1" | "h2" })` — padrão `h1`
  - `Heading(props: ComponentProps<"h2"> & { level: 2 | 3 | 4; size?: "lg" | "md" | "sm" })` — renderiza `h{level}`; `size` padrão por nível (2→lg 3rem, 3→md 1.5rem, 4→sm 1.125rem); `data-size`
  - `Text(props: ComponentProps<"p"> & { size?: "lead" | "body" | "small"; tone?: "default" | "muted"; as?: "p" | "span" })`
  - `Eyebrow(props: ComponentProps<"p">)` — caixa alta, `--tracking-wide`, `--font-size-100`
  - `Highlight(props: ComponentProps<"span">)` — pílula contornada `--border-width` `--color-border-accent`, `padding-inline: 0.15em`, `box-decoration-break: clone`
  - `Emphasis(props: ComponentProps<"em">)` — `font-style: normal`, sublinhado `text-underline-offset: 0.2em`

- [ ] **Step 1: Testes que falham**

```tsx
it("Display renderiza h1 por padrão e h2 com as", ...)            // getByRole("heading", { level: 1 })
it("Heading level 3 renderiza h3 com data-size md", ...)
it("Heading respeita size explícito", ...)                         // level 2 + size "sm" → data-size="sm"
it("Text aplica data-size e data-tone", ...)                      // padrão: body / default
it("Emphasis usa <em>", ...)
it("repassa props nativas e concatena className", ...)             // id, className="x" → classe própria + "x"
```

- [ ] **Step 2:** `npx vitest run design-system/components/Typography` → FAIL.
- [ ] **Step 3:** Implementar conforme Interfaces; exportar no `index.ts`.
- [ ] **Step 4:** Testes → PASS.
- [ ] **Step 5: Stories** (`Componentes/Tipografia`): `Display` com "Comida boa, embalagem que <Highlight>volta</Highlight>", `Headings`, `Text` (lead/body/small × default/muted, com `Emphasis`), `Eyebrow`.
- [ ] **Step 6: Commit** — `feat(design-system): add typography components`

---

### Task 4: Botões

**Files:** `design-system/components/Button/{Button.tsx,IconButton.tsx,Button.module.css,Button.test.tsx,Button.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Produces:
  - `type ButtonVariant = "dark" | "primary" | "outline" | "ghost"`
  - `Button(props: ComponentProps<"button"> & { variant?: ButtonVariant })` — padrão `variant="dark"`, `type="button"`
  - `ButtonLink(props: ComponentProps<typeof Link> & { variant?: ButtonVariant })` — `next/link`, mesmas classes
  - `ButtonIcon(props: { children: ReactNode; tone?: "primary" | "dark" })` — círculo 2.5rem, `aria-hidden="true"`, padrão `primary`
  - `IconButton(props: Omit<ComponentProps<"button">, "aria-label"> & { label: string; variant?: "outline" | "mint" | "primary" | "dark" })` — círculo 3rem, `aria-label={label}`, padrão `outline`

Estilos: pílula `--radius-pill`, altura mínima 3rem (alvo de toque ≥ 44px), `--font-size-300` peso 500, `white-space: normal` com `text-wrap: balance`. `dark`: fundo `action-dark`, texto inverso. `primary`: fundo `action-primary`. `outline`: borda `--border-width` `border-strong`, fundo transparente. `ghost`: sem borda e sem padding lateral. Hover: `outline` e `ghost` deslocam o `ButtonIcon` 2px via `transform` (transição `--duration-fast`); `dark`/`primary` escurecem via `filter: brightness(0.92)` sem transição de cor.

- [ ] **Step 1: Testes que falham**

```tsx
it("Button tem type=button e data-variant=dark por padrão", ...)
it("Button chama onClick", ...)                                    // userEvent.click
it("ButtonLink renderiza link com href", ...)                     // getByRole("link", { name: "Fale com a gente" })
it("ButtonIcon fica escondido de leitores de tela", ...)          // aria-hidden="true"; nome do botão = só o texto
it("IconButton expõe label como nome acessível", ...)            // getByRole("button", { name: "Mudar idioma" })
it("IconButton aplica data-variant", ...)
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Stories** (`Componentes/Botões`): uma por variante com texto da landing ("Fale com a gente", "Quero ser parceiro" + `ButtonIcon`, "Saiba mais" + seta), `IconButton` nas quatro variantes, e `Texto longo` com "Quero cadastrar meu restaurante na rede eFood" num container de 280px.
- [ ] **Step 6: Commit** — `feat(design-system): add button components`

---

### Task 5: Badge e avatares

**Files:** `design-system/components/Badge/{Badge.tsx,Badge.module.css,Badge.test.tsx,Badge.stories.tsx}`, `design-system/components/Avatar/{Avatar.tsx,AvatarGroup.tsx,Avatar.module.css,Avatar.test.tsx,Avatar.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Produces:
  - `Badge(props: ComponentProps<"span"> & { tone?: "white" | "gray" | "mint" })` — pílula, `font-variant-numeric: tabular-nums`, padrão `white`
  - `type Person = { name: string; src?: string | StaticImageData }`
  - `Avatar(props: { person: Person; size?: "sm" | "md" })` — sm 2rem, md 2.5rem; com `src`: `next/image` com `alt={person.name}`; sem `src`: iniciais (primeira letra do primeiro e do último nome) em `bg-highlight`, `role="img"` e `aria-label={person.name}`
  - `AvatarGroup(props: { people: Person[]; max?: number; size?: "sm" | "md" })` — padrão `max=3`; sobreposição `-0.5rem`; excedente vira `Badge tone="mint"` "+N" com `aria-label="mais N pessoas"`

- [ ] **Step 1: Testes que falham**

```tsx
it("Badge aplica data-tone", ...)
it("Avatar sem foto mostra iniciais e nome acessível", ...)   // {name:"Maria Costa"} → "MC", getByRole("img", {name:"Maria Costa"})
it("Avatar com uma palavra mostra uma inicial", ...)             // "Thaynara" → "T"
it("AvatarGroup mostra no máximo max avatares", ...)            // 5 pessoas, max 3 → 3 imgs
it("AvatarGroup resume o excedente", ...)                       // "+2" com aria-label "mais 2 pessoas"
it("AvatarGroup sem excedente não mostra contador", ...)
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Stories:** `Badge` nos três tons ("01", "+90 avaliações"); `AvatarGroup` com e sem excedente; composição "prova social" (`AvatarGroup` + `Badge tone="gray"` "+90 avaliações").
- [ ] **Step 6: Commit** — `feat(design-system): add badge and avatar components`

---

### Task 6: Layout

**Files:** `design-system/components/Layout/{PageCanvas.tsx,Container.tsx,Section.tsx,SectionHeader.tsx,SkipLink.tsx,Layout.module.css,Layout.test.tsx,Layout.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Produces:
  - `PageCanvas(props: ComponentProps<"div">)` — externo `bg-page` com padding `--space-3` (mobile) / `--space-7` (≥960px); interno `bg-canvas`, `--radius-xl` (`--radius-lg` no mobile), `overflow: clip`
  - `Container(props: ComponentProps<"div"> & { width?: "default" | "narrow" })` — `max-width` `--container-max`/`--container-narrow`, padding inline `--space-4` / `--space-8` (≥960px)
  - `Section(props: ComponentProps<"section"> & { id: string; tone?: "plain" | "surface" })` — `id` obrigatório; `scroll-margin-top: var(--space-9)`; padding vertical `--space-8` / `--space-9`
  - `SectionHeader(props: ComponentProps<"div"> & { align?: "start" | "center" })` — empilha `children` (Eyebrow + Heading) com gap `--space-3`; padrão `start`
  - `SkipLink(props: { href?: string; children?: ReactNode })` — padrão `href="#main"`, texto "Pular para o conteúdo"; visível só com foco

- [ ] **Step 1: Testes que falham**

```tsx
it("Section exige id e renderiza region nomeada pelo título", ...)
  // <Section id="sobre" aria-labelledby="sobre-title"><Heading level={2} id="sobre-title">Sobre nós</Heading></Section>
  // → getByRole("region", { name: "Sobre nós" }) tem id "sobre"
it("Section aplica a classe que define scroll-margin-top", ...)  // toHaveClass(styles.section)
it("Container e SectionHeader aplicam data-width / data-align", ...)
it("SkipLink aponta para #main com texto padrão", ...)          // getByRole("link", { name: "Pular para o conteúdo" })
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Stories:** `PageCanvas` com conteúdo de exemplo, `Section` em `plain` e `surface`, `SectionHeader` centralizado ("Nossos parceiros" / "Restaurantes que já servem em embalagens que voltam").
- [ ] **Step 6: Commit** — `feat(design-system): add layout primitives`

---

### Task 7: Cabeçalho e menu

**Files:** `design-system/components/SiteHeader/{SiteHeader.tsx,NavPills.tsx,SiteHeader.module.css,SiteHeader.test.tsx,SiteHeader.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Consumes: `ButtonLink`, `IconButton` (Task 4); `AvatarGroup`, `Badge` (Task 5)
- Produces:
  - `NavPills.Root(props: { label: string; children: ReactNode })` — `<nav aria-label={label}><ul>`
  - `NavPills.Item(props: ComponentProps<"a"> & { href: string; current?: boolean })` — `<li><a aria-current={current ? "location" : undefined}>`; o estilo ativo (pílula `action-primary`, texto inverso) é selecionado por `[aria-current]`, nunca por classe; entre itens, ponto `mint-200` de 6px via `li + li::before`
  - `SiteHeader.Root(props: ComponentProps<"header">)`, `SiteHeader.Brand(props: { href: string; children: ReactNode })`, `SiteHeader.Actions(props: ComponentProps<"div">)`

Layout: ≥960px uma linha (marca · menu centralizado · ações); abaixo disso, marca + ações na primeira linha e menu na segunda com `overflow-x: auto`, `overscroll-behavior-x: contain` e sem barra visível; a página nunca rola horizontalmente.

- [ ] **Step 1: Testes que falham**

```tsx
it("NavPills renderiza navegação nomeada com links", ...)   // getByRole("navigation", { name: "Principal" }), 4 links
it("Item atual recebe aria-current=location", ...)
it("Itens não atuais não têm aria-current", ...)
it("SiteHeader.Brand é um link para a home", ...)            // getByRole("link", { name: "eFood" }) href "#home"
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Stories:** `Default` com o cabeçalho completo do eFood (marca com `public/img/logo.png`, prova social, menu "Início · Sobre nós · Restaurantes · Parceiros", `IconButton` "Mudar idioma", `ButtonLink` "Fale com a gente"); `Mobile` com viewport de 320px (viewport embutido do Storybook 10, via `globals.viewport`; definir a opção `mobile320` em `preview.tsx`); `Texto longo` com itens "Restaurantes ecológicos" e "Seja um parceiro".
- [ ] **Step 6: Commit** — `feat(design-system): add site header and nav pills`

---

### Task 8: Hero

**Files:** `design-system/components/Hero/{Hero.tsx,Hero.module.css,Hero.test.tsx,Hero.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Consumes: `Display`, `Highlight`, `Text`, `Emphasis` (Task 3); `ButtonLink`, `ButtonIcon` (Task 4)
- Produces: `Hero.Root(props: ComponentProps<"section">)`, `Hero.Content(props: ComponentProps<"div">)`, `Hero.Actions(props: ComponentProps<"div">)`, `Hero.Media(props: ComponentProps<"div">)`

Layout: grid de uma coluna; ≥960px, duas colunas `1.1fr 1fr` com `align-items: center` e gap `--space-7`. `Content` com gap `--space-5` e texto até 36rem; `Actions` em linha com gap `--space-5` e `flex-wrap: wrap`. A única animação da página fica aqui: `Media` entra com `opacity` 0→1 e `transform: scale(0.96)`→1 em 600ms `--ease-out`, desligada por `prefers-reduced-motion`.

- [ ] **Step 1: Testes que falham**

```tsx
it("Hero.Root é uma region nomeada pelo Display", ...)       // aria-labelledby → getByRole("region", { name: /Comida boa/ })
it("Hero.Actions contém os CTAs na ordem de leitura", ...)  // links "Quero ser parceiro", "Saiba mais"
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Story** `Default`: Display "Comida boa, embalagem que <Highlight>volta</Highlight>"; Text lead "Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros. Você <Emphasis>pede</Emphasis>, <Emphasis>devolve</Emphasis> e a gente higieniza."; CTAs `outline` "Quero ser parceiro" e `ghost` "Saiba mais"; mídia `public/img/product-lifecycle.png` com `priority`.
- [ ] **Step 6: Commit** — `feat(design-system): add hero`

---

### Task 9: Cards e grade de logos

**Files:** `design-system/components/FeatureCard/{FeatureCard.tsx,FeatureCard.module.css,FeatureCard.test.tsx,FeatureCard.stories.tsx}`, `design-system/components/LogoWall/{LogoWall.tsx,LogoWall.module.css,LogoWall.test.tsx,LogoWall.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Consumes: `Badge`, `AvatarGroup` (Task 5); `IconButton` (Task 4)
- Produces:
  - `FeatureCard.Root(props: ComponentProps<"article"> & { tone?: "gray" | "mint" })` — `--radius-lg`, padding `--space-6`; ≥640px grid `1fr auto` (conteúdo à esquerda, mídia à direita, mídia pode sangrar pela borda inferior)
  - `FeatureCard.Meta(props: ComponentProps<"div">)` — linha com gap `--space-3` e `flex-wrap: wrap`
  - `FeatureCard.Title(props: ComponentProps<"h3"> & { as?: "h3" | "h4" })` — `--font-size-400`, `--leading-snug`, até 18ch
  - `FeatureCard.Media(props: ComponentProps<"div">)`
  - `LogoWall.Root(props: { label: string; children: ReactNode })` — `<ul aria-label={label}>`; grid 2 colunas, ≥960px 6 colunas
  - `LogoWall.Item(props: ComponentProps<"li"> & { variant?: "default" | "featured" })` — `default`: `bg-surface`, 1 coluna; `featured`: `bg-highlight`, 2 colunas

- [ ] **Step 1: Testes que falham**

```tsx
it("FeatureCard.Root é um article com data-tone", ...)
it("FeatureCard.Title renderiza h3 por padrão e h4 com as", ...)
it("LogoWall é uma lista nomeada", ...)                  // getByRole("list", { name: "Restaurantes parceiros" }), N listitems
it("LogoWall.Item featured aplica data-variant", ...)
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Stories:** `FeatureCard` "Como funciona" em sequência (é um processo, por isso numerado): "01" "Peça no restaurante parceiro", "02" "Devolva em qualquer ponto da rede", "03" "A gente higieniza e devolve ao ciclo"; versão `mint`; `Texto longo`. `LogoWall` com seis restaurantes fictícios em texto, o primeiro `featured`.
- [ ] **Step 6: Commit** — `feat(design-system): add feature card and logo wall`

---

### Task 10: Formulário

**Files:** `design-system/components/Field/{Field.tsx,Checkbox.tsx,Field.module.css,Field.test.tsx,Field.stories.tsx}`; Modify: `index.ts`

**Interfaces:**
- Produces (`Field.tsx` é `"use client"`; contexto lido com `use()`):
  - `Field.Root(props: { hint?: string; error?: string; children: ReactNode })` — gera `id` com `useId()`; contexto `{ id, messageId, hint, error }`
  - `Field.Label(props: ComponentProps<"label">)` — `htmlFor={id}`
  - `Field.Input(props: ComponentProps<"input">)` / `Field.Textarea(props: ComponentProps<"textarea">)` — `id`; `aria-invalid={error ? true : undefined}`; `aria-describedby={hint || error ? messageId : undefined}`
  - `Field.Message()` — sempre renderiza `<p id={messageId} aria-live="polite">` (vazio quando não há hint nem erro, para a região existir antes do erro aparecer) com `error ?? hint`; `data-tone="error"` quando há erro
  - `Checkbox(props: Omit<ComponentProps<"input">, "type"> & { children: ReactNode })` — `<label>` envolvendo `<input type="checkbox">` e o texto (um único alvo de clique)

Estilos: inputs com `--radius-md`, borda `--border-width` `gray-600`, altura mínima 3rem, foco via `:focus-visible`; erro com borda `ink-900` e mensagem precedida de ícone (não depende só de cor).

- [ ] **Step 1: Testes que falham**

```tsx
it("Label se associa ao Input", ...)                 // getByLabelText("Nome") é o input
it("Label se associa ao Textarea", ...)
it("sem hint nem erro, não há aria-describedby", ...)
it("hint vira descrição acessível", ...)            // toHaveAccessibleDescription("Como aparece no cardápio")
it("erro marca aria-invalid e vira a descrição", ...) // aria-invalid="true", description "Informe um e-mail válido, como nome@restaurante.com"
it("erro tem prioridade sobre hint", ...)
it("mensagem fica em região aria-live polite", ...)
it("clicar no texto do Checkbox marca a caixa", ...) // userEvent.click(getByText("Quero receber novidades")) → toBeChecked()
```

- [ ] **Step 2:** FAIL. **Step 3:** Implementar e exportar. **Step 4:** PASS.
- [ ] **Step 5: Story** `Formulário de parceiro`: Nome (`autoComplete="name"`), E-mail (`type="email"`, `autoComplete="email"`, `spellCheck={false}`), Telefone (`type="tel"`, `autoComplete="tel"`), Mensagem, Checkbox "Quero receber novidades por e-mail", `Button variant="primary" type="submit"` "Quero ser parceiro". Story `Com erro` mostrando a mensagem de erro do e-mail.
- [ ] **Step 6: Commit** — `feat(design-system): add form field and checkbox`

---

### Task 11: README, página de exemplo e revisão final

**Files:**
- Create: `design-system/README.md`, `design-system/foundations/Introduction.mdx`, `design-system/examples/LandingPage.stories.tsx`
- Create: `README.md` na raiz (curto: o que é o projeto, scripts, link para `design-system/README.md`, fluxo gitflow)

**Interfaces:**
- Consumes: todos os exports de `@/design-system`

- [ ] **Step 1: `design-system/README.md`** (pt-BR), nesta ordem:
  1. **O que é** e princípios (os três parágrafos da Direção de design, resumidos).
  2. **Como usar:** `import { Button, Hero } from "@/design-system"`; tokens já carregados pelo `app/layout.tsx`; como usar um token num CSS Module (`color: var(--color-text-muted)`).
  3. **Tokens:** tabelas de cores semânticas (quando usar cada uma), tipografia, espaçamento e raios, com a regra "componentes usam tokens semânticos; primitivos só dentro de `tokens.css`".
  4. **Componentes:** uma seção por componente com quando usar, variantes e um exemplo curto em JSX com texto em português.
  5. **Montando uma landing page:** esqueleto completo (`SkipLink` → `PageCanvas` → `SiteHeader` → `<main id="main">` → `Hero` → `Section`s → rodapé), igual à story `Exemplos/Landing page`.
  6. **Regras:** composição (variantes como string, compound components, `children`), acessibilidade (os itens das Global Constraints), conteúdo (pt-BR, caixa de frase, voz ativa, CTAs específicos, Highlight/Eyebrow/numeração).
  7. **Contribuindo:** estrutura de pasta de um componente, teste antes da implementação, story obrigatória, export no `index.ts`, branch `feature/<nome>` a partir de `develop`.
  8. **Scripts:** `npm test`, `npm run storybook`, `npm run build-storybook`.

- [ ] **Step 2: `Introduction.mdx`** (`Introdução`, primeira página do Storybook): `import readme from "../README.md?raw"` e `<Markdown>{readme}</Markdown>` de `@storybook/addon-docs/blocks`, para o README ter uma fonte só.

- [ ] **Step 3: `LandingPage.stories.tsx`** (`Exemplos/Landing page`, `layout: "fullscreen"`): a página completa com os componentes e o conteúdo atual do eFood (sobre nós, restaurantes ecológicos, como funciona, formulário de parceiro). Stories `Desktop` e `Mobile` (320px).

- [ ] **Step 4: Revisão de interface.** Rodar a skill `web-design-guidelines` sobre `design-system/components/**/*.tsx` e `design-system/components/**/*.module.css`; corrigir cada achado (ou registrar no README por que não se aplica).

- [ ] **Step 5: Verificação completa**

```bash
npm test                      # todos PASS
npx tsc --noEmit              # sem erros
npm run build                 # sucesso
npm run build-storybook       # sucesso
grep -rnE '#[0-9a-fA-F]{3,8}\b' design-system/components --include='*.css'   # nenhuma saída
grep -rn 'transition: all\|forwardRef\|useContext' design-system             # nenhuma saída
```

No `npm run storybook`: a story `Exemplos/Landing page` em 320px não tem scroll horizontal, o painel de acessibilidade não mostra violações em nenhuma story, e navegar só com Tab passa por SkipLink → marca → menu → ações → CTAs com foco visível.

- [ ] **Step 6: Commit** — `docs(design-system): add usage guide and landing page example`

- [ ] **Step 7: Finalizar a feature (gitflow)** — `git checkout develop && git merge --no-ff feature/design-system`

---

## Fora deste plano

- Migrar `app/page.tsx` e `components/*` para o design system e remover os estilos antigos de `app/globals.css`. Vira um plano próprio (`feature/landing-page-redesign`), feito depois que este for revisado.
- Tema escuro, ilustrações próprias no estilo da referência e testes de regressão visual.

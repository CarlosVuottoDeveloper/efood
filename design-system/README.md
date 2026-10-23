# Design system eFood

Guia de estilo e componentes padrão para montar as páginas da eFood. Tudo o que está aqui também aparece no Storybook (`npm run storybook`): esta página é a **Introdução**, as **Fundações** mostram os tokens e a story **Exemplos/Landing page** é uma landing completa montada só com estes componentes.

## O que é

Um conjunto pequeno de tokens (cores, tipografia, espaçamento, raios) e componentes React para construir landing pages com a cara da eFood. Ele mora em `design-system/` e é importado de `@/design-system`.

### Princípios

- **Uma tela branca sobre fundo sálvia.** A página é uma tela branca de cantos muito arredondados flutuando sobre um fundo verde-sálvia, e quase tudo tem forma de pílula: botões, badges, itens do menu.
- **Verde escuro com parcimônia, menta para destacar.** O verde escuro aparece pouco (item ativo do menu, ícones de ação, foco). O menta faz os destaques: card em evidência, contorno da palavra no título, separadores do menu.
- **Ousadia em um lugar só.** O título do hero é grande, de peso regular, com uma palavra contornada por uma pílula menta. Todo o resto é contido: uma família tipográfica (Urbanist), dois pesos, poucas cores.

## Como usar

Importe sempre do ponto de entrada público:

```tsx
import { Button, Hero, Text } from "@/design-system";
```

Os tokens e o CSS base já são carregados pelo `app/layout.tsx` (`tokens.css`, `base.css` e a fonte Urbanist via `next/font`). Você não precisa importar nada além dos componentes.

Para estilizar algo que é só da sua página, crie um CSS Module e use os tokens semânticos:

```css
/* app/sobre/page.module.css */
.intro {
  display: grid;
  gap: var(--space-5);
  padding-block: var(--space-8);
  color: var(--color-text-muted);
  border-radius: var(--radius-lg);
}

@media (min-width: 960px) {
  .intro {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

Breakpoints são mobile-first, com `min-width`: **640px** e **960px** (literais nas media queries, porque `var()` não funciona ali). O cabeçalho usa ainda 1280px para mostrar a prova social.

## Tokens

**Regra:** componentes e páginas usam só os tokens **semânticos** (`--color-text`, `--color-bg-surface`…). Os primitivos (`--color-sage-200`, `--color-ink-900`…) existem só dentro de `design-system/tokens/tokens.css`. Nada de hex literal no CSS dos componentes.

### Cores semânticas

| Token | Primitivo | Quando usar |
|---|---|---|
| `--color-bg-page` | `sage-200` | Fundo externo da página, em volta da tela. |
| `--color-bg-canvas` | `white` | Tela branca que contém o conteúdo; fundo de campos de formulário. |
| `--color-bg-surface` | `gray-100` | Cards, logos, seções com fundo (`Section tone="surface"`). |
| `--color-bg-highlight` | `mint-200` | Card ou logo em evidência, hover do menu. |
| `--color-text` | `ink-900` | Texto principal. |
| `--color-text-muted` | `gray-600` | Texto secundário, legendas, dicas de campo. |
| `--color-text-inverse` | `white` | Texto sobre verde de ação ou sobre o botão escuro. |
| `--color-action-primary` | `green-600` | Item de menu ativo, botão primário, círculo de ícone em botões. |
| `--color-action-dark` | `ink-900` | Botão escuro (CTA do cabeçalho). |
| `--color-border-strong` | `ink-900` | Botões contornados, campo com erro. |
| `--color-border-accent` | `mint-200` | Separadores do menu, contorno do `Highlight`. |
| `--color-focus` | `green-600` | Anel de foco do teclado. |

Contraste (WCAG AA): texto normal ≥ 4.5:1 e texto grande ou ícones ≥ 3:1. Os pares usados pelos componentes estão conferidos em **Fundações/Cores** (e testados em `tokens.test.ts`). Atenção a um deles: `--color-action-primary` sobre `--color-bg-highlight` dá 3.8:1, então só serve para ícones e texto ≥ 24px. Para combinar cores fora dessa tabela, confira o contraste antes.

### Tipografia

Uma família só, Urbanist, pesos 400 e 500.

| Token | Valor | Uso típico |
|---|---|---|
| `--font-size-100` | 0.875rem | Eyebrow, badges, texto pequeno, mensagens de campo |
| `--font-size-200` | 1rem | Texto corrido, menu, rótulos |
| `--font-size-300` | 1.125rem | Texto de abertura (`lead`), botões |
| `--font-size-400` | 1.5rem | Títulos de card, `Heading size="md"` |
| `--font-size-500` | 2.25rem | Mínimo do `Display` |
| `--font-size-600` | 3rem | Máximo dos títulos de seção (`Heading size="lg"`) |
| `--font-size-700` | 4.5rem | Máximo do `Display` |

| Token | Valor | Uso |
|---|---|---|
| `--leading-tight` | 1.1 | Display |
| `--leading-snug` | 1.25 | Títulos e botões |
| `--leading-normal` | 1.5 | Texto corrido |
| `--tracking-tight` | -0.02em | Display |
| `--tracking-wide` | 0.08em | Eyebrow |

O `Display` usa `clamp(var(--font-size-500), 6vw, var(--font-size-700))` e o `Heading size="lg"` usa `clamp(var(--font-size-500), 5vw, var(--font-size-600))`: os dois crescem com a tela e não estouram em 320px. Linhas de texto têm no máximo 65 caracteres (o `Text` já limita).

### Espaçamento

Base de 4px.

| Token | Valor | Token | Valor |
|---|---|---|---|
| `--space-1` | 0.25rem | `--space-6` | 2rem |
| `--space-2` | 0.5rem | `--space-7` | 3rem |
| `--space-3` | 0.75rem | `--space-8` | 4rem |
| `--space-4` | 1rem | `--space-9` | 6rem |
| `--space-5` | 1.5rem | `--space-10` | 8rem |

### Raios

Hierarquia do maior container para o menor: quanto mais externo, mais arredondado.

| Token | Valor | Uso |
|---|---|---|
| `--radius-xl` | 40px | Tela (`PageCanvas`) a partir de 960px |
| `--radius-lg` | 28px | Cards, seções com fundo, imagens, tela no celular |
| `--radius-md` | 20px | Campos de formulário |
| `--radius-sm` | 12px | Elementos pequenos dentro de cards (reservado; nenhum componente usa ainda) |
| `--radius-pill` | 999px | Botões, badges, avatares, itens do menu |

### Outros

| Token | Valor | Uso |
|---|---|---|
| `--border-width` | 1.5px | Bordas de botões, campos e destaques |
| `--duration-fast` | 150ms | Transições curtas |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Curva padrão |
| `--container-max` | 1240px | Largura máxima do `Container` |
| `--container-narrow` | 720px | `Container width="narrow"` |

## Componentes

Todos os componentes aceitam as props nativas do elemento raiz (`className`, `id`, `aria-*`, `style`…). A `className` que você passar é somada à do componente, depois dela.

### Tipografia

| Componente | Elemento | Props próprias | Quando usar |
|---|---|---|---|
| `Display` | `h1` | `as?: "h1" \| "h2"` | O título do hero. Um por página. |
| `Heading` | `h2`–`h4` | `level: 2 \| 3 \| 4`, `size?: "lg" \| "md" \| "sm"` | Títulos de seção e de blocos. `size` padrão: 2→`lg`, 3→`md`, 4→`sm`. |
| `Text` | `p` | `size?: "lead" \| "body" \| "small"`, `tone?: "default" \| "muted"`, `as?: "p" \| "span"` | Todo texto corrido. |
| `Eyebrow` | `p` | — | Rótulo em caixa alta acima do título. No máximo um por seção. |
| `Highlight` | `span` | — | A palavra contornada em menta no título do hero. Uma vez por página. |
| `Emphasis` | `em` | — | Trechos sublinhados dentro de um `Text`. |

```tsx
<Display>
  Comida boa, embalagem que <Highlight>volta</Highlight>
</Display>
<Text size="lead">
  Você <Emphasis>pede</Emphasis>, <Emphasis>devolve</Emphasis> e a gente higieniza.
</Text>

<Eyebrow>Sobre nós</Eyebrow>
<Heading level={2}>Uso compartilhado, menos desperdício</Heading>
<Heading level={3} size="sm">Por que devolver?</Heading>
<Text tone="muted">Devolver evita que a embalagem chegue ao aterro.</Text>
```

`Heading` escolhe a tag pelo `level` (hierarquia do documento) e o tamanho pelo `size` (visual). Não pule níveis para conseguir um tamanho: use `size`.

### Botões

| Componente | Elemento | Props próprias | Quando usar |
|---|---|---|---|
| `Button` | `button` | `variant?: "dark" \| "primary" \| "outline" \| "ghost"` (padrão `dark`); `type` padrão `"button"` | Ações: enviar formulário, abrir algo. Com `onClick`/`onSubmit` ou estado, use dentro de um componente `"use client"`. |
| `ButtonLink` | `next/link` | as props do `Link` + `variant` | Navegação com cara de botão (CTAs que levam a âncoras ou páginas). |
| `ButtonIcon` | `span` (`aria-hidden`) | `tone?: "primary" \| "dark"`, `children` obrigatório | O círculo com ícone dentro de um `Button`/`ButtonLink`. |
| `IconButton` | `button` | `label: string` (vira `aria-label`, obrigatório), `variant?: "outline" \| "mint" \| "primary" \| "dark"` | Botão só com ícone. |

Variantes:

- `dark`: CTA do cabeçalho ("Fale com a gente").
- `primary`: ação principal de uma seção ou formulário ("Quero ser parceiro").
- `outline` + `ButtonIcon`: CTA principal do hero, pílula contornada com círculo verde.
- `ghost` + `ButtonIcon tone="dark"`: ação secundária ("Saiba mais →").

```tsx
<ButtonLink href="#partners" variant="outline">
  Quero ser parceiro
  <ButtonIcon><LeafIcon /></ButtonIcon>
</ButtonLink>

<ButtonLink href="#about-us" variant="ghost">
  Saiba mais
  <ButtonIcon tone="dark"><ArrowIcon /></ButtonIcon>
</ButtonLink>

<Button variant="primary" type="submit">Quero ser parceiro</Button>

<IconButton label="Mudar idioma"><GlobeIcon /></IconButton>
```

`LeafIcon`, `ArrowIcon` e `GlobeIcon` são SVGs inline locais com `aria-hidden="true"` (veja as stories); não vêm do design system.

Os SVGs de ícone vão com `aria-hidden="true"`: quem dá nome ao botão é o texto (ou o `label` do `IconButton`).

### Badge

`Badge` (`span`), `tone?: "white" | "gray" | "mint"` (padrão `white`). Rótulos curtos em pílula: número de um passo, contagem de avaliações. Usa números tabulares.

```tsx
<Badge tone="white">01</Badge>
<Badge tone="gray">+90 avaliações</Badge>
```

### Avatar e AvatarGroup

- `Avatar` (`span`): `person: { name: string; src?: string | StaticImageData }`, `size?: "sm" | "md"` (32px / 40px). Sem `src`, mostra as iniciais e é anunciado pelo nome.
- `AvatarGroup` (`div`): `people: Person[]`, `max?: number` (padrão 3), `size?`. O excedente vira um `Badge` menta "+N", anunciado como "mais N pessoas".

```tsx
<AvatarGroup
  size="sm"
  people={[{ name: "Ana Lima" }, { name: "Bruno Reis" }, { name: "Carla Dias" }, { name: "Diego Souza" }]}
/>
```

### Layout

| Componente | Elemento | Props próprias | Quando usar |
|---|---|---|---|
| `PageCanvas` | `div` | — | Envolve a página inteira: fundo sálvia + tela branca arredondada. Um por página. |
| `Container` | `div` | `width?: "default" \| "narrow"` (1240px / 720px) | Limita a largura e dá o respiro lateral. |
| `Section` | `section` | `id: string` (obrigatório), `tone?: "plain" \| "surface"` | Cada seção da página. O `id` é a âncora do menu: o clique para no topo da seção. Se o cabeçalho ficar fixo, defina `--section-scroll-offset` com a altura dele. |
| `SectionHeader` | `div` | `align?: "start" \| "center"` | Agrupa `Eyebrow`, `Heading` e texto de abertura de uma seção. |
| `SkipLink` | `a` | `href` padrão `"#main"`, texto padrão "Pular para o conteúdo" | Primeiro elemento da página. Só aparece quando recebe foco. |

```tsx
<Section id="about-us" aria-labelledby="about-us-title">
  <Container>
    <SectionHeader align="center">
      <Eyebrow>Sobre nós</Eyebrow>
      <Heading level={2} id="about-us-title">Uso compartilhado, menos desperdício</Heading>
    </SectionHeader>
  </Container>
</Section>
```

Dê a toda `Section` um `aria-labelledby` apontando para o seu título, para que ela apareça como região nomeada para leitores de tela.

### SiteHeader e NavPills

Compound components: `SiteHeader = { Root, Brand, Actions, SocialProof }` e `NavPills = { Root, Item }`.

| Parte | Elemento | Props próprias |
|---|---|---|
| `SiteHeader.Root` | `header` | — |
| `SiteHeader.Brand` | `next/link` (`translate="no"`) | `href` e `children` obrigatórios |
| `SiteHeader.Actions` | `div` | — |
| `SiteHeader.SocialProof` | `div` | — (só aparece a partir de 1280px) |
| `NavPills.Root` | `nav > ul` | `label: string` (vira `aria-label`, obrigatório) |
| `NavPills.Item` | `li > a` | `href` obrigatório, `current?: boolean` (vira `aria-current="location"` e pinta a pílula de verde) |

Comportamento responsivo (intencional):

- abaixo de 960px, o cabeçalho empilha em três linhas, na mesma ordem do DOM e do Tab: marca, menu, ações. O menu rola na horizontal se não couber;
- a partir de 960px: tudo numa linha (marca, menu centralizado, ações);
- a partir de 1280px aparece o `SocialProof`.

```tsx
<SiteHeader.Root>
  <SiteHeader.Brand href="#main">
    <Image src={logo} alt="" width={32} height={32} unoptimized />
    eFood
  </SiteHeader.Brand>
  <NavPills.Root label="Principal">
    <NavPills.Item href="#main" current>Início</NavPills.Item>
    <NavPills.Item href="#about-us">Sobre nós</NavPills.Item>
    <NavPills.Item href="#partners">Parceiros</NavPills.Item>
  </NavPills.Root>
  <SiteHeader.Actions>
    <SiteHeader.SocialProof>
      <AvatarGroup people={reviewers} size="sm" />
      <Badge tone="gray">+90 avaliações</Badge>
    </SiteHeader.SocialProof>
    <ButtonLink href="#partners" variant="dark">Fale com a gente</ButtonLink>
  </SiteHeader.Actions>
</SiteHeader.Root>
```

A ordem dos filhos é a ordem do Tab: marca → menu → ações.

### Hero

Compound component `Hero = { Root, Content, Actions, Media }`. `Hero.Root` é uma `section` (dê a ela `aria-labelledby` apontando para o `Display`); as demais partes são `div`. Uma coluna no celular, duas a partir de 960px. O `Hero.Root` já traz o respiro vertical da seção (32/64px no celular, 48/96px a partir de 960px) e o `Hero.Actions` fica um pouco mais afastado do texto que os outros itens; não some margens por fora. A imagem de `Hero.Media` ganha cantos `--radius-lg` e entra com uma animação curta de escala e opacidade, desligada com `prefers-reduced-motion`.

```tsx
<Container>
  <Hero.Root aria-labelledby="hero-title">
    <Hero.Content>
      <Display id="hero-title">
        Comida boa, embalagem que <Highlight>volta</Highlight>
      </Display>
      <Text size="lead">Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros.</Text>
      <Hero.Actions>
        <ButtonLink href="#partners" variant="outline">
          Quero ser parceiro
          <ButtonIcon><LeafIcon /></ButtonIcon>
        </ButtonLink>
      </Hero.Actions>
    </Hero.Content>
    <Hero.Media>
      <Image src={lifecycle} alt="Ciclo de vida da embalagem retornável" sizes="(min-width: 960px) 50vw, 100vw" priority />
    </Hero.Media>
  </Hero.Root>
</Container>
```

### FeatureCard

Compound component `FeatureCard = { Root, Content, Meta, Title, Media }`.

| Parte | Elemento | Props próprias |
|---|---|---|
| `FeatureCard.Root` | `article` | `tone?: "gray" \| "mint"` (padrão `gray`; `mint` para o card em evidência) |
| `FeatureCard.Content` | `div` | — (coluna de texto: agrupa `Meta`, `Title` e textos extras) |
| `FeatureCard.Meta` | `div` | — (linha de badge, avatares, ícone) |
| `FeatureCard.Title` | `h3` | `as?: "h3" \| "h4"` |
| `FeatureCard.Media` | `div` | — (ilustração; fica à direita a partir de 640px) |

Use para passos ("como funciona") e destaques. Numeração ("01", "02") só quando o conteúdo é uma sequência de verdade; nesse caso, coloque os cards numa `<ol>`.

```tsx
<ol>
  <li>
    <FeatureCard.Root aria-labelledby="step-01">
      <FeatureCard.Content>
        <FeatureCard.Meta>
          <Badge tone="white">01</Badge>
        </FeatureCard.Meta>
        <FeatureCard.Title id="step-01">Peça no restaurante parceiro</FeatureCard.Title>
        <Text tone="muted">Sua refeição chega numa embalagem durável.</Text>
      </FeatureCard.Content>
      <FeatureCard.Media>
        <OrderIllustration />
      </FeatureCard.Media>
    </FeatureCard.Root>
  </li>
</ol>
```

O card é um grid de duas colunas a partir de 640px: `Content` à esquerda e `Media` à direita. O espaçamento interno já vem pronto (24px entre `Meta` e `Title`, 8px entre `Title` e o texto), então não adicione margens. A ilustração ocupa 11rem (13rem a partir de 960px) e encosta na borda de baixo do card.

### LogoWall

Compound component `LogoWall = { Root, Item }`.

- `LogoWall.Root` (`ul`): `label: string` (vira `aria-label`, obrigatório). Grade de 2 colunas no celular e 6 a partir de 960px.
- `LogoWall.Item` (`li`): `variant?: "default" | "featured"`. O `featured` é menta e ocupa duas colunas: use no primeiro item. Com cinco itens (um `featured` + quatro) as linhas fecham certinho nas duas grades.

```tsx
<LogoWall.Root label="Restaurantes parceiros">
  <LogoWall.Item variant="featured"><span translate="no">Café Vila</span></LogoWall.Item>
  <LogoWall.Item><span translate="no">Cantina Lume</span></LogoWall.Item>
  <LogoWall.Item><span translate="no">Bistrô Raiz</span></LogoWall.Item>
  <LogoWall.Item><span translate="no">Padaria Grão</span></LogoWall.Item>
  <LogoWall.Item><span translate="no">Sabor da Feira</span></LogoWall.Item>
</LogoWall.Root>
```

Nomes de marca vão com `translate="no"`. Para logos em imagem, use `next/image` com `alt` igual ao nome do restaurante.

### Field e Checkbox

Compound component `Field = { Root, Label, Input, Textarea, Message }`, mais o `Checkbox` avulso.

| Parte | Elemento | Props próprias |
|---|---|---|
| `Field.Root` | `div` | `hint?: string`, `error?: string` |
| `Field.Label` | `label` | — (o `htmlFor` é ligado automaticamente) |
| `Field.Input` | `input` | — (recebe `id`, `aria-describedby` e `aria-invalid` do `Root`) |
| `Field.Textarea` | `textarea` | — (idem) |
| `Field.Message` | `p` (`aria-live="polite"`) | sem `children`: mostra o `error` ou, sem erro, o `hint` |
| `Checkbox` | `label > input[type=checkbox]` | `children` obrigatório (o rótulo). `className` vai no `label`; as demais props, no `input` |

Com `error`, o campo ganha `aria-invalid="true"`, borda mais grossa e a mensagem com ícone. Se você passar `aria-describedby` no `Input`, ele é somado ao da mensagem.

```tsx
<form className={styles.form}>
  <Field.Root>
    <Field.Label>Nome</Field.Label>
    <Field.Input name="name" autoComplete="name" />
    <Field.Message />
  </Field.Root>
  <Field.Root hint="Usaremos para enviar o contato comercial" error={emailError}>
    <Field.Label>E-mail</Field.Label>
    <Field.Input name="email" type="email" autoComplete="email" spellCheck={false} />
    <Field.Message />
  </Field.Root>
  <Checkbox name="receiveEmails">Quero receber os e-mails informativos da eFood</Checkbox>
  <Button variant="primary" type="submit">Quero ser parceiro</Button>
</form>
```

Sempre dê `name`, `autoComplete` e o `type` certo (`email`, `tel`) aos campos. Mensagens de erro dizem como corrigir: "Informe um e-mail válido, como nome@restaurante.com", não "E-mail inválido".

## Montando uma landing page

O esqueleto abaixo é resumido da story **Exemplos/Landing page** (`design-system/examples/LandingPage.stories.tsx`). Copie a story para começar; o layout entre os componentes (colunas, espaçamentos) fica num CSS Module da página, como `LandingPage.module.css`.

```tsx
import Image from "next/image";
import logo from "@/public/img/logo.svg";
import lifecycle from "@/public/img/product-lifecycle.webp";
import {
  Button, ButtonIcon, ButtonLink, Checkbox, Container, Display, Eyebrow, FeatureCard, Field,
  Heading, Hero, Highlight, LogoWall, NavPills, PageCanvas, Section, SectionHeader, SiteHeader,
  SkipLink, Text,
} from "@/design-system";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SkipLink />
      <PageCanvas>
        <SiteHeader.Root>
          <SiteHeader.Brand href="#main">
            <Image src={logo} alt="" width={32} height={32} unoptimized />
            eFood
          </SiteHeader.Brand>
          <NavPills.Root label="Principal">
            <NavPills.Item href="#main" current>Início</NavPills.Item>
            <NavPills.Item href="#about-us">Sobre nós</NavPills.Item>
            <NavPills.Item href="#eco-restaurants">Restaurantes</NavPills.Item>
            <NavPills.Item href="#partners">Parceiros</NavPills.Item>
          </NavPills.Root>
          <SiteHeader.Actions>
            <ButtonLink href="#partners" variant="dark">Fale com a gente</ButtonLink>
          </SiteHeader.Actions>
        </SiteHeader.Root>

        <main id="main">
          <Container className={styles.hero}>
            <Hero.Root aria-labelledby="hero-title">
              <Hero.Content>
                <Display id="hero-title">
                  Comida boa, embalagem que <Highlight>volta</Highlight>
                </Display>
                <Text size="lead">Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros.</Text>
                <Hero.Actions>
                  <ButtonLink href="#partners" variant="outline">
                    Quero ser parceiro
                    <ButtonIcon><LeafIcon /></ButtonIcon>
                  </ButtonLink>
                  <ButtonLink href="#about-us" variant="ghost">
                    Saiba mais
                    <ButtonIcon tone="dark"><ArrowIcon /></ButtonIcon>
                  </ButtonLink>
                </Hero.Actions>
              </Hero.Content>
              <Hero.Media>
                <Image src={lifecycle} alt="Ciclo de vida da embalagem retornável" sizes="(min-width: 960px) 50vw, 100vw" priority />
              </Hero.Media>
            </Hero.Root>
          </Container>

          <Section id="about-us" aria-labelledby="about-us-title">
            <Container>
              <SectionHeader>
                <Eyebrow>Sobre nós</Eyebrow>
                <Heading level={2} id="about-us-title">Uso compartilhado, menos recursos, menos desperdício</Heading>
              </SectionHeader>
              {/* … */}
            </Container>
          </Section>

          <Section id="eco-restaurants" tone="surface" aria-labelledby="eco-restaurants-title">
            {/* Eyebrow + Heading + Text + imagem, em duas colunas a partir de 960px */}
          </Section>

          <Section id="how-it-works" aria-labelledby="how-it-works-title">
            {/* SectionHeader centralizado + <ol> com três FeatureCard numerados */}
          </Section>

          <Section id="partner-network" aria-labelledby="partner-network-title">
            {/* SectionHeader centralizado + LogoWall */}
          </Section>

          <Section id="partners" tone="surface" aria-labelledby="partners-title">
            {/* SectionHeader + formulário com Field, Checkbox e Button primary */}
          </Section>
        </main>

        <footer className={styles.footer}>
          <Container>
            <Text size="small" tone="muted">
              <span translate="no">eFood</span> · Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros.
            </Text>
          </Container>
        </footer>
      </PageCanvas>
    </>
  );
}
```

Pontos que fazem a página funcionar:

- `SkipLink` é o primeiro elemento focável e aponta para `<main id="main">`.
- Um `Display` (h1) por página, no hero; cada seção tem um `Heading level={2}`; cards e subtópicos usam `level={3}`.
- Os `id` das seções são as âncoras do menu (`#about-us`, `#eco-restaurants`, `#partners`).
- O `Highlight` aparece uma vez, no hero. O `Eyebrow` aparece no máximo uma vez por seção.
- Handlers de evento (`onSubmit`, `onClick`…) ou estado não podem ficar num Server Component: coloque esse pedaço num componente pequeno com `"use client"`. O `Field` já resolve o próprio lado cliente (veja [Contribuindo](#contribuindo)).

A landing do site (`app/page.tsx`) é montada só com o design system: as seções ficam em `components/landing/`, uma por arquivo, e o layout delas em `components/landing/landing.module.css`. As fotos vêm do Pexels (`public/img/pexels/`), com crédito aos fotógrafos no rodapé.

## Regras

### Composição

- **Variantes são strings, não booleanos.** `variant="outline"`, `tone="muted"`, `size="lg"`: nunca `isOutline` ou `muted`. A variante vira um `data-*` no elemento raiz (`data-variant="outline"`), e o CSS estiliza pelo atributo.
- **Peças com várias partes são compound components** (`Hero.Root`, `Hero.Content`…), compostas por `children`. Nada de `renderHeader` ou props que recebem JSX.
- **Componentes aceitam as props nativas** do elemento raiz e repassam tudo; a `className` recebida vem depois da própria.
- **React 19:** sem `forwardRef` (`ref` é prop comum) e `use(Context)` em vez de `useContext`.
- **`"use client"` só onde há hook ou estado.** Hoje, só nas partes do `Field`.

### Acessibilidade

- Contraste WCAG AA: texto normal ≥ 4.5:1, texto grande e ícones ≥ 3:1. Verde de ação sobre menta (3.8:1) só para ícones e texto ≥ 24px.
- Todo elemento interativo tem foco visível: `outline: 2px solid var(--color-focus); outline-offset: 3px` em `:focus-visible` (já vem do `base.css`).
- Imagens com `next/image`, com `width`/`height` (ou import estático). Imagem decorativa leva `alt=""`; imagem com conteúdo leva um `alt` que diz o que ela mostra.
- Ícones decorativos levam `aria-hidden="true"`. Botão só com ícone usa `IconButton` com `label`.
- `<button>` para ações, `<a>`/`ButtonLink` para navegação.
- Títulos em ordem (h1 → h2 → h3), `SkipLink` no topo, `<main id="main">`.
- Animação só de `transform` e `opacity`, nunca `transition: all`. Com `prefers-reduced-motion: reduce`, o `base.css` zera as durações.
- Nada de rolagem horizontal da página em 320px.
- O painel **Accessibility** do Storybook deve ficar sem violações em toda story.

### Conteúdo

- Texto da interface em **português do Brasil**; nomes de arquivo, componente, prop e classe em inglês.
- **Caixa de frase** em títulos e botões: "Quero ser parceiro", "Como funciona". As Web Interface Guidelines da Vercel pedem Title Case (padrão do inglês); em pt-BR isso soa errado, então aqui a regra é caixa de frase, de propósito.
- **Voz ativa**: "A gente higieniza a embalagem", não "A embalagem é higienizada".
- **CTAs específicos**: "Quero ser parceiro", "Fale com a gente", nunca "Enviar" ou "Clique aqui". Os CTAs em primeira pessoa ("Quero…") são escolha de marca, também uma exceção consciente às guidelines (que preferem segunda pessoa).
- Títulos com `text-wrap: balance` e parágrafos com `text-wrap: pretty` (os componentes de tipografia já aplicam).
- Use `…` (reticências) e não `...`; nomes de marca com `translate="no"`.
- `Highlight`: uma vez por página, no título do hero. `Eyebrow`: no máximo um por seção. Numeração ("01", "02"): só quando o conteúdo é uma sequência de verdade, como os passos de "como funciona".

## Contribuindo

### Estrutura de um componente

```
design-system/components/LogoWall/
  LogoWall.tsx          # componente (ou compound component)
  LogoWall.module.css   # estilos, só com tokens semânticos
  LogoWall.test.tsx     # testes (Vitest + Testing Library)
  LogoWall.stories.tsx  # story obrigatória, com texto em pt-BR
```

Passo a passo:

1. Crie a branch `feature/<nome>` a partir de `develop`.
2. Escreva o teste primeiro (`describe`/`it`/`expect` importados de `vitest`), rode e veja falhar.
3. Implemente: props nativas do elemento raiz com spread, `className` concatenada com `cx` (`design-system/utils/cx.ts`), variantes como união de strings refletidas em `data-*`.
4. CSS Module só com `var(--…)`: nada de hex, nada de `transition: all`, breakpoints 640px e 960px com `min-width`.
5. Escreva a story (`Componentes/<Nome em pt-BR>`), incluindo um caso de texto longo e um em 320px quando o componente for responsivo. Para 320px: `globals: { viewport: { value: "mobile320", isRotated: false } }`.
6. Exporte o componente e os tipos em `design-system/index.ts`.
7. Rode `npm test`, `npx tsc --noEmit` e `npm run build-storybook` antes do commit, e confira o painel de acessibilidade.

### Compound components com estado (regra do `"use client"`)

Um Server Component do Next.js não consegue acessar `Field.Root` se o objeto `Field` for exportado de um arquivo com `"use client"` ("You cannot dot into a client module from a server component"). Por isso o `Field` é dividido em dois arquivos:

- `Field/FieldParts.tsx` tem `"use client"` e exporta cada parte como função (`FieldRoot`, `FieldLabel`, `FieldInput`…) junto com o contexto;
- `Field/Field.tsx` **não** tem a diretiva e só monta o objeto: `export const Field = { Root: FieldRoot, Label: FieldLabel, … }`.

Siga o mesmo padrão em qualquer compound component novo que precise de hook ou estado: partes no arquivo cliente, namespace num arquivo sem diretiva.

## Scripts

| Comando | O que faz |
|---|---|
| `npm test` | Roda todos os testes (Vitest). |
| `npm run storybook` | Abre o Storybook em http://localhost:6006. |
| `npm run build-storybook` | Gera o Storybook estático em `storybook-static/`. |
| `npx tsc --noEmit` | Confere os tipos. |
| `npm run dev` / `npm run build` | Servidor de desenvolvimento / build de produção do Next.js. |

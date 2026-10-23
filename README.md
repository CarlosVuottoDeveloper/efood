# eFood

Landing page da eFood, empresa que substitui embalagens descartáveis por embalagens reutilizáveis compartilhadas pela rede de cafés e restaurantes parceiros. Feita com Next.js 16 e React 19, em TypeScript.

## Design system

Os tokens e os componentes da página ficam em `design-system/`. Leia o guia antes de criar ou mudar uma tela: [design-system/README.md](design-system/README.md). O mesmo guia abre como **Introdução** no Storybook.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em http://localhost:3000. |
| `npm run build` / `npm start` | Build de produção e servidor. |
| `npm test` | Testes (Vitest + Testing Library). |
| `npm run storybook` | Storybook em http://localhost:6006. |
| `npm run build-storybook` | Storybook estático em `storybook-static/`. |

## Fluxo de branches (gitflow)

- `main`: o que está em produção.
- `develop`: integração; toda feature nasce e volta para cá.
- `feature/<nome>`: uma branch por trabalho, criada a partir de `develop` e integrada com `git merge --no-ff`.

```bash
git checkout develop
git checkout -b feature/minha-feature
# … commits …
git checkout develop
git merge --no-ff feature/minha-feature
```

`develop` vai para `main` quando a versão estiver pronta para publicar.

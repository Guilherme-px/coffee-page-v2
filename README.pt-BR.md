> **🇺🇸 Read in English** — [README.md](./README.md)

# Café Aube — Landing Page

Uma landing page fictícia para cafeteria em Montréal — feita com Nuxt 4 e Nuxt UI como projeto de portfólio.
[Demo](https://aube-coffee.vercel.app/)

> **🔄 v2 — reescrita** — Esta é uma reescrita de um projeto que construí em 2021 com Vue 2 + Vuetify. Mesmo conceito, nova stack: Nuxt 4, TypeScript, Nuxt UI e uma base 100% testada. Veja [A versão antiga](https://github.com/Guilherme-px/coffee-page-v1).

## Sobre o projeto

Café Aube é uma cafeteria **fictícia** em Montréal — uma demo construída para parecer real. A marca, o endereço, os horários e as 340 xícaras diárias são inventados, mas tudo em volta deles é de nível de produção: uma arquitetura de componentes que escala, conteúdo guiado por dados, uma suíte completa de testes e um SEO que um negócio real publicaria.

Toda a experiência é construída a partir de componentes pequenos e focados sem templates, sem temas comprados.

**Seções:**

- **Hero** — carrossel em tela cheia com autoplay, drag/swipe e imagens responsivas (cortes separados para mobile)
- **About** — imagens sobrepostas, stats editoriais com contagem que dispara ao entrar no viewport
- **Menu** — reveals escalonados, efeitos de hover, preços e descrições 100% guiados por dados
- **Visit** — horários que destacam o dia atual, calculados com o fuso real de Montréal
- **Navbar** — scrollspy, transição de transparente para sólida ao rolar, e um badge de aberto/fechado que sabe a hora real de Montréal

O site é totalmente pré-renderizado (SSG) e vem com SEO de fábrica: Open Graph, Twitter cards, sitemap, robots.txt e schema.org de negócio local gerado a partir dos mesmos dados que alimentam a UI.

## Stack

| Camada | Ferramentas |
|---|---|
| Framework | Nuxt 4, Vue 3, TypeScript |
| UI | Nuxt UI 4 (Tailwind CSS 4), @nuxt/image |
| Testes | Vitest 4, @nuxt/test-utils (dois projetos: unit + nuxt) |
| Qualidade | ESLint (flat config) + oxlint, oxfmt, @nuxt/a11y |
| SEO | @nuxtjs/seo (meta, sitemap, robots, schema.org) |

## Notas de arquitetura

- **Componentes pequenos** — cada peça de UI é um arquivo (`AppNavbar` compõe `NavbarLogo`, `NavbarLinks`, `OpenStatusBadge`...), cada um com responsabilidade única
- **Guiado por dados** — todo o conteúdo (links, itens do menu, horários, contatos) vive em `app/app.config.ts`; os componentes recebem por props, então adicionar um item ao menu é editar um arquivo ou trocar a marca inteira para um cliente real
- **Lógica pura extraída** — fuso horário, formatação de preço e busca de horário vivem em `app/utils/` e `app/composables/` como funções puras e testáveis
- **100% de cobertura garantida** — thresholds de cobertura falham a suíte em qualquer regressão, para statements, branches, functions e lines

## Rodar o projeto local

### Requisitos

- Bun 1.2+ (ou Node 20+ com npm/yarn/pnpm — os comandos abaixo usam Bun)

### Instalação

    git clone https://github.com/Guilherme-px/coffee-page-v2
    cd coffee-page-v2
    bun install

### Start local

    bun run dev

Abra http://localhost:3000

### Testes

    bun run test            # roda todos os testes uma vez
    bun run test:coverage   # relatório de cobertura + thresholds de 100%

### Lint & formatação

    bun run lint            # oxlint + eslint
    bun run format          # oxfmt

### Produção

    bun run generate        # pré-renderiza o site em HTML estático (.output/public)
    bun run preview         # serve o resultado gerado localmente

## A versão antiga

Este projeto é o sucessor da minha primeira landing page de cafeteria, construída em 2021 com **Vue 2 + Vuetify**. Aquela versão foi minha introdução ao Vuejs com Vue 2, esta reescrita aplica tudo o que aprendi desde então código tipado, composables em vez de mixins, design tokens em vez de overrides de tema, testes como cidadãos de primeira classe, deploy na vercel ao invés do github pages.

O que ficou igual: o conceito e o capricho nos detalhes. O que mudou: todo o conhecimento técnico resultantes de 5 anos de estudos e prática até aqui.

## Licença

MIT
# Frontend do Ethernal Strike

## Visão geral
Este diretório contém o frontend funcional criado para o projeto **Ethernal Strike**. Ele inclui um protótipo em **Next.js** com páginas para:

- Home
- Torneios
- Perfil
- Hall da Fama

Também inclui componentes compartilhados e dados de exemplo.

## Estrutura de arquivos

- `app/`
  - `layout.tsx` — Layout principal do app com a `Navbar` global.
  - `page.tsx` — Página inicial do site.
  - `tournaments/page.tsx` — Página de listagem e criação de torneios.
  - `profile/page.tsx` — Página de perfil do atleta com simulação de conexão de wallet.
  - `hall-da-fama/page.tsx` — Página de ranking/hall da fama.
  - `globals.css` — Estilos globais do frontend.
- `components/`
  - `Navbar.tsx` — Barra de navegação principal.
  - `TournamentCard.tsx` — Cartão de apresentação de torneios.
- `lib/`
  - `mockData.ts` — Dados de exemplo para torneios, perfil e hall da fama.
- `package.json` — Dependências e scripts do frontend.
- `package-lock.json` — Lockfile gerado pelo npm.
- `tsconfig.json` — Configuração TypeScript do projeto.
- `next-env.d.ts` — Tipagens automáticas geradas pelo Next.js.

## Como executar

1. Abra um terminal no projeto:

   ```bash
   cd /workspaces/ETHERNAL-STRIKE-The-Solana-Protocol/frontend
   ```

2. Instale as dependências (caso ainda não estejam instaladas):

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev -- --hostname 0.0.0.0 --port 3000
   ```

4. Acesse no navegador:

   ```text
   http://127.0.0.1:3000
   ```

## Sobre a funcionalidade

O frontend atual é um protótipo útil que permite:

- visualizar e criar torneios com dados simulados;
- ver um perfil de atleta com estatísticas e carteira;
- explorar um ranking de hall da fama;
- navegar entre as páginas usando a navbar.

## Observações

- O projeto usa dados mockados em memória no lugar de uma integração real com Solana.
- Para transformar em um produto completo, basta conectar as páginas ao backend ou ao smart contract Anchor.

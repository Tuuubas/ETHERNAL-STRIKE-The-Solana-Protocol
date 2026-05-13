# Documentação do Frontend

## Objetivo
O frontend criado é um protótipo estático/cliente com foco em apresentar as telas principais do projeto:
- gestão de torneios;
- perfil de atleta;
- hall da fama.

## Arquivos principais

### `app/page.tsx`
Página inicial com navegação para as principais seções e resumo das funcionalidades.

### `app/tournaments/page.tsx`
Página mais funcional do protótipo.
- apresenta lista de torneios existentes;
- permite criar novos torneios via formulário;
- atualiza a interface usando estado local.

### `app/profile/page.tsx`
Página de perfil que simula conexão de wallet.
- mostra informações de atleta;
- exibe estatísticas como jogos, vitórias e medalhas.

### `app/hall-da-fama/page.tsx`
Página de ranking com os principais times e conquistas do hall da fama.

### `components/Navbar.tsx`
Componente de navegação global usado em todas as páginas.

### `components/TournamentCard.tsx`
Componente reutilizável que renderiza um cartão de torneio.

### `lib/mockData.ts`
Fonte de dados de exemplo usada pelas páginas.

## Como estender

- Use `lib/mockData.ts` como base para trocar dados estáticos por chamadas reais.
- Crie novas páginas em `app/` e novos componentes em `components/`.
- Conecte o app a uma API ou smart contract usando `useEffect` e fetch/solana web3.

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento.
- `npm run build` — gera o build de produção.
- `npm run start` — inicia o aplicativo em modo de produção.

## Observações de organização

O frontend agora está organizado em:

- `frontend/app`
- `frontend/components`
- `frontend/lib`

Isso mantém o código da aplicação separado do restante do projeto e facilita o desenvolvimento futuro.

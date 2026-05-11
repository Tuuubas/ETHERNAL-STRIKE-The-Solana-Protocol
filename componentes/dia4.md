# Dia 4 — Construção do Site

## 1. Objetivo
Criar um site funcional para o projeto **Ethernal Strike / PK Class**, transformando as ideias de Web3 e Solana em uma interface real que suporte:

- criação e gestão de torneios escolares;
- registro de resultados e chaves de mata-mata;
- conexão de wallet Solana (Phantom / Solflare);
- exibição do histórico de vitórias e medalhas digitais (SBT);
- feed público com jogos e classificação.

## 2. Arquitetura sugerida

### Frontend
- **Next.js 14** (React) para rotas, renderização e estrutura de páginas.
- **Tailwind CSS** para estilo rápido, responsivo e visual moderno.
- **@solana/wallet-adapter-react** + adapters para Phantom/Solflare.
- **@solana/web3.js** para chamadas RPC e envio de transações.

### Backend / On-chain
- **Anchor + Rust** para o smart contract / programa em Solana.
- **IDL gerado pelo Anchor** para consumir no frontend.
- **Devnet / Testnet** para prototipar antes do deploy final.

### Armazenamento de mídia
- **IPFS / Arweave** para fotos de jogos, caso queira adicionar imagens descentralizadas.

## 3. Estrutura de páginas do site

### 1. Home
- Header com nome do projeto e slogan: “O desporto escolar encontra o futuro da Web3.”
- Apresentação rápida dos benefícios: velocidade, transparência, legado eterno.
- CTA para conectar a wallet.
- Resumo das funcionalidades: torneios, resultados, hall da fama, perfis.

### 2. Torneios
- Lista de competições ativas e passadas.
- Botão para Criar Torneio (visível para organizadores/professores).
- Cartões com informações: nome, status, data, número de equipes.
- Link para página de cada torneio.

### 3. Torneio específico
- Visão geral do torneio: regras, fases e participantes.
- Árvore de mata-mata ou tabela de resultados.
- Botões para registrar partida / atualizar placar (somente árbitros/professores).
- Histórico de jogos e resultado final.

### 4. Perfil
- Identidade do aluno/equipe conectada.
- Histórico de participações e conquistas.
- Lista de medalhas SBT ou troféus on-chain.
- Estatísticas pessoais: jogos, vitórias e classificação.

### 5. Hall da Fama
- Ranking público de equipes e alunos.
- Cards com conquistas eternas, medalhas, e eventos marcantes.
- Busca por nome de aluno ou escola.

## 4. Componentes-chave no frontend

- `Navbar` com conexão de wallet e navegação.
- `TournamentCard` para cada torneio.
- `MatchTable` para resultados.
- `ProfileCard` para o aluno/equipe.
- `Leaderboard` para classificação.
- `LoadingSpinner` / `StatusBanner` para transações.

## 5. Funcionalidades principais a implementar

### A. Conexão Web3
- Detectar wallet Solana.
- Pedir permissão ao usuário para conectar.
- Exibir endereço encurtado e saldo SOL.

### B. Criação de torneio
- Formulário com nome, descrição, formato e regras.
- Geração de estrutura de fases on-chain.
- Registro de criador como administrador do torneio.

### C. Registro de resultados
- Interface para árbitros validarem placares.
- Atualização de chaves de mata-mata no smart contract.
- Emissão de eventos para frontend atualizar dados.

### D. Histórico e hall da fama
- Puxar eventos on-chain e mostrar partidas finalizadas.
- Exibir conquistas eternas de alunos/equipes.
- Permitir busca e filtro por ano, modalidade e escola.

### E. SBT / Medalhas digitais
- Implementar emissão de tokens intransferíveis (Soulbound Tokens) para campeões.
- Mostrar medalhas no perfil do usuário.

## 6. Plano de execução para o Dia 4

1. Configurar o projeto Next.js com Tailwind.
2. Estruturar páginas principais: Home, Torneios, Perfil, Hall da Fama.
3. Instalar wallets Solana e conectar ao frontend.
4. Criar componentes visuais para torneios e resultados.
5. Prototipar o fluxo de criação de torneio sem Web3 primeiro.
6. Integrar com o smart contract na sequência, usando IDL do Anchor.
7. Testar no Devnet / Localnet e ajustar o UX de transações.

## 7. Exemplo de mapa de tarefas

- [ ] Bootstrapping do frontend Next.js
- [ ] Layout principal responsivo
- [ ] Conexão de wallet Solana
- [ ] Página de lista de torneios
- [ ] Página de torneio com árvore/mata-mata
- [ ] Dashboard de perfil e hall da fama
- [ ] Smart contract básico de torneios
- [ ] Integração frontend ↔ on-chain
- [ ] Testes iniciais de fluxo de jogo

## 8. Recomendações de tecnologias e padrões

- Use Next.js App Router com `app/` se o projeto for novo.
- Prefira componentes funcionais React + Hooks.
- Mantenha estado com React Context ou Zustand para conexão de wallet e dados do torneio.
- Utilize TypeScript para segurança e escalabilidade.
- Crie uma camada de serviços: `services/solana.ts` para chamadas on-chain.

## 9. Próximos passos imediatos

1. Defina a página principal do protótipo.
2. Estruture o menu de navegação.
3. Implemente a conexão de wallet como prioridade.
4. Modele o primeiro Torneio e o flow de Registrar Resultado.
5. Conecte o frontend a um smart contract Anchor simples.

---

> Com este guia, você terá um plano funcional claro para avançar do design e arquitetura para um site real. Se quiser, posso também gerar a estrutura inicial de arquivos Next.js e um esboço de componentes para começar a codar imediatamente.

# PK Class 🏀 ⛓️
**O desporto escolar encontra o futuro da Web3**

---

## 1. Visão Geral
O **PK Class** é um dApp (Decentralized Application) inovador construído sobre a blockchain **Solana**. O seu propósito fundamental é modernizar e descentralizar a gestão de competições interclasses em ambiente escolar. 

Ao transpor os resultados desportivos para a rede, o projeto elimina a falta de transparência, a volatilidade dos registos físicos e o esquecimento histórico das conquistas dos alunos, transformando cada ponto num registo imutável que compõe o **Legado Digital** da instituição e dos seus estudantes.

---

## 2. Stack Técnica (Arquitetura Web3)
A infraestrutura foi selecionada para garantir escalabilidade, segurança e uma experiência de utilizador (UX) fluida:

* **Blockchain:** Solana (Devnet para testes / Mainnet para produção).
* **Smart Contracts (On-chain Logic):** Desenvolvidos em **Rust** utilizando o **Anchor Framework** para garantir a segurança dos dados.
* **Frontend:** **React/Next.js** com **Tailwind CSS** para uma interface responsiva e moderna.
* **Integração Web3:** `@solana/web3.js` e **Solana Wallet Adapter** para interação direta com a rede.
* **Autenticação & Oráculos:** Sistema de validação via e-mail institucional para garantir que apenas membros da comunidade escolar possam registar dados oficiais.
* **Armazenamento Descentralizado:** Utilização de **IPFS/Arweave** para preservação de fotografias e multimédia dos eventos.

---

## 3. Proposta de Valor: Resolução de Dores

### 3.1. Eficiência Operacional
Substituição de métodos arcaicos (papel, quadros brancos ou ficheiros Excel isolados) por um fluxo automatizado. O sistema gere chaves de torneio (mata-mata), tabelas de pontos e calendários de forma dinâmica.

### 3.2. Transparência e Imutabilidade
Conflitos sobre resultados são comuns em competições escolares. No PK Class, uma vez que o resultado é validado pelo organizador e registado na Solana, ele torna-se auditável por qualquer pessoa (alunos, encarregados de educação e direção), impedindo manipulações posteriores.

### 3.3. Preservação de Memória (Hall da Fama)
Atualmente, as glórias desportivas escolares perdem-se com o tempo. O PK Class cria um registo histórico eterno. Um aluno que foi campeão há cinco anos poderá sempre comprovar a sua conquista através do seu identificador digital na blockchain.

---

## 4. O Diferencial Solana
A escolha da Solana como base tecnológica deve-se a três pilares críticos:
1.  **Velocidade:** Confirmação de transações em milissegundos, essencial para atualizações de placares em tempo real.
2.  **Custo Irrisório:** As taxas de transação (*gas fees*) são de frações de cêntimo, tornando o projeto viável para o orçamento de instituições de ensino.
3.  **Eco-friendly:** A rede Solana possui um baixo consumo energético, alinhando-se com os valores de sustentabilidade das escolas modernas.

---

## 5. Fluxo de Operação do Sistema

1.  **Criação e Gestão:** O Professor/Organizador autentica-se com as suas credenciais institucionais e configura o torneio (modalidade, número de equipas, regras).
2.  **Inscrição Digital:** As equipas (turmas) são registadas. Os alunos podem ser associados às suas respetivas equipas através de *wallets* ou perfis vinculados.
3.  **Execução e Validação:** Após cada partida, o resultado é inserido no dApp. O organizador "assina" a transação, enviando os dados para o *Program* (Smart Contract) na Solana.
4.  **Consumo de Dados:** Os alunos acedem a um *feed* em tempo real, visualizam estatísticas, histórico de confrontos e a evolução das turmas no ranking geral.

---

## 6. Roadmap de Desenvolvimento

* [ ] **Fase 1:** Implementação do Smart Contract base para gestão de torneios e pontuações.
* [ ] **Fase 2:** Desenvolvimento do Dashboard de Administrador para Professores e Coordenadores.
* [ ] **Fase 3:** Lançamento do Perfil do Aluno com sistema de "Crachás Digitais" (Medalhas de participação/vitória).
* [ ] **Fase 4:** Integração de metadados multimédia (fotos e vídeos) via IPFS.
* [ ] **Fase 5:** Expansão para sistema de governança (alunos podem votar no "Melhor Jogador do Torneio" on-chain).

---

## 7. Conclusão e Entregáveis Detalhados

O projeto **PK Class** não é apenas uma ferramenta de gestão, mas um ecossistema de cidadania digital. Ao concluir a implementação, os seguintes ativos técnicos e funcionais serão entregues:

### **7.1. Núcleo On-Chain (Blockchain)**
* **Smart Contract (Program) em Rust:** Código fonte documentado do contrato que rege a lógica de criação de eventos, registo de equipas e validação de resultados.
* **Deploy na Devnet/Mainnet:** Endereço oficial do contrato verificado no Solana Explorer.
* **Segurança:** Implementação de permissões baseadas em roles (Admin, Referee, Student).

### **7.2. Aplicação Web (Frontend & UX)**
* **Dashboard do Organizador:** Interface para criação de torneios, sorteio de chaves e submissão de resultados.
* **Portal do Aluno:** Visualização de classificações, estatísticas individuais e coletivas, e feed de atividades.
* **Integração de Wallets:** Sistema de ligação simplificado para interação com a rede Solana.

### **7.3. Documentação e Suporte**
* **Whitepaper/Manual Técnico:** Descrição técnica das funções do contrato e fluxos de dados.
* **Guia do Utilizador:** Manual simplificado para professores e alunos sobre como interagir com o dApp.
* **Repositório Open-Source:** Código organizado no GitHub para futuras contribuições da comunidade académica.

### **7.4. Ativos Digitais (NFTs/SBTs)**
* **Soulbound Tokens (SBTs):** Medalhas digitais não transferíveis atribuídas aos vencedores, que servem como prova de conquista académica e desportiva permanente.

---
**PK Class** – *Transformando o desporto escolar num legado digital eterno.*

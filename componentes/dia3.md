# ETHERNAL STRIKE: The Solana Protocol ⚡⛓️
> **Imutável. Inquebrável. Lendário.**

---

## 1. 🌟 Visão Geral
O **Ethernal Strike** entra na sua fase mais crítica: a **Execução Técnica**. Deixamos os esboços para trás e entramos no código bruto. O objetivo é materializar o protocolo descentralizado na rede Solana, garantindo que a lógica de "Mata-Mata" e a imutabilidade dos resultados funcionem em harmonia com uma interface de elite.

Estamos a construir não apenas uma aplicação, mas uma infraestrutura de glória eterna. 💎

---

## 2. 🛠️ Stack Técnica (Engenharia de Combate)

| Camada | Tecnologia | Status no Dia 3 |
| :--- | :--- | :--- |
| **Frontend** | ⚛️ Next.js 14 & Tailwind | Construção da Interface e Hooks de Wallet |
| **Logic** | 🦀 Rust & Anchor | Codificação dos Programas (Smart Contracts) |
| **Client** | 🔌 @solana/web3.js | Conexão entre UI e a Camada On-chain |
| **Provider** | 💳 Solana Wallet Adapter | Integração com Phantom/Solflare |
| **Dev Environment** | ⚓ Solana Playground/Local | Deploy inicial e testes de transação |

---

## 3. ⚙️ Desenvolvimento do MVP (Dia 3)

Seguindo o cronograma de "Codar e Conectar", o foco total está na integração sistémica:

* **Montar o Front-end:** Transformação dos wireframes em componentes funcionais. Implementação de *Dashboards* dinâmicos que consomem dados diretamente da blockchain.
* **Codar Smart Contracts:** Desenvolvimento do programa em Rust responsável por:
    1. Criar torneios com estados de "Ativo", "Finalizado" e "Cancelado".
    2. Registar equipas e validar permissões de árbitro.
    3. Processar vitórias e atualizar a árvore de chaves.
* **Conectar Tudo:** O momento da verdade. Utilização do Anchor para gerar o IDL e permitir que o Frontend assine transações, alterando o estado global do protocolo na rede.

```mermaid
graph LR
    A[Frontend React/Next] ---|RPC Call| B[Solana Network]
    B --- C{Smart Contract - Rust}
    C ---|Update State| D[(Blockchain Ledger)]
    A ---|Auth| E[Wallet Adapter]

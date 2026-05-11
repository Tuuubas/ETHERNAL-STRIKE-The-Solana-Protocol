export default function Home() {
  return (
    <section className="page-shell">
      <div className="hero-block">
        <div>
          <p className="eyebrow">Dia 4 — Construção do site</p>
          <h1>Ethernal Strike</h1>
          <p className="hero-text">
            Um protótipo funcional para transformar torneios escolares em um registro eterno na Solana.
          </p>
          <div className="button-row">
            <a className="btn-primary" href="/tournaments">Ver torneios</a>
            <a className="btn-secondary" href="/profile">Ver perfil</a>
          </div>
        </div>
        <div className="welcome-card">
          <strong>Proposta</strong>
          <p>Gestão de torneios, histórico de vitórias e hall da fama em uma interface moderna.</p>
        </div>
      </div>

      <div className="content-grid">
        <article className="card card-panel">
          <h2>Por que este site importa?</h2>
          <p>
            Ele apresenta uma camada de utilidade para o projeto, com páginas que permitem gerenciar torneios, conectar uma carteira e acompanhar conquistas.
          </p>
          <ul>
            <li>Torneios com status e criação instantânea</li>
            <li>Perfil com estatísticas e conexão de carteira</li>
            <li>Hall da Fama com ranking de equipes</li>
          </ul>
        </article>

        <article className="card card-panel">
          <h2>Como usar</h2>
          <ol>
            <li>Acesse a página de torneios para cadastrar competições.</li>
            <li>Abra seu perfil para simular a conexão com wallet.</li>
            <li>Consulte o Hall da Fama para ver os campeões.</li>
          </ol>
        </article>
      </div>
    </section>
  );
}

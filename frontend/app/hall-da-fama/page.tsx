import { hallOfFame } from '../../lib/mockData';

export default function HallDaFamaPage() {
  return (
    <section className="page-shell">
      <div className="hero-block">
        <div>
          <p className="eyebrow">Hall da Fama</p>
          <h1>As equipes e atletas mais lendários.</h1>
          <p className="hero-text">
            Conheça os maiores vencedores e veja como o legado escolar se transforma em reputação digital.
          </p>
        </div>
        <div className="badge-card">
          <strong>{hallOfFame.length}</strong>
          <span>registros no hall</span>
        </div>
      </div>

      <div className="grid-list">
        {hallOfFame.map((record) => (
          <article key={record.rank} className="card hall-card">
            <div className="hall-header">
              <span className="hall-rank">#{record.rank}</span>
              <h2>{record.team}</h2>
            </div>
            <p>{record.description}</p>
            <div className="card-meta">
              <span>{record.wins} vitórias</span>
              <span>{record.medals} medalhas</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

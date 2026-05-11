import type { Tournament } from '../lib/mockData';

type TournamentCardProps = {
  tournament: Tournament;
};

export default function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <article className="card tournament-card">
      <div className="card-header">
        <span className={`status-pill status-${tournament.status.replace(/\s+/g, '-').toLowerCase()}`}>
          {tournament.status}
        </span>
        <span className="tournament-date">{tournament.date}</span>
      </div>
      <h3>{tournament.name}</h3>
      <p>{tournament.description}</p>
      <div className="card-meta">
        <span>{tournament.teams} equipes</span>
        <span>{tournament.stage}</span>
      </div>
    </article>
  );
}

import type { Tournament } from '../lib/mockData';

type TournamentCardProps = {
  tournament: Tournament;
  onSelect?: () => void;
  selected?: boolean;
};

export default function TournamentCard({ tournament, onSelect, selected }: TournamentCardProps) {
  return (
    <article className={`card tournament-card${selected ? ' selected' : ''}${onSelect ? ' selectable' : ''}`} onClick={onSelect}>
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
      {tournament.results?.length ? (
        <div className="recent-result">
          Último jogo: {tournament.results[0].teamA} {tournament.results[0].scoreA} x {tournament.results[0].scoreB} {tournament.results[0].teamB}
        </div>
      ) : null}
    </article>
  );
}

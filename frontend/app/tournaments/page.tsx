'use client';

import { useEffect, useMemo, useState } from 'react';
import TournamentCard from '../../components/TournamentCard';
import { useAuth } from '../context/AuthContext';
import { Tournament, TournamentGroup, TournamentPlayer, TournamentTeam } from '../../lib/mockData';

const initialForm = {
  name: '',
  date: '',
  teams: '4',
  description: '',
};

const initialScoreForm = {
  teamA: 'Equipe A',
  teamB: 'Equipe B',
  scoreA: '0',
  scoreB: '0',
  note: '',
};

const initialMediaForm = {
  type: 'image',
  url: '',
  caption: '',
};

const initialCommentForm = {
  author: 'Aluno',
  text: '',
};

export default function TournamentsPage() {
  const { user, updateProfile } = useAuth();
  const isAdmin = user?.admin ?? false;
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('Ativo');
  const [message, setMessage] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scoreForm, setScoreForm] = useState(initialScoreForm);
  const [mediaForm, setMediaForm] = useState(initialMediaForm);
  const [commentForm, setCommentForm] = useState(initialCommentForm);
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerTeam, setPlayerTeam] = useState('');
  const [detailMessage, setDetailMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const selectedTournament = useMemo(
    () => tournaments.find((item) => item.id === selectedId) ?? null,
    [tournaments, selectedId],
  );

  useEffect(() => {
    const loadTournaments = async () => {
      const response = await fetch('/api/tournaments');
      const data = await response.json();
      setTournaments(data);
      setLoading(false);
    };

    loadTournaments();
  }, []);

  useEffect(() => {
    if (selectedTournament?.teamsData?.length) {
      setPlayerTeam(selectedTournament.teamsData[0].id);
    }
  }, [selectedTournament]);

  const activeCount = useMemo(
    () => tournaments.filter((item) => item.status === 'Ativo').length,
    [tournaments],
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleScoreChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setScoreForm((current) => ({ ...current, [name]: value }));
  }

  function handleMediaChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setMediaForm((current) => ({ ...current, [name]: value }));
  }

  function handleCommentChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setCommentForm((current) => ({ ...current, [name]: value }));
  }

  async function persistTournament(updatedTournament: Tournament): Promise<Tournament | null> {
    const response = await fetch(`/api/tournaments/${updatedTournament.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates: updatedTournament, adminEmail: user?.email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      setDetailMessage(errorData?.error ?? 'Erro ao salvar o torneio.');
      return null;
    }

    const saved = await response.json();
    setTournaments((current) => current.map((item) => (item.id === saved.id ? saved : item)));
    setSelectedId(saved.id);
    return saved as Tournament;
  }

  async function deleteTournament(id: string) {
    if (!user?.email || !isAdmin) {
      setDetailMessage('Apenas administradores podem excluir torneios.');
      return;
    }

    const response = await fetch(`/api/tournaments/${id}?adminEmail=${encodeURIComponent(user.email)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      setDetailMessage(errorData?.error ?? 'Erro ao excluir o torneio.');
      return;
    }

    setTournaments((current) => current.filter((item) => item.id !== id));
    setSelectedId(null);
    setMessage('Torneio excluído com sucesso.');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user?.email || !isAdmin) {
      setMessage('Apenas administradores podem criar torneios.');
      return;
    }

    const newTournament: Tournament = {
      id: `custom-${Date.now()}`,
      name: form.name || 'Novo Torneio',
      status: status as Tournament['status'],
      date: form.date || 'Em breve',
      teams: Number(form.teams),
      stage: status === 'Ativo' ? 'Fase de grupos' : 'Inscrições abertas',
      description: form.description || 'Torneio escolar criado para testar o fluxo do site.',
      teamsData: [],
      players: [],
      groups: [],
      results: [],
      media: [],
      comments: [],
    };

    const response = await fetch('/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tournament: newTournament, adminEmail: user.email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      setMessage(errorData?.error ?? 'Falha ao criar torneio.');
      return;
    }

    setTournaments((current) => [newTournament, ...current]);
    setForm(initialForm);
    setStatus('Ativo');
    setMessage('Torneio criado com sucesso! Agora você pode pontuar partidas e adicionar equipes.');
    setSelectedId(newTournament.id);
    window.setTimeout(() => setMessage(''), 4000);
  }

  function updateTeamId(updated: Tournament) {
    if (updated.teamsData?.length && !updated.teamsData.find((team) => team.id === playerTeam)) {
      setPlayerTeam(updated.teamsData[0].id);
    }
  }

  async function submitScore(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTournament) return;

    if (!user?.email || !isAdmin) {
      setDetailMessage('Apenas administradores podem registrar partidas.');
      return;
    }

    const result = {
      id: `result-${Date.now()}`,
      teamA: scoreForm.teamA,
      teamB: scoreForm.teamB,
      scoreA: Number(scoreForm.scoreA),
      scoreB: Number(scoreForm.scoreB),
      note: scoreForm.note,
      createdAt: new Date().toLocaleString('pt-BR'),
    };

    const saved = await persistTournament({
      ...selectedTournament,
      results: [result, ...(selectedTournament.results ?? [])],
      stage: selectedTournament.status === 'Ativo' ? 'Em andamento' : selectedTournament.stage,
    });

    if (saved && user) {
      await updateProfile({
        games: user.games + 1,
      });
    }

    setScoreForm(initialScoreForm);
    setDetailMessage('Placar registrado com sucesso.');
    window.setTimeout(() => setDetailMessage(''), 3000);
  }

  function buildGroups(names: string[]) {
    const groupCount = Math.min(4, Math.max(2, Math.ceil(names.length / 4)));
    return names.reduce<TournamentGroup[]>((groups, teamName, index) => {
      const groupIndex = index % groupCount;
      const currentGroup = groups[groupIndex];
      const group = currentGroup ?? { name: `Grupo ${String.fromCharCode(65 + groupIndex)}`, teams: [] };
      group.teams.push(teamName);
      groups[groupIndex] = group;
      return groups;
    }, [] as TournamentGroup[]);
  }

  async function generateGroupStage() {
    if (!selectedTournament) return;
    const teamNames = selectedTournament.teamsData?.map((team) => team.name) ?? [];
    if (!teamNames.length) {
      setDetailMessage('Adicione pelo menos uma equipe para criar a chave.');
      return;
    }

    const updated = await persistTournament({
      ...selectedTournament,
      groups: buildGroups(teamNames),
      stage: 'Fase de grupos',
      teams: teamNames.length,
    });

    if (!updated) return;
    updateTeamId(updated);
    setDetailMessage('Chave de grupos criada automaticamente.');
    window.setTimeout(() => setDetailMessage(''), 3000);
  }

  async function submitMedia(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTournament) return;

    const media = {
      id: `media-${Date.now()}`,
      type: mediaForm.type as 'image' | 'video' | 'link',
      url: mediaForm.url,
      caption: mediaForm.caption,
      createdAt: new Date().toLocaleString('pt-BR'),
    };

    await persistTournament({
      ...selectedTournament,
      media: [media, ...(selectedTournament.media ?? [])],
    });

    setMediaForm(initialMediaForm);
    setDetailMessage('Mídia adicionada ao torneio.');
    window.setTimeout(() => setDetailMessage(''), 3000);
  }

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTournament) return;

    const comment = {
      id: `comment-${Date.now()}`,
      author: commentForm.author,
      text: commentForm.text,
      createdAt: new Date().toLocaleString('pt-BR'),
    };

    await persistTournament({
      ...selectedTournament,
      comments: [comment, ...(selectedTournament.comments ?? [])],
    });

    setCommentForm(initialCommentForm);
    setDetailMessage('Comentário publicado.');
    window.setTimeout(() => setDetailMessage(''), 3000);
  }

  async function addTeam(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTournament || !teamName.trim()) return;

    const team: TournamentTeam = {
      id: `team-${Date.now()}`,
      name: teamName.trim(),
      players: [],
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
    };

    const updated = await persistTournament({
      ...selectedTournament,
      teamsData: [team, ...(selectedTournament.teamsData ?? [])],
      teams: (selectedTournament.teamsData?.length ?? 0) + 1,
    });

    if (!updated) return;
    setTeamName('');
    updateTeamId(updated);
    setDetailMessage('Equipe adicionada ao torneio.');
    window.setTimeout(() => setDetailMessage(''), 3000);
  }

  async function addPlayer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTournament || !playerName.trim() || !playerTeam) return;

    const player: TournamentPlayer = {
      id: `player-${Date.now()}`,
      name: playerName.trim(),
      teamId: playerTeam,
    };

    const updatedTeams = (selectedTournament.teamsData ?? []).map((team) =>
      team.id === playerTeam ? { ...team, players: [...team.players, player.name] } : team,
    );

    await persistTournament({
      ...selectedTournament,
      players: [player, ...(selectedTournament.players ?? [])],
      teamsData: updatedTeams,
    });

    setPlayerName('');
    setDetailMessage('Jogador adicionado ao time.');
    window.setTimeout(() => setDetailMessage(''), 3000);
  }

  return (
    <section className="page-shell">
      <div className="hero-block">
        <div>
          <p className="eyebrow">Gestão de torneios</p>
          <h1>Crie, registre e persista seu torneio na base local.</h1>
          <p className="hero-text">
            Registre jogos, adicione times e jogadores, poste fotos e comentários com armazenamento no banco local do servidor.
          </p>
        </div>
        <div className="badge-card">
          <strong>{activeCount}</strong>
          <span>torneios ativos</span>
        </div>
      </div>

      <div className="content-grid">
        <div className="card card-panel">
          <h2>Criar novo torneio</h2>
          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Nome do torneio
              <input name="name" value={form.name} onChange={handleChange} placeholder="PK Class Cup" />
            </label>
            <label>
              Data
              <input name="date" value={form.date} onChange={handleChange} placeholder="29/06/2026" />
            </label>
            <label>
              Nº de equipes
              <input name="teams" type="number" value={form.teams} onChange={handleChange} min="2" max="32" />
            </label>
            <label>
              Status
              <select name="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option>Ativo</option>
                <option>Em planejamento</option>
                <option>Finalizado</option>
              </select>
            </label>
            <label className="full-width">
              Descrição do torneio
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Descrição rápida para professores e alunos." />
            </label>
            <button type="submit" className="btn-primary" disabled={!isAdmin}>Criar torneio</button>
            {!isAdmin ? <p className="form-message warning">Login de administrador necessário para criar torneios.</p> : null}
          </form>
          {!isAdmin ? (
            <p className="form-message warning">Apenas administradores podem criar torneios.</p>
          ) : null}
          {message ? <p className="form-message">{message}</p> : null}
          {loading ? <p className="form-message">Carregando torneios do banco...</p> : null}
        </div>

        <div>
          <h2>Lista de torneios</h2>
          <div className="grid-list">
            {tournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                selected={tournament.id === selectedId}
                onSelect={() => setSelectedId(tournament.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedTournament && (
        <div className="selected-panel card card-panel">
          <div className="selected-header">
            <div>
              <h2>{selectedTournament.name}</h2>
              <p>{selectedTournament.description}</p>
              <span className="selected-meta">
                {selectedTournament.stage} • {selectedTournament.teams} equipes
              </span>
            </div>
            <div className="selected-header-actions">
              <button type="button" className="btn-danger" disabled={!isAdmin} onClick={() => deleteTournament(selectedTournament.id)}>
                Excluir torneio
              </button>
              <button type="button" className="btn-secondary" onClick={() => setSelectedId(null)}>
                Fechar seleção
              </button>
            </div>
          </div>
          {!isAdmin ? (
            <p className="form-message warning">Apenas administradores podem excluir torneios e atualizar partidas.</p>
          ) : null}

            <div className="action-box">
              <h3>Pontuar partida</h3>
              <form onSubmit={submitScore} className="form-grid small-form">
                <label>
                  Time A
                  <input name="teamA" value={scoreForm.teamA} onChange={handleScoreChange} />
                </label>
                <label>
                  Time B
                  <input name="teamB" value={scoreForm.teamB} onChange={handleScoreChange} />
                </label>
                <div className="inline-fields">
                  <label>
                    Placar A
                    <input name="scoreA" type="number" value={scoreForm.scoreA} onChange={handleScoreChange} min="0" />
                  </label>
                  <label>
                    Placar B
                    <input name="scoreB" type="number" value={scoreForm.scoreB} onChange={handleScoreChange} min="0" />
                  </label>
                </div>
                <label className="full-width">
                  Observação
                  <input name="note" value={scoreForm.note} onChange={handleScoreChange} placeholder="Ex: virada no segundo tempo" />
                </label>
                <button type="submit" className="btn-primary" disabled={!isAdmin}>Registrar resultado</button>
                {!isAdmin ? <p className="form-message warning">Somente administradores podem registrar partidas.</p> : null}
              </form>
            </div>

            <div className="action-box">
              <h3>Chave de grupos</h3>
              <p>Gere a fase de grupos automaticamente com base nas equipes cadastradas.</p>
              <button type="button" className="btn-primary" onClick={generateGroupStage}>
                Gerar chave
              </button>
              {selectedTournament.groups?.length ? (
                <div className="groups-list">
                  {selectedTournament.groups.map((group) => (
                    <div key={group.name} className="group-card">
                      <strong>{group.name}</strong>
                      <ul>
                        {group.teams.map((team) => (
                          <li key={team}>{team}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="selected-grid">
            <div className="action-box">
              <h3>Equipes e jogadores</h3>
              <div className="groups-list">
                <div className="group-card">
                  <strong>Equipes</strong>
                  <ul>
                    {(selectedTournament.teamsData ?? []).map((team) => (
                      <li key={team.id}>
                        {team.name} ({team.players.length} jogadores)
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="group-card">
                  <strong>Jogadores</strong>
                  <ul>
                    {(selectedTournament.players ?? []).map((player) => {
                      const team = selectedTournament.teamsData?.find((item) => item.id === player.teamId);
                      return (
                        <li key={player.id}>
                          {player.name} • {team?.name ?? 'Sem time'}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <form onSubmit={addTeam} className="form-grid small-form">
                <label>
                  Nova equipe
                  <input value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Nome da equipe" />
                </label>
                <button type="submit" className="btn-primary">Adicionar equipe</button>
              </form>
              <form onSubmit={addPlayer} className="form-grid small-form">
                <label>
                  Nome do jogador
                  <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} placeholder="Nome do jogador" />
                </label>
                <label>
                  Time
                  <select value={playerTeam} onChange={(event) => setPlayerTeam(event.target.value)}>
                    {(selectedTournament.teamsData ?? []).map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="btn-primary">Adicionar jogador</button>
              </form>
            </div>

            <div className="action-box">
              <h3>Publicar foto / vídeo</h3>
              <form onSubmit={submitMedia} className="form-grid small-form">
                <label>
                  Tipo
                  <select name="type" value={mediaForm.type} onChange={handleMediaChange}>
                    <option value="image">Imagem</option>
                    <option value="video">Vídeo</option>
                    <option value="link">Link</option>
                  </select>
                </label>
                <label>
                  URL
                  <input name="url" value={mediaForm.url} onChange={handleMediaChange} placeholder="https://..." />
                </label>
                <label className="full-width">
                  Legenda
                  <input name="caption" value={mediaForm.caption} onChange={handleMediaChange} placeholder="Momento da final" />
                </label>
                <button type="submit" className="btn-primary">Publicar mídia</button>
              </form>
              {selectedTournament.media?.length ? (
                <div className="media-feed">
                  {selectedTournament.media.map((item) => (
                    <div key={item.id} className="media-card">
                      <strong>{item.type.toUpperCase()}</strong>
                      <p>{item.caption}</p>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.url}
                      </a>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="selected-grid">
            <div className="action-box">
              <h3>Comentários</h3>
              <form onSubmit={submitComment} className="form-grid small-form">
                <label>
                  Autor
                  <input name="author" value={commentForm.author} onChange={handleCommentChange} />
                </label>
                <label className="full-width">
                  Comentário
                  <textarea name="text" value={commentForm.text} onChange={handleCommentChange} rows={3} />
                </label>
                <button type="submit" className="btn-primary">Enviar comentário</button>
              </form>
              {selectedTournament.comments?.length ? (
                <div className="comments-list">
                  {selectedTournament.comments.map((comment) => (
                    <div key={comment.id} className="comment-card">
                      <strong>{comment.author}</strong>
                      <span>{comment.createdAt}</span>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

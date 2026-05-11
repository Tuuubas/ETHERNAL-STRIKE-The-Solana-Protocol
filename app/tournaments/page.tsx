'use client';

import { useMemo, useState } from 'react';
import TournamentCard from '../../components/TournamentCard';
import { initialTournaments, Tournament } from '../../lib/mockData';

const initialForm = {
  name: '',
  date: '',
  teams: '4',
  description: '',
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('Ativo');
  const [message, setMessage] = useState('');

  const activeCount = useMemo(() => tournaments.filter((item) => item.status === 'Ativo').length, [tournaments]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTournament: Tournament = {
      id: `custom-${Date.now()}`,
      name: form.name || 'Novo Torneio',
      status: status as Tournament['status'],
      date: form.date || 'Em breve',
      teams: Number(form.teams),
      stage: status === 'Ativo' ? 'Fase de grupos' : 'Inscrições abertas',
      description: form.description || 'Torneio escolar criado para testar o fluxo do site.',
    };

    setTournaments((current) => [newTournament, ...current]);
    setForm(initialForm);
    setStatus('Ativo');
    setMessage('Torneio criado com sucesso! Você pode ver todos os torneios abaixo.');

    window.setTimeout(() => setMessage(''), 4000);
  }

  return (
    <section className="page-shell">
      <div className="hero-block">
        <div>
          <p className="eyebrow">Gestão de torneios</p>
          <h1>Crie e gerencie torneios escolares na Solana.</h1>
          <p className="hero-text">
            Veja os torneios ativos, cadastre novas competições e acompanhe o progresso de chaves e resultados em um painel simples.
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
            <button type="submit" className="btn-primary">Criar torneio</button>
          </form>
          {message ? <p className="form-message">{message}</p> : null}
        </div>

        <div>
          <h2>Lista de torneios</h2>
          <div className="grid-list">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

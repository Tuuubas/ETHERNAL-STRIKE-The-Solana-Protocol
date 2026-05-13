'use client';

import { useState } from 'react';
import { profileInfo } from '../../lib/mockData';

export default function ProfilePage() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState('Não conectado');
  const [balance, setBalance] = useState('0 SOL');

  function handleConnect() {
    setConnected(true);
    setWallet(profileInfo.wallet);
    setBalance(profileInfo.balance);
  }

  return (
    <section className="page-shell">
      <div className="hero-block">
        <div>
          <p className="eyebrow">Perfil do atleta</p>
          <h1>Veja seu histórico esportivo e digital.</h1>
          <p className="hero-text">
            Este perfil reúne conquistas, medalhas e a carteira conectada para trazer mais utilidade ao registro escolar.
          </p>
        </div>
        <div className="profile-card">
          <h2>{connected ? 'Carteira conectada' : 'Conexão de wallet'}</h2>
          <p>{connected ? wallet : 'Clique para conectar ao Phantom/Solflare.'}</p>
          <strong>{connected ? balance : '0 SOL'}</strong>
          <button type="button" className="btn-primary" onClick={handleConnect}>
            {connected ? 'Atualizar perfil' : 'Conectar Wallet'}
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="card card-panel profile-summary">
          <h2>Dados do atleta</h2>
          <dl>
            <dt>Nome</dt>
            <dd>{profileInfo.name}</dd>
            <dt>Escola</dt>
            <dd>{profileInfo.school}</dd>
            <dt>Honraria</dt>
            <dd>{profileInfo.honor}</dd>
          </dl>
        </div>

        <div className="card card-panel stats-grid">
          <div>
            <span className="stat-value">{profileInfo.games}</span>
            <p>Jogos disputados</p>
          </div>
          <div>
            <span className="stat-value">{profileInfo.victories}</span>
            <p>Vitórias</p>
          </div>
          <div>
            <span className="stat-value">{profileInfo.medals}</span>
            <p>Medalhas SBT</p>
          </div>
        </div>
      </div>
    </section>
  );
}

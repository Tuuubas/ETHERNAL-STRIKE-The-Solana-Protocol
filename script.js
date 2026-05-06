const matches = [
  { match: '5º ano A vs 6º ano B', time: '09:30', court: 'Quadra 1', status: 'Em andamento' },
  { match: '7º ano C vs 8º ano A', time: '11:00', court: 'Quadra 2', status: 'Aguardando' },
  { match: '9º ano B vs 9º ano D', time: '12:45', court: 'Quadra 3', status: 'Aguardando' },
  { match: '6º ano C vs 6º ano D', time: '14:30', court: 'Quadra 1', status: 'Aguardando' }
];

const leaderboard = [
  { team: '8º ano A', points: 28 },
  { team: '9º ano B', points: 26 },
  { team: '7º ano C', points: 24 },
  { team: '6º ano D', points: 22 },
  { team: '5º ano A', points: 20 }
];

const comments = [
  { user: 'Ana - 8º ano', time: '2 min atrás', text: 'Acompanhei o jogo e já salvei o evento. Muito fácil de usar!' },
  { user: 'Tiago - 9º ano', time: '10 min atrás', text: 'Resultado registrado com confirmação na blockchain Solana. Super seguro.' },
  { user: 'Prof. Marina', time: '25 min atrás', text: 'Criei novas turmas e o sistema já atualizou a chave do torneio.' },
  { user: 'Paula - 7º ano', time: '40 min atrás', text: 'Meu time avançou para a semifinal. Comentários e notificações ótimos.' }
];

function renderMatches() {
  const tbody = document.getElementById('matches-table');
  matches.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.match}</td>
      <td>${item.time}</td>
      <td>${item.court}</td>
      <td>${item.status}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  leaderboard.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.team}</strong><span>${item.points} pts</span>`;
    list.appendChild(li);
  });
}

function renderComments() {
  const container = document.getElementById('comments-list');
  comments.forEach(comment => {
    const card = document.createElement('div');
    card.className = 'comment-item';
    card.innerHTML = `
      <div class="comment-meta">
        <span>${comment.user}</span>
        <span>${comment.time}</span>
      </div>
      <p>${comment.text}</p>
    `;
    container.appendChild(card);
  });
}

renderMatches();
renderLeaderboard();
renderComments();

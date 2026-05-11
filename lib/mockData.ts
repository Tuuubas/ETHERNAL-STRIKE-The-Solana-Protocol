export type TournamentStatus = 'Ativo' | 'Finalizado' | 'Em planejamento';

export type Tournament = {
  id: string;
  name: string;
  status: TournamentStatus;
  date: string;
  teams: number;
  stage: string;
  description: string;
};

export type HallRecord = {
  rank: number;
  team: string;
  wins: number;
  medals: number;
  description: string;
};

export type ProfileInfo = {
  name: string;
  school: string;
  wallet: string;
  balance: string;
  games: number;
  victories: number;
  medals: number;
  honor: string;
};

export const initialTournaments: Tournament[] = [
  {
    id: 'pk-class-2026',
    name: 'PK Class Championship 2026',
    status: 'Ativo',
    date: '29/05/2026',
    teams: 12,
    stage: 'Quartas de Final',
    description: 'Torneio escolar de futsal com pontuação on-chain e tabela automatizada.',
  },
  {
    id: 'escolar-open',
    name: 'Escolar Open Solana',
    status: 'Em planejamento',
    date: '15/06/2026',
    teams: 8,
    stage: 'Inscrições abertas',
    description: 'Competição de basquete com histórico eterno e premiação digital.',
  },
  {
    id: 'arena-eternal',
    name: 'Arena Eternal Strike',
    status: 'Finalizado',
    date: '02/05/2026',
    teams: 16,
    stage: 'Campeão definido',
    description: 'Campeonato intercolegial com medalhas SBT para vencedores.',
  },
];

export const hallOfFame = [
  {
    rank: 1,
    team: 'Equipe Dragões Web3',
    wins: 24,
    medals: 5,
    description: 'Campeões invictos do PK Class Championship com maior número de vitórias.'
  },
  {
    rank: 2,
    team: 'Academia Solana',
    wins: 18,
    medals: 4,
    description: 'Equipe dedicada que acumulou conquistas escolares e prêmios digitais.'
  },
  {
    rank: 3,
    team: 'Alunos Ethernal',
    wins: 15,
    medals: 3,
    description: 'Finalistas do Arena Eternal Strike e destaque em fair-play.'
  },
];

export const profileInfo: ProfileInfo = {
  name: 'Letícia Silva',
  school: 'Colégio Pioneiro',
  wallet: 'Fg4sH...a9Kz',
  balance: '2.14 SOL',
  games: 31,
  victories: 24,
  medals: 6,
  honor: 'Melhor jogadora do campeonato 2026',
};

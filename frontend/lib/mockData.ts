export type TournamentStatus = 'Ativo' | 'Finalizado' | 'Em planejamento';

export type TournamentTeam = {
  id: string;
  name: string;
  players: string[];
  points: number;
  wins: number;
  draws: number;
  losses: number;
};

export type TournamentPlayer = {
  id: string;
  name: string;
  teamId: string;
};

export type TournamentGroup = {
  name: string;
  teams: string[];
};

export type TournamentMedia = {
  id: string;
  type: 'image' | 'video' | 'link';
  url: string;
  caption: string;
  createdAt: string;
};

export type TournamentComment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

export type TournamentResult = {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  note: string;
  createdAt: string;
};

export type Tournament = {
  id: string;
  name: string;
  status: TournamentStatus;
  date: string;
  teams: number;
  stage: string;
  description: string;
  teamsData?: TournamentTeam[];
  players?: TournamentPlayer[];
  groups?: TournamentGroup[];
  results?: TournamentResult[];
  media?: TournamentMedia[];
  comments?: TournamentComment[];
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

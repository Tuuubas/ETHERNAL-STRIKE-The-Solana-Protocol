import { NextResponse } from 'next/server';
import { getTournaments, saveTournaments } from '../../../../lib/db';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const tournaments = await getTournaments();
  const tournament = tournaments.find((item) => item.id === params.id);
  if (!tournament) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
  }
  return NextResponse.json(tournament);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const updates = await request.json();
  const tournaments = await getTournaments();
  const index = tournaments.findIndex((item) => item.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
  }

  const updatedTournament = {
    ...tournaments[index],
    ...updates,
  };

  tournaments[index] = updatedTournament;
  await saveTournaments(tournaments);
  return NextResponse.json(updatedTournament);
}

import { NextResponse } from 'next/server';
import { getTournaments, saveTournaments } from '../../../../lib/db';
import { isAdminEmail } from '../../../../lib/adminDb';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const tournaments = await getTournaments();
  const tournament = tournaments.find((item) => item.id === params.id);
  if (!tournament) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
  }
  return NextResponse.json(tournament);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json();
  const updates = payload?.updates;
  const adminEmail = payload?.adminEmail;

  if (!updates) {
    return NextResponse.json({ error: 'Dados de atualização são obrigatórios.' }, { status: 400 });
  }

  const tournaments = await getTournaments();
  const index = tournaments.findIndex((item) => item.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
  }

  const currentResults = tournaments[index].results ?? [];
  const updatedResults = Array.isArray(updates.results) ? updates.results : currentResults;
  const isAddingResults = Array.isArray(updates.results) && updatedResults.length > currentResults.length;

  if (isAddingResults) {
    if (!adminEmail) {
      return NextResponse.json({ error: 'Email de administrador é obrigatório para registrar partidas.' }, { status: 400 });
    }
    if (!(await isAdminEmail(adminEmail))) {
      return NextResponse.json({ error: 'Você não é Admin.' }, { status: 403 });
    }
  }

  const updatedTournament = {
    ...tournaments[index],
    ...updates,
  };

  tournaments[index] = updatedTournament;
  await saveTournaments(tournaments);
  return NextResponse.json(updatedTournament);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url);
  const adminEmail = url.searchParams.get('adminEmail');

  if (!adminEmail) {
    return NextResponse.json({ error: 'Email de administrador é obrigatório.' }, { status: 400 });
  }

  if (!(await isAdminEmail(adminEmail))) {
    return NextResponse.json({ error: 'Você não é Admin.' }, { status: 403 });
  }

  const tournaments = await getTournaments();
  const index = tournaments.findIndex((item) => item.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
  }

  tournaments.splice(index, 1);
  await saveTournaments(tournaments);
  return NextResponse.json({ success: true });
}

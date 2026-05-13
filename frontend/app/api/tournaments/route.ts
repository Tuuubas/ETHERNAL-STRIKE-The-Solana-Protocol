import { NextResponse } from 'next/server';
import { getTournaments, saveTournaments } from '../../../lib/db';
import { isAdminEmail } from '../../../lib/adminDb';

export async function GET() {
  const tournaments = await getTournaments();
  return NextResponse.json(tournaments);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const tournament = payload?.tournament;
  const adminEmail = payload?.adminEmail;

  if (!tournament || !adminEmail) {
    return NextResponse.json({ error: 'Dados de torneio e email de administrador são obrigatórios.' }, { status: 400 });
  }

  if (!(await isAdminEmail(adminEmail))) {
    return NextResponse.json({ error: 'Você não é Admin.' }, { status: 403 });
  }

  const tournaments = await getTournaments();
  const newList = [tournament, ...tournaments];
  await saveTournaments(newList);
  return NextResponse.json(tournament);
}

import { NextResponse } from 'next/server';
import { getTournaments, saveTournaments } from '../../../lib/db';

export async function GET() {
  const tournaments = await getTournaments();
  return NextResponse.json(tournaments);
}

export async function POST(request: Request) {
  const tournament = await request.json();
  const tournaments = await getTournaments();
  const newList = [tournament, ...tournaments];
  await saveTournaments(newList);
  return NextResponse.json(tournament);
}

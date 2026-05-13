import { NextResponse } from 'next/server';
import { addUser, getUserByEmail, getUsers, updateUser } from '../../../lib/userDb';
import { isAdminEmail } from '../../../lib/adminDb';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (email) {
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    return NextResponse.json(user);
  }

  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const { email, password, name } = payload;

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Email, senha e nome são obrigatórios.' }, { status: 400 });
  }

  const newUser = {
    email,
    password,
    name,
    school: '',
    honor: '',
    photo: '',
    games: 0,
    victories: 0,
    medals: 0,
  };

  try {
    const saved = await addUser(newUser);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 409 });
  }
}

export async function PATCH(request: Request) {
  const payload = await request.json();
  const { email, requesterEmail, updates } = payload;

  if (!email || typeof updates !== 'object') {
    return NextResponse.json({ error: 'Email e atualizações são obrigatórios.' }, { status: 400 });
  }

  const isStatsUpdate = ['games', 'victories', 'medals'].some((field) => field in updates);
  if (isStatsUpdate) {
    if (!requesterEmail || !(await isAdminEmail(requesterEmail))) {
      return NextResponse.json({ error: 'Você não é Admin.' }, { status: 403 });
    }
  }

  const updated = await updateUser(email, updates);
  if (!updated) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

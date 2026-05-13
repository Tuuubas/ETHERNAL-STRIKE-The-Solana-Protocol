import { NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../lib/userDb';

export async function POST(request: Request) {
  const payload = await request.json();
  const { email, password } = payload;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios.' }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Email ou senha incorretos.' }, { status: 401 });
  }

  return NextResponse.json(user);
}

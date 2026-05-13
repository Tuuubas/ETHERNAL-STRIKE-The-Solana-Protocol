import fs from 'fs/promises';
import path from 'path';
import { isAdminEmail } from './adminDb';

export interface UserRecord {
  email: string;
  password: string;
  name: string;
  school: string;
  honor: string;
  photo: string;
  games: number;
  victories: number;
  medals: number;
  admin: boolean;
}

const userFile = path.join(process.cwd(), 'data', 'users.json');

async function readUsers(): Promise<UserRecord[]> {
  try {
    const file = await fs.readFile(userFile, 'utf8');
    return JSON.parse(file) as UserRecord[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await saveUsers([]);
      return [];
    }
    throw error;
  }
}

async function normalizeUser(user: UserRecord): Promise<UserRecord> {
  const admin = await isAdminEmail(user.email);
  return { ...user, admin };
}

export async function getUsers(): Promise<UserRecord[]> {
  const users = await readUsers();
  return Promise.all(users.map(normalizeUser));
}

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const users = await readUsers();
  const found = users.find((user) => user.email === email);
  return found ? normalizeUser(found) : null;
}

export async function addUser(user: UserRecord): Promise<UserRecord> {
  const users = await readUsers();
  if (users.some((existing) => existing.email === user.email)) {
    throw new Error('User already exists');
  }
  const admin = await isAdminEmail(user.email);
  const newUser = { ...user, admin };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

export async function updateUser(email: string, updates: Partial<UserRecord>): Promise<UserRecord | null> {
  const users = await readUsers();
  const index = users.findIndex((user) => user.email === email);
  if (index === -1) {
    return null;
  }
  users[index] = {
    ...users[index],
    ...updates,
  };
  users[index].admin = await isAdminEmail(users[index].email);
  await saveUsers(users);
  return users[index];
}

export async function saveUsers(users: UserRecord[]): Promise<UserRecord[]> {
  await fs.mkdir(path.dirname(userFile), { recursive: true });
  await fs.writeFile(userFile, JSON.stringify(users, null, 2), 'utf8');
  return users;
}

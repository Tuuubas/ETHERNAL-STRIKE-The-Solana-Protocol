import fs from 'fs/promises';
import path from 'path';

const adminFile = path.join(process.cwd(), 'data', 'admins.json');

export async function readAdmins(): Promise<string[]> {
  try {
    const file = await fs.readFile(adminFile, 'utf8');
    return JSON.parse(file) as string[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await saveAdmins([]);
      return [];
    }
    throw error;
  }
}

export async function saveAdmins(admins: string[]): Promise<string[]> {
  await fs.mkdir(path.dirname(adminFile), { recursive: true });
  await fs.writeFile(adminFile, JSON.stringify(admins, null, 2), 'utf8');
  return admins;
}

export async function isAdminEmail(email: string): Promise<boolean> {
  const admins = await readAdmins();
  return admins.includes(email);
}

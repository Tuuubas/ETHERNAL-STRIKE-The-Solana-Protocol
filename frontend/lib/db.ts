import fs from 'fs/promises';
import path from 'path';
import type { Tournament } from './mockData';

const dataFile = path.join(process.cwd(), 'data', 'tournaments.json');

type StoredData = {
  tournaments: Tournament[];
};

async function readData(): Promise<StoredData> {
  try {
    const file = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(file) as StoredData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await saveTournaments([]);
      return { tournaments: [] };
    }
    throw error;
  }
}

export async function getTournaments(): Promise<Tournament[]> {
  const data = await readData();
  return data.tournaments;
}

export async function saveTournaments(tournaments: Tournament[]): Promise<Tournament[]> {
  const data: StoredData = { tournaments };
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
  return tournaments;
}

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * File-backed waitlist. Swap this module for a database, spreadsheet,
 * or email provider without changing the /api/waitlist contract.
 *
 * Local default:  data/waitlist.json
 * Vercel default: /tmp/citescore-waitlist.json  (ephemeral)
 * Override:       WAITLIST_PATH
 */
export type WaitlistEntry = {
  id: string;
  email: string;
  url: string;
  createdAt: string;
};

const localFile = path.join(process.cwd(), "data", "waitlist.json");

export function waitlistPath() {
  if (process.env.WAITLIST_PATH) return process.env.WAITLIST_PATH;
  if (process.env.VERCEL) return "/tmp/citescore-waitlist.json";
  return localFile;
}

async function readAll(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(/*turbopackIgnore: true*/ waitlistPath(), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WaitlistEntry[]) : [];
  } catch {
    return [];
  }
}

export async function addWaitlistEntry(input: {
  email: string;
  url: string;
}): Promise<WaitlistEntry> {
  const entry: WaitlistEntry = {
    id: crypto.randomUUID(),
    email: input.email.toLowerCase().trim(),
    url: input.url,
    createdAt: new Date().toISOString(),
  };

  const all = await readAll();
  const duplicate = all.some(
    (row) => row.email === entry.email && row.url === entry.url,
  );
  if (!duplicate) {
    all.push(entry);
    const file = waitlistPath();
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(/*turbopackIgnore: true*/ file, `${JSON.stringify(all, null, 2)}\n`, "utf8");
  }

  return entry;
}

import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const UPLOADS_DIR = process.env.UPLOADS_DIR || 'uploads';

export async function writeRecording(
  id: string,
  ext: string,
  stream: ReadableStream<Uint8Array>,
): Promise<string> {
  const dir = path.join(UPLOADS_DIR, id);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `original.${ext}`);

  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const buffer = Buffer.concat(chunks);
  await writeFile(filePath, buffer);
  return filePath;
}

export function getRecordingPath(id: string, ext: string): string {
  return path.join(UPLOADS_DIR, id, `original.${ext}`);
}

import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { getRecordingPath } from '$lib/server/storage';
import { createReadStream, existsSync } from 'fs';
import { Readable } from 'stream';
import { stat } from 'fs/promises';
import type { RequestHandler } from './$types';

const MIME: Record<string, string> = {
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  flac: 'audio/flac',
  ogg: 'audio/ogg',
  m4a: 'audio/mp4',
  aac: 'audio/aac',
};

export const GET: RequestHandler = async ({ params }) => {
  const recording = await prisma.recording.findUnique({
    where: { id: params.id },
  });
  if (!recording) {
    throw error(404, 'Recording not found');
  }

  const filePath = getRecordingPath(recording.id, recording.format);
  if (!existsSync(filePath)) {
    throw error(404, 'File not found');
  }

  const fileStat = await stat(filePath);
  const mime = MIME[recording.format] || 'application/octet-stream';

  const nodeStream = createReadStream(filePath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream;

  return new Response(webStream, {
    headers: {
      'Content-Type': mime,
      'Content-Length': String(fileStat.size),
    },
  });
};

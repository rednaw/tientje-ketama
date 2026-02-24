import { prisma } from '$lib/server/prisma';

export async function load() {
  const rows = await prisma.recording.findMany({
    orderBy: { recordedAt: 'desc' },
  });
  const recordings = rows.map((r) => ({
    id: r.id,
    originalFilename: r.originalFilename,
    format: r.format,
    fileSizeBytes: Number(r.fileSizeBytes),
    recordedAt: r.recordedAt,
  }));
  return { recordings };
}

import { prisma } from '$lib/server/prisma';

export async function load() {
  const rows = await prisma.recording.findMany({
    orderBy: { uploadedAt: 'desc' },
  });
  const recordings = rows.map((r) => ({
    id: r.id,
    originalFilename: r.originalFilename,
    format: r.format,
    fileSizeBytes: Number(r.fileSizeBytes),
    uploadedAt: r.uploadedAt,
  }));
  return { recordings };
}

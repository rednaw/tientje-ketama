import { fail } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { deleteRecording } from '$lib/server/storage';

export async function load() {
  const rows = await prisma.recording.findMany({
    orderBy: { originalFilename: 'asc' },
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

export const actions = {
  delete: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const id = formData.get('id');
    if (typeof id !== 'string' || !id) {
      return fail(400, { error: 'Missing recording id' });
    }
    const recording = await prisma.recording.findUnique({ where: { id } });
    if (!recording) {
      return fail(404, { error: 'Recording not found' });
    }
    try {
      await deleteRecording(recording.id);
    } catch {
      // File may already be missing
    }
    await prisma.recording.delete({ where: { id } });
    return { deleted: id };
  },
};

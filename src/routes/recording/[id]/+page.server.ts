import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function load({ params }) {
  const recording = await prisma.recording.findUnique({
    where: { id: params.id },
  });
  if (!recording) {
    throw error(404, 'Recording not found');
  }
  return {
    recording: {
      id: recording.id,
      originalFilename: recording.originalFilename,
      format: recording.format,
      fileSizeBytes: Number(recording.fileSizeBytes),
      uploadedAt: recording.uploadedAt,
    },
  };
}

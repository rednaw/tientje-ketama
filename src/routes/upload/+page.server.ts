import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { writeRecording } from '$lib/server/storage';
import { randomUUID } from 'crypto';

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

export function load() {
  return {};
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || !(file instanceof File)) {
      return fail(400, { error: 'No file selected' });
    }

    if (file.size > MAX_SIZE) {
      return fail(400, { error: 'File too large (max 20MB)' });
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const format = ext;
    const id = randomUUID();

    try {
      await writeRecording(id, ext, file.stream());
      await prisma.recording.create({
        data: {
          id,
          originalFilename: file.name,
          format,
          fileSizeBytes: BigInt(file.size),
        },
      });
      redirect(303, '/');
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      return fail(500, { error: errorMessage });
    }
  },
};

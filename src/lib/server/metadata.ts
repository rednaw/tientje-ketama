import { parseFile } from 'music-metadata';

export async function extractRecordedDate(filePath: string): Promise<Date> {
  try {
    const metadata = await parseFile(filePath);
    const date = metadata.common.date || metadata.common.year?.toString();
    if (date) {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not extract metadata date:', err);
  }

  return new Date();
}

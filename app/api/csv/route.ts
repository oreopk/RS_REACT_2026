import type { Book } from '@/types/book';

export async function POST(req: Request) {
  const formData = await req.formData();
  const raw = formData.get('data');
  const items: Book[] = raw ? JSON.parse(String(raw)) : [];

  const name_column = 'id,name,description,url\r\n';
  const rows = items
    .map((book, i) => {
      const name = book.title ?? '';
      const description = book.subtitle ?? '';
      const url = `https://openlibrary.org${book.key}`;
      return `${i + 1},"${name}","${description}","${url}"`;
    })
    .join('\r\n');
  const csv = name_column + rows;

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${items.length}_items.csv"`,
    },
  });
}
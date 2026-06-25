'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useSearchBooksQuery } from '@/store/apiSlice';

export default function Pagination() {
  const t = useTranslations('Main');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, refetch } = useSearchBooksQuery({ searchWords: q, page });
  const totalPages = data ? Math.ceil(data.numFound / 10) : 0;

  if (totalPages <= 0) return null;

  const go = (next: number) => {
    const qs = new URLSearchParams(searchParams.toString());
    qs.set('page', String(next));
    router.push(`${pathname}?${qs.toString()}`);
  };

  return (
    <div className="pagination">
      <button className="black_btn" onClick={() => refetch()}>
        {t('refresh')}
      </button>
      <button className="black_btn" disabled={page <= 1} onClick={() => go(page - 1)}>
        {t('prev')}
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button className="black_btn" disabled={page >= totalPages} onClick={() => go(page + 1)}>
        {t('next')}
      </button>
    </div>
  );
}
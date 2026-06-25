'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';

function Search() {
  const t = useTranslations('Search');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [savedSearch, setSavedSearch] = useLocalStorage('savedSearch', '');
  const [value, setValue] = useState(searchParams.get('q') ?? savedSearch);

  const submit = () => {
    const trimmed = value.trim();
    setSavedSearch(trimmed);
    const qs = new URLSearchParams();
    if (trimmed) qs.set('q', trimmed);
    qs.set('page', '1');
    router.push(`${pathname}?${qs.toString()}`);
  };

  return (
    <div className="search">
      <input
        value={value}
        placeholder={t('placeholder')}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
      <button className="black_btn" onClick={submit}>
        {t('submit')}
      </button>
    </div>
  );
}

export default Search;

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Header.css';

function Header() {
  const [errorReact, setErrorReact] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: 'en' | 'ru') => {
    router.replace(pathname, { locale: next });
  };

  if (errorReact) {
    throw new Error('errorReact');
  }
  return (
    <header>
      <div>
        <nav>
          <Link href="/">{t('logo')}</Link>
          <Link href="/about">{t('about')}</Link>
        </nav>
        <button onClick={toggleTheme}>{theme === 'light' ? t('themeDark') : t('themeLight')}</button>
        <button onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}>
          {locale === 'en' ? 'RU' : 'EN'}
        </button>
        <button className="test-error-btn" onClick={() => setErrorReact(true)}>
          {t('testError')}
        </button>
      </div>
    </header>
  );
}

export default Header;

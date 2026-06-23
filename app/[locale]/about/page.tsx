import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="page">
      <h1>{t('title')}</h1>
      <a href="https://github.com/oreopk" target="_blank" rel="noreferrer">
        {t('author')}
      </a>
      <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
        {t('course')}
      </a>
    </div>
  );
}
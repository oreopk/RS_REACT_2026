'use client';

import { usePathname } from 'next/navigation';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';

export default function MainLayout({
  children,
  detail,
}: {
  children: React.ReactNode;
  detail: React.ReactNode;
}) {
  const pathname = usePathname();
  const showDetail = /\/books\/[^/]+/.test(pathname);

  return (
    <div className="page-wrapper">
      <Pagination />
      <section className="search-section">
        <Search />
      </section>
      <div className="main-content">
        <section className="results-section">{children}</section>
        {showDetail && detail}
      </div>
    </div>
  );
}
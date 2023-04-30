import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-logo"></div>
      <Link href={'/vacancies'}>Поиск Вакансий</Link>
      <Link href={'/favorits'}>Избранное</Link>
    </header>
  );
};

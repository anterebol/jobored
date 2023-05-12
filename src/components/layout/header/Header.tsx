import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import styles from './header.module.css';
import logo from '@/assets/jobored_logo.svg';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Image src={logo} width={141} height={36} alt="logo" />
        <div className={styles['header-links']}>
          <Link href={'/vacancies/page=1'} className={styles['header-links__item']}>
            Поиск Вакансий
          </Link>
          <Link href={'/favorites/page=1'} className={(styles['header-links__item'], styles.left)}>
            Избранное
          </Link>
        </div>
      </div>
    </header>
  );
};

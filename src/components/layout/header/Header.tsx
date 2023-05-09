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
          <Link href={'/vacancies'} className={styles['header-links__item']}>
            Поиск Вакансий
          </Link>
<<<<<<< HEAD
          <Link href={'/favorites'} className={(styles['header-links__item'], styles.left)}>
=======
          <Link href={'/favorits'} className={(styles['header-links__item'], styles.left)}>
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
            Избранное
          </Link>
        </div>
      </div>
    </header>
  );
};

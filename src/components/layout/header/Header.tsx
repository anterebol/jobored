import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import styles from './header.module.css';
import logo from '@/assets/jobored_logo.svg';
import { useAppSelector } from '@/hooks/hooks';
import { useRouter } from 'next/router';
import { isActiveLink } from '@/utils/isActiveLink';
import { FAVORITES_PATH, VACANCIES_PATH } from '@/constants/query/path';

export const Header: FC = () => {
  const { currentPage } = useAppSelector((state) => state);
  const path = useRouter().pathname;
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Image src={logo} width={141} height={36} alt="logo" />
        <div className={styles['header-links']}>
          <Link
            href={`/${VACANCIES_PATH}/page=${currentPage.vacancies}`}
            className={[
              styles['header-links__item'],
              styles[isActiveLink([path, VACANCIES_PATH])],
            ].join(' ')}
          >
            Поиск Вакансий
          </Link>
          <Link
            href={`/${FAVORITES_PATH}/page=${currentPage.favorites}`}
            className={[
              styles['header-links__item'],
              styles.left,
              styles[isActiveLink([path, FAVORITES_PATH])],
            ].join(' ')}
          >
            Избранное
          </Link>
        </div>
      </div>
    </header>
  );
};

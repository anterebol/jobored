import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import styles from './header.module.css';
import logo from '@/assets/jobored_logo.svg';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        {/* <div className={styles['header-logo']}></div> */}
        <Image src={logo} width={141} height={36} alt="logo" />
        {/* <Image src={styles['.header-logo']} src='../../../assets/jobored_logo.svg' ></Image> */}
        <div className={styles['header-links']}>
          <Link href={'/vacancies'} className={styles['header-links__item']}>
            Поиск Вакансий
          </Link>
          <Link href={'/favorits'} className={(styles['header-links__item'], styles.left)}>
            Избранное
          </Link>
        </div>
      </div>
    </header>
  );
};

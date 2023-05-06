import { VacancyType } from '@/types/types';
import styles from './vacancy.module.css';
import Image from 'next/image';
import star from '@/assets/star.svg';
import blueStar from '@/assets/blueStar.svg';
import { useState } from 'react';
import Link from 'next/link';

export const Vacancy = (props: { vacancy: VacancyType; chosen: boolean }) => {
  const { vacancy } = props;
  const [starHoverd, setStarHovered] = useState(false);
  return (
    <Link href={`/vacancies/${vacancy.id}`}>
      <div className={styles['vacancy-box']}>
        <h2 className={styles['vacancy-title']}>{vacancy.profession}</h2>
        <Image
          className={styles['vacancy-star']}
          src={starHoverd ? blueStar : star}
          width={22}
          height={22}
          alt="star"
          onMouseEnter={() => setStarHovered(true)}
          onMouseLeave={() => setStarHovered(false)}
        />
        <div className={styles['vacancy-info']}>
          <p className={styles['vacancy-salary']}>
            з/п {vacancy.payment_from} {vacancy.currency}
          </p>
          <p className={styles['vacancy-salary']}>{vacancy.type_of_work.title}</p>
        </div>
        <p className={styles['vacancy-location']}>{vacancy.town.title}</p>
      </div>
    </Link>
  );
};

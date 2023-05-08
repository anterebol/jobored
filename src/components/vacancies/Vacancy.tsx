import { VacancyType } from '@/types/types';
import styles from './vacancy.module.css';
import Image from 'next/image';
import star from '@/assets/star.svg';
import blueStar from '@/assets/blueStar.svg';
import location from '@/assets/location.svg';
import { useState } from 'react';
import Link from 'next/link';

export const Vacancy = (props: { vacancy: VacancyType; chosen: boolean; details: boolean }) => {
  const { vacancy, chosen, details } = props;
  const [starHoverd, setStarHovered] = useState(chosen);
  return (
    <>
      <Link href={`/vacancies/${vacancy.id}`}>
        <div className={[styles['vacancy-box'], details ? '' : styles['undetails']].join(' ')}>
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
            <p className={styles['vacancy-info-point']}>•</p>
            <p className={styles['vacancy-type']}>{vacancy.type_of_work.title}</p>
          </div>
          <div className={styles['vacancy-location']}>
            <Image src={location} alt={'location'} width={13} height={16} />
            <p className={styles['vacancy-location']}>{vacancy.town.title}</p>
          </div>
        </div>
      </Link>
      {details ? (
        <div className={styles['details-box']}>
          {vacancy.candidat.split(/\n/).map((info, i) => {
            const regExp = new RegExp(/Обязанности|Требования|Условия/);
            // console.log(info);
            if (regExp.test(info)) return <h3 key={i + 'key'}>{info}</h3>;
            return <p key={i + 'key'}>{info}</p>;
          })}
        </div>
      ) : null}
    </>
  );
};

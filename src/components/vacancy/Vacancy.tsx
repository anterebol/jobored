import { VacancyProps } from '@/types/types';
import styles from './vacancy.module.css';
import Image from 'next/image';
import star from '@/assets/Star.svg';
import blueStar from '@/assets/blueStar.svg';
import location from '@/assets/location.svg';
import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addFavorite, removeFavorite } from '@/store/appReducer';
import parse from 'html-react-parser';

export const Vacancy = ({ vacancy, details, path }: VacancyProps) => {
  const { favoritesId } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [starHoverd, setStarHovered] = useState(false);
  return (
    <>
      <Link href={`/${path}/${vacancy.id}`}>
        <div
          className={[styles['vacancy-box'], details ? 'details' : styles['undetails']].join(' ')}
        >
          <h2 className={styles['vacancy-title']}>{vacancy.profession}</h2>
          <Image
            className={styles['vacancy-star-btn']}
            src={starHoverd || favoritesId.includes(vacancy.id) ? blueStar : star}
            width={22}
            height={22}
            alt="star"
            onMouseEnter={() => setStarHovered(true)}
            onMouseLeave={() => setStarHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              const indexId = favoritesId.indexOf(vacancy.id);
              if (indexId < 0) {
                dispatch(addFavorite(vacancy.id));
              } else {
                dispatch(removeFavorite({ id: vacancy.id, indexId: indexId }));
              }
            }}
          />
          <div className={styles['vacancy-info']}>
            <p className={styles['vacancy-salary']}>
              з/п{' '}
              {vacancy.payment_from
                ? `от ${vacancy.payment_from}`
                : vacancy.payment_to
                ? `до ${vacancy.payment_to}`
                : 'не указана'}
            </p>
            <p className={styles['vacancy-info-point']}>•</p>
            <p className={styles['vacancy-type']}>{vacancy.type_of_work.title}</p>
          </div>
          <div className={styles['vacancy-location']}>
            <Image src={location} alt={'location'} />
            <p>{vacancy.town.title}</p>
          </div>
        </div>
      </Link>
      {details ? (
        <div className={styles['details-box']}>{parse(vacancy.vacancyRichText)}</div>
      ) : null}
    </>
  );
};

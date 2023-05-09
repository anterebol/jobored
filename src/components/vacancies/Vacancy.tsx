import { VacancyType } from '@/types/types';
import styles from './vacancy.module.css';
import Image from 'next/image';
import star from '@/assets/star.svg';
import blueStar from '@/assets/blueStar.svg';
import location from '@/assets/location.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
interface VacancyProps {
  vacancy: VacancyType;
  path: string;
  details: boolean;
}
export const Vacancy = ({ vacancy, details, path }: VacancyProps) => {
  const [favorites, setFavorites] = useState([] as Array<string>);
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);
  const [starHoverd, setStarHovered] = useState(false);
  return (
    <>
      <Link href={`/${path}/${vacancy.id}`}>
        <div className={[styles['vacancy-box'], details ? '' : styles['undetails']].join(' ')}>
          <h2 className={styles['vacancy-title']}>{vacancy.profession}</h2>
          <Image
            className={styles['vacancy-star-btn']}
            src={starHoverd || favorites.includes(vacancy.id) ? blueStar : star}
            width={22}
            height={22}
            alt="star"
            onMouseEnter={() => setStarHovered(true)}
            onMouseLeave={() => setStarHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              const indexId = favorites.indexOf(vacancy.id);
              if (indexId < 0) {
                localStorage.setItem('favorites', JSON.stringify([...favorites, vacancy.id]));
                setFavorites([...favorites, vacancy.id]);
              } else {
                localStorage.setItem('favorites', JSON.stringify(favorites.splice(indexId, 1)));
                setFavorites(favorites.slice(indexId, 1));
              }
            }}
          />
          <div className={styles['vacancy-info']}>
            <p className={styles['vacancy-salary']}>
              з/п {vacancy.payment_from} {vacancy.currency}
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
        <div className={styles['details-box']}>
          {vacancy.candidat.split(/\n/).map((info, i) => {
            const regExp = new RegExp(/•/);
            if (!regExp.test(info) && info.length < 40 && info.length > 1) {
              return <h3 key={i + 'key'}>{info}</h3>;
            }
            return <p key={i + 'key'}>{info}</p>;
          })}
        </div>
      ) : null}
    </>
  );
};

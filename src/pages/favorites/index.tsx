import { getToken, getVacancies } from '@/store/api/api';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { VacancyType } from '@/types/types';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';

const Favorits: NextPage = () => {
  const { vacancies, token, favorites } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(
        getVacancies({
          token: token,
          vacanciesParams: {
            published: 1,
          },
        })
      );
    }
  }, [token]);
  return (
    <ul>
      {vacancies
        ? vacancies.map((vacancy: VacancyType) => {
            if (favorites.includes(vacancy.id)) {
              return (
                <li key={vacancy.id}>
                  <Vacancy vacancy={vacancy} details={false} path="favorites" />
                </li>
              );
            }
          })
        : null}
    </ul>
  );
};

export default Favorits;

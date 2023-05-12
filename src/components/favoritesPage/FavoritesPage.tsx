import { getToken, getVacancies } from '@/store/api/api';
import { Vacancy } from '@/components/vacanciesPage/vacancy/Vacancy';
import { VacancyType } from '@/types/types';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';

export const FavoritesPage = ({ page }: { page: number }) => {
  const { vacancies, token, favoritesId } = useAppSelector((state) => state);
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
            ids: favoritesId,
          },
          // page: page,
        })
      );
    }
  }, [token]);
  return (
    <ul>
      {vacancies
        ? vacancies.map((vacancy: VacancyType) => {
            if (favoritesId.includes(vacancy.id)) {
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

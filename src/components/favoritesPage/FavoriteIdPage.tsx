import { Vacancy } from '@/components/vacanciesPage/vacancy/Vacancy';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { getToken, getVacancy } from '@/store/api/api';
import { setFavorite } from '@/store/appReducer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Preloader } from '../preloader/Preloader';

export const FavoriteIdPage = ({ id }: { id: string }) => {
  const { token, vacancies, favorite, favoritesId, loaded } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);

  useEffect(() => {
    if (id) {
      const isFavorite = favoritesId.includes(Number(id));
      if (isFavorite) {
        if (vacancies.length > 0) {
          dispatch(
            setFavorite(vacancies[vacancies.findIndex((vacancy) => vacancy.id === Number(id))])
          );
        } else if (token) {
          dispatch(getVacancy({ token: token, id: id, vacancyType: 'favorite' }));
        }
      } else {
        router.push('/favorites/page=1');
      }
    }
  }, [id, favoritesId]);

  return (
    <>
      {loaded ? (
        Object.keys(favorite).length > 0 ? (
          <Vacancy vacancy={favorite} details={true} path="vacancies" />
        ) : null
      ) : (
        <Preloader />
      )}
    </>
  );
};

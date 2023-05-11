import { Vacancy } from '@/components/vacancies/Vacancy';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { getToken, getVacancy } from '@/store/api/api';
import { setFavorite } from '@/store/appReducer';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Favorite: NextPage = () => {
  const { token, vacancies, favorite, favorites } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { id } = useRouter().query as { id: string };

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);

  useEffect(() => {
    if (vacancies.length > 0) {
      const currentVacancy = vacancies.filter((vacancy) => {
        if (favorites.includes(vacancy.id) && vacancy.id === Number(id)) return vacancy;
      })[0];
      dispatch(setFavorite(currentVacancy));
    } else if (token && id) {
      dispatch(getVacancy({ token: token, id: id, vacancyType: 'favorite' }));
    }
  }, [id]);

  return (
    <>
      {Object.keys(favorite).length > 0 ? (
        <Vacancy vacancy={favorite} details={true} path="vacancies" />
      ) : null}
    </>
  );
};
export default Favorite;

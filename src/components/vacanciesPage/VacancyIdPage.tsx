import { getToken, getVacancy } from '@/store/api/api';
import { Vacancy } from '@/components/vacanciesPage/vacancy/Vacancy';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setVacancy } from '@/store/appReducer';

export const VacancyIdPage = ({ id }: { id: string }) => {
  const { token, vacancies, vacancy } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);

  useEffect(() => {
    if (vacancies.length > 0) {
      const currentVacancy = vacancies.filter((vacancy) => vacancy.id === Number(id))[0];
      dispatch(setVacancy(currentVacancy));
    } else if (token && id) {
      dispatch(getVacancy({ token: token, id, vacancyType: 'usual vacancy' }));
    }
  }, [id, token]);

  return (
    <>
      {Object.keys(vacancy).length > 0 ? (
        <Vacancy vacancy={vacancy} details={true} path="vacancies" />
      ) : null}
    </>
  );
};

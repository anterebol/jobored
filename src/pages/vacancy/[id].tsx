import { getToken, getVacancy } from '@/store/api/api';
import { Vacancy } from '@/components/vacancy/Vacancy';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setVacancy } from '@/store/appReducer';
import { Preloader } from '@/components/preloader/Preloader';
import { useRouter } from 'next/router';

const VacancyIdPage = () => {
  const { id } = useRouter().query as { id: string };
  const { token, vacancies, vacancy, loaded } = useAppSelector((state) => state);
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
      {loaded ? (
        Object.keys(vacancy).length > 0 ? (
          <Vacancy vacancy={vacancy} details={true} path="vacancy" />
        ) : null
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default VacancyIdPage;

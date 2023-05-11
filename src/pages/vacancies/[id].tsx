import { getToken, getVacancy } from '@/store/api/api';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { VacancyType } from '@/types/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

const CurrentVacancy: NextPage = () => {
  const { token, vacancies } = useAppSelector((state) => state);
  console.log(token);
  const dispatch = useAppDispatch();
  const { id } = useRouter().query;
  const [vacancy, setVacancy] = useState({} as VacancyType);
  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);
  useEffect(() => {
    const getData = async () => {
      if (token) {
        const response = await getVacancy(token, id as string);

        const data = (await response.json()) as VacancyType;

        setVacancy(data);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);
  return (
    <>
      {Object.keys(vacancy).length > 0 ? (
        <Vacancy vacancy={vacancy} details={true} path="vacancies" />
      ) : null}
    </>
  );
};
export default CurrentVacancy;

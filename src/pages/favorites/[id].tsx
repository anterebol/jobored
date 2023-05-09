import { getToken, getVacancy } from '@/api/api';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { VacancyType } from '@/types/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Favorite: NextPage = () => {
  const { id } = useRouter().query;
  const [vacancy, setVacancy] = useState({} as VacancyType);
  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem('token') || '';
      if (!token) {
        token = await getToken();
      }
      const response = await getVacancy(token, id as string);

      const data = (await response.json()) as VacancyType;

      setVacancy(data);
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
export default Favorite;

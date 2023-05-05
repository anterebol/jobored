import { getToken, getVacancies } from '@/api/api';
import { CatalougeType, FilterVacanciesType, VacancyType } from '@/types/types';
import { NextPage } from 'next';
import { FormVacancy } from '@/components/vacancies/form/Form';
import { useEffect, useState } from 'react';
import styles from '../styles/Vacancies.module.css';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { cataloguesPath } from '@/constants/path';
import { createPath } from '@/utils/createPath';
import { headers } from '@/constants/headers';
import { url } from '@/constants/url';

const Vacancies = ({ catalogues }: { catalogues: Array<CatalougeType> }) => {
  console.log(catalogues);
  // const [catalogues, setCatalogues] = useState([]);
  const [vacancies, setVacancies] = useState([] as Array<VacancyType>);
  useEffect(() => {
    const getData = async () => {
      let token = localStorage.getItem('token') || '';
      if (!token) {
        token = await getToken();
      }

      const response = await getVacancies(token, {
        published: 1,
      } as FilterVacanciesType);

      const data = (await response.json()) as { objects: Array<VacancyType> };

      setVacancies([...data.objects]);
    };
    getData();
  }, []);
  return (
    <div className={styles['vacancies-page']}>
      <div className={styles['left-bar']}>
        <FormVacancy catalogues={catalogues} />
      </div>
      <div className={styles['right-bar']}></div>

      <ul>
        {vacancies.map((vacancy: VacancyType) => {
          return (
            <li key={vacancy.id}>
              <Vacancy vacancy={vacancy} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const path = createPath(url, cataloguesPath, undefined);
  const response = await fetch(path, {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  });
  const data = await response.json();
  return {
    props: {
      catalogues: data,
    },
  };
}

export default Vacancies;

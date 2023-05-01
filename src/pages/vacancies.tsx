import { getToken, getVacancies } from '@/api/api';
import { Layout } from '@/components/layout/Layout';
import { FilterVacanciesType, VacancyType } from '@/types/types';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Vacancies: NextPage = () => {
  // const [catalogues, setCatalogues] = useState([]);

  const [vacancies, setVacancies] = useState([] as Array<VacancyType>);
  useEffect(() => {
    if (vacancies.length === 0) {
      const getData = async () => {
        let token = localStorage.getItem('token') || '';
        if (!token) {
          token = await getToken();
        }

        const response = await getVacancies(token, {
          published: 1,
          count: 30,
        } as FilterVacanciesType);
        const data = (await response.json()) as { objects: Array<VacancyType> };
        setVacancies([...data.objects]);
      };
      getData();
    }
  }, []);
  return (
    <Layout>
      <h1>Vacancies</h1>
      {vacancies.map((vacancy: VacancyType) => {
        return <h1 key={vacancy.id}>{vacancy.id}</h1>;
      })}
    </Layout>
  );
};

export default Vacancies;

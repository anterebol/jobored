import { getToken, getVacancies } from '@/store/api/api';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { VacancyType, FilterVacanciesType } from '@/types/types';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

const Favorits: NextPage = () => {
  const [vacancies, setVacancies] = useState([] as Array<VacancyType>);
  const [favorites, setFavorites] = useState([] as Array<string>);
  // useEffect(() => {
  //   const data = localStorage.getItem('favorites') || '[]';
  //   setFavorites(JSON.parse(data));
  //   const getData = async () => {
  //     let token = localStorage.getItem('token') || '';
  //     if (!token) {
  //       token = await getToken();
  //     }

  //     const response = await getVacancies(token, {
  //       published: 1,
  //     } as FilterVacanciesType);

  //     const data = (await response.json()) as { objects: Array<VacancyType> };
  //     setVacancies(data.objects);
  //   };
  //   getData();
  // }, []);
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

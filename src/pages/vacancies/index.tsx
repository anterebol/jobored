import { getToken, getVacancies } from '@/api/api';
import { CatalougeType, FilterVacanciesType, VacancyType } from '@/types/types';
import { FormVacancy } from '@/components/vacancies/form/Form';
import { useEffect, useState } from 'react';
import styles from '@/styles/Vacancies.module.css';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { cataloguesPath } from '@/constants/path';
import { createPath } from '@/utils/createPath';
import { headers } from '@/constants/headers';
import { url } from '@/constants/url';
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const Vacancies = ({ catalogues }: { catalogues: Array<CatalougeType> }) => {
  const form = useForm({
    initialValues: {
      searchVacancy: '',
    },

    validate: {
      searchVacancy: (value) => (value ? null : 'Введите текст'),
    },
  });
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
      setVacancies(data.objects);
    };
    getData();
  }, []);
  return (
    <div className={styles['vacancies-page']}>
      <div className={styles['left-bar']}>
        <FormVacancy catalogues={catalogues} />
      </div>
      <div className={styles['right-bar']}>
        <form
          className={styles['search-vacancy-form']}
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <TextInput
            style={{}}
            size="lg"
            width={1000}
            placeholder="Введите название вакансии"
            icon={<IconSearch size="0.8rem" />}
            rightSection={<Button className={styles['search-vacancy-form__button']}>Поиск</Button>}
          />
        </form>
        <ul>
          {vacancies
            ? vacancies.map((vacancy: VacancyType) => {
                return (
                  <li key={vacancy.id}>
                    <Vacancy vacancy={vacancy} chosen={false} details={false} />
                  </li>
                );
              })
            : null}
        </ul>
      </div>
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

import { getToken } from '@/store/api/api';
import { CatalougeType } from '@/types/types';
import { FormVacancy } from '@/components/vacancies/form/Form';
import { useEffect } from 'react';
import styles from '@/styles/Vacancies.module.css';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { cataloguesPath } from '@/constants/path';
import { createPath } from '@/utils/createPath';
import { headers } from '@/constants/headers';
import { url } from '@/constants/url';
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getVacancies } from '@/store/api/api';

const Vacancies = ({ catalogues }: { catalogues: Array<CatalougeType> }) => {
  const { vacancies, token } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      searchVacancy: '',
    },

    validate: {
      searchVacancy: (value) => (value ? null : 'Введите текст'),
    },
  });
  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(
        getVacancies({
          token: token,
          vacanciesParams: {
            published: 1,
          },
        })
      );
    }
  }, [token]);
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
          {vacancies.map((vacancy) => {
            return (
              <li key={vacancy.id}>
                <Vacancy vacancy={vacancy} details={false} path="vacancies" />
              </li>
            );
          })}
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

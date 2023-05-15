import { getToken } from '@/store/api/api';
import { CatalougeType } from '@/types/types';
import { FormVacancy } from '@/components/vacanciesPage/form/Form';
import { useEffect } from 'react';
import styles from './vacanciesPage.module.css';
import { Vacancy } from '@/components/vacanciesPage/vacancy/Vacancy';
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getVacancies } from '@/store/api/api';
import { Preloader } from '../preloader/Preloader';
import { Paginate } from '../paginate/Paginate';

export const VacanciesPage = ({
  page,
  catalogues,
}: {
  page: string;
  catalogues: Array<CatalougeType>;
}) => {
  const { vacancies, token, loaded } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const pageCount = 125;

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
            page: Number(page),
            count: 4,
          },
        })
      );
    }
  }, [token, page]);
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
        {loaded ? (
          <ul>
            {vacancies.map((vacancy) => {
              return (
                <li key={vacancy.id}>
                  <Vacancy vacancy={vacancy} details={false} path="vacancies" />
                </li>
              );
            })}
          </ul>
        ) : (
          <Preloader />
        )}
        <Paginate pageType={'vacancies'} page={Number(page)} pageCount={pageCount} />
      </div>
    </div>
  );
};

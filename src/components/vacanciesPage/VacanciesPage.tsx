import { getToken } from '@/store/api/api';
import { CatalougeType, FormType } from '@/types/types';
import { Filter } from '@/components/vacanciesPage/forms/filter/Filter';
import { useEffect } from 'react';
import styles from './vacanciesPage.module.css';
import { Vacancy } from '@/components/vacanciesPage/vacancy/Vacancy';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getVacancies } from '@/store/api/api';
import { Preloader } from '../preloader/Preloader';
import { Paginate } from '../paginate/Paginate';
import { KeyWordForm } from './forms/keywordForm/KeywordForm';
import { setForm } from '@/store/appReducer';

export const VacanciesPage = ({
  page,
  catalogues,
}: {
  page: string;
  catalogues: Array<CatalougeType>;
}) => {
  const { vacancies, token, loaded, formState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const pageCount = 125;
  const vacanciesParams = {
    // ...formState,
    published: 1,
    page: Number(page),
    count: 4,
  };

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);

  const _getVacancies = (data: FormType) => {
    console.log(data);
    dispatch(setForm(data));
    if (token) {
      dispatch(
        getVacancies({
          token: token,
          vacanciesParams: {
            ...vacanciesParams,
            ...data,
            // no_agreement: 1,
          },
        })
      );
    }
  };

  useEffect(() => {
    _getVacancies({
      ...formState,
      // ...vacanciesParams,
    });
  }, [token, page]);

  return (
    <div className={styles['vacancies-page']}>
      <div className={styles['left-bar']}>
        <Filter submit={_getVacancies} cataloguesProps={catalogues} />
      </div>
      <div className={styles['right-bar']}>
        <KeyWordForm />
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

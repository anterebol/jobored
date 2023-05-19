import { getToken } from '@/store/api/api';
import { CatalougeType, FormType } from '@/types/types';
import { Filter } from '@/components/forms/filter/Filter';
import { useEffect } from 'react';
import styles from './vacancies.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getVacancies } from '@/store/api/api';
import { Preloader } from '@/components/preloader/Preloader';
import { Paginate } from '@/components/paginate/Paginate';
import { KeyWordForm } from '@/components/forms/keywordForm/KeywordForm';
import { setForm } from '@/store/appReducer';
import { useRouter } from 'next/router';
import { createPath } from '@/utils/createPath';
import { URL } from '@/constants/query/url';
import { CATALOGUES_PATH, VACANCIES_PATH } from '@/constants/query/path';
import { headers } from '@/constants/query/headers';
import { parseQuery } from '@/utils/parseQuery';
import { pageCount, itemsPerPage } from '@/constants/default/default';
import { ListVacancies } from '@/components/vacanciesList/VacanciesList';
import { NothingFound } from '@/components/nothingFound/NothingFound';

export const Vacancies = ({ catalogues }: { catalogues: Array<CatalougeType> }) => {
  const { query } = useRouter().query as { query: string };
  const { page } = parseQuery(query);
  const { vacancies, token, loaded, formState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const vacanciesParams = {
    // ...formState,
    published: 1,
    page: Number(page),
    count: itemsPerPage,
  };

  const _getVacancies = (data: FormType) => {
    dispatch(setForm(data));
    if (token) {
      dispatch(
        getVacancies({
          token: token,
          vacanciesParams: {
            ...vacanciesParams,
            ...formState,
            ...data,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);

  useEffect(() => {
    _getVacancies({
      ...formState,
    });
  }, [token, page]);

  return (
    <div className={styles['vacancies-page']}>
      <div className={styles['left-bar']}>
        <Filter submit={_getVacancies} cataloguesProps={catalogues} />
      </div>
      <div className={styles['right-bar']}>
        <KeyWordForm submit={_getVacancies} />
        {loaded ? (
          vacancies.length > 0 ? (
            <ListVacancies vacancies={vacancies} />
          ) : (
            <div className={styles['empty-state']}>
              <NothingFound />
            </div>
          )
        ) : (
          <Preloader />
        )}
        <Paginate
          pageType={VACANCIES_PATH}
          page={Number(page)}
          pageCount={vacancies.length > 0 ? pageCount : 0}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const path = createPath(URL, CATALOGUES_PATH, undefined);
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

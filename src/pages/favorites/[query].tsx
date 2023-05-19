import { getToken, getVacancies } from '@/store/api/api';
import { Vacancy } from '@/components/vacancy/Vacancy';
import { VacancyType } from '@/types/types';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { Paginate } from '@/components/paginate/Paginate';
import { Preloader } from '@/components/preloader/Preloader';
import { NothingFound } from '@/components/nothingFound/NothingFound';
import { useRouter } from 'next/router';
import { itemsPerPage } from '@/constants/default/default';
import { parseQuery } from '@/utils/parseQuery';
import { VACANCY_PATH } from '@/constants/query/path';

export const Favorites = () => {
  const { query } = useRouter().query as { query: string };
  console.log(query);
  const { page } = parseQuery(query);
  const { vacancies, token, favoritesId, loaded } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const itemOffset = (page - 1) * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = favoritesId.slice((page - 1) * itemsPerPage, endOffset);
  const pageCount = Math.ceil(favoritesId.length / itemsPerPage);

  if (currentItems.length === 0 && page > 1) {
    router.push(`/favorites/page=${page - 1}`);
  }

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, []);

  useEffect(() => {
    if (token && currentItems.length !== 0) {
      dispatch(
        getVacancies({
          token: token,
          vacanciesParams: {
            published: 1,
            ids: currentItems,
            count: itemsPerPage,
          },
        })
      );
    }
  }, [token, favoritesId, page]);

  return (
    <>
      {loaded ? (
        currentItems.length > 0 ? (
          vacancies.map((vacancy: VacancyType) => {
            if (currentItems.includes(vacancy.id)) {
              return (
                <li key={vacancy.id}>
                  <Vacancy vacancy={vacancy} details={false} path={VACANCY_PATH} />
                </li>
              );
            }
          })
        ) : (
          <NothingFound isFavorites={true} />
        )
      ) : (
        <Preloader />
      )}
      <Paginate pageType={'favorites'} page={page} pageCount={pageCount} />
    </>
  );
};

export default Favorites;

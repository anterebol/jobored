import { getToken, getVacancies } from '@/store/api/api';
import { Vacancy } from '@/components/vacancy/Vacancy';
import { VacancyType } from '@/types/types';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { Paginate } from '../paginate/Paginate';
import { Preloader } from '../preloader/Preloader';
import { NothingFound } from '../nothingFound/NothingFound';
import { useRouter } from 'next/router';
import { itemsPerPage } from '@/constants/default/default';

export const FavoritesPage = ({ page }: { page: number }) => {
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
            count: 4,
          },
        })
      );
    }
  }, [token, favoritesId, page]);

  return (
    <>
      {loaded ? (
        currentItems.length > 0 ? (
          <ul>
            {vacancies.map((vacancy: VacancyType) => {
              if (currentItems.includes(vacancy.id)) {
                return (
                  <li key={vacancy.id}>
                    <Vacancy vacancy={vacancy} details={false} path="vacancy" />
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          <NothingFound />
        )
      ) : (
        <Preloader />
      )}
      <Paginate pageType={'favorites'} page={page} pageCount={pageCount} />
    </>
  );
};

import { getToken, getVacancies } from '@/store/api/api';
import { Vacancy } from '@/components/vacanciesPage/vacancy/Vacancy';
import { VacancyType } from '@/types/types';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { Paginate } from '../paginate/Paginate';
import { Preloader } from '../preloader/Preloader';
import { NothingFound } from '../nothingFound/NothingFound';

export const FavoritesPage = ({ page }: { page: number }) => {
  const { vacancies, token, favoritesId, loaded } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const itemsPerPage = 4;
  const itemOffset = 1;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = favoritesId.slice(itemOffset * page, endOffset * page);
  const pageCount = Math.ceil(favoritesId.length / itemsPerPage);
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
            ids: currentItems,
            count: 4,
          },
          isFavorites: true,
        })
      );
    }
  }, [token, page]);
  return (
    <>
      {loaded ? (
        vacancies.length > 0 ? (
          <ul>
            {vacancies.map((vacancy: VacancyType) => {
              if (favoritesId.includes(vacancy.id)) {
                return (
                  <li key={vacancy.id}>
                    <Vacancy vacancy={vacancy} details={false} path="favorites" />
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

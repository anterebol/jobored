import { VacanciesPage } from '@/components/vacanciesPage/VacanciesPage';
import { VacancyIdPage } from '@/components/vacanciesPage/VacancyIdPage';
import { cataloguesPath } from '@/constants/path';
import { createPath } from '@/utils/createPath';
import { url } from '@/constants/url';
import { headers } from '@/constants/headers';
import { useRouter } from 'next/router';
import { CatalougeType } from '@/types/types';

const Vacancies = ({ catalogues }: { catalogues: Array<CatalougeType> }) => {
  const { query } = useRouter().query as { query: string };
  const queryProps = query.split('=');
  return (
    <>
      {queryProps[0] === 'page' ? (
        <VacanciesPage page={queryProps[1]} catalogues={catalogues} />
      ) : (
        <VacancyIdPage id={queryProps[1]} />
      )}
    </>
  );
};
export default Vacancies;

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

import { VacancyType } from '@/types/types';
import { Vacancy } from '../vacancy/Vacancy';
import { VACANCY_PATH } from '@/constants/query/path';

export const ListVacancies = ({ vacancies }: { vacancies: Array<VacancyType> }) =>
  vacancies.length > 0 ? (
    <ul>
      {vacancies.map((vacancy) => {
        return (
          <li key={vacancy.id}>
            <Vacancy vacancy={vacancy} details={false} path={VACANCY_PATH} />
          </li>
        );
      })}
    </ul>
  ) : null;

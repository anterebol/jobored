import { VacancyType } from '@/types/types';

export const Vacancy = (props: { vacancy: VacancyType }) => {
  return <h1>Current Vacancy {props.vacancy.profession}</h1>;
};

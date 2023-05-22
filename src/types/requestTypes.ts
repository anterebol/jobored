import { FilterVacanciesType } from './types';

export interface VacancyRequestType {
  token: string;
  id: string;
  vacancyType: string;
}
export interface VacanciesRequestType {
  token: string;
  vacanciesParams?: FilterVacanciesType;
}

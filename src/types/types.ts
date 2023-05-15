export interface FilterVacanciesType {
  [key: string]: string | number | Array<number> | undefined;
  keyword?: string;
  payment_from?: number;
  payment_to?: number;
  catalogues?: number;
  count?: number;
  published?: number;
  ids?: Array<number>;
}
export interface AuthPropsType {
  [key: string]: string | number | undefined;
  login: string;
  password: string;
  client_id: number;
  client_secret: string;
  hr: number;
}
export interface VacancyType {
  id: number;
  profession: string;
  firm_name: string;
  town: { title: string };
  catalogues: Array<{ title: string }>;
  type_of_work: { title: string };
  payment_to: string;
  payment_from: string;
  currency: string;
  vacancyRichText: string;
}
export interface CatalougeType {
  key: number;
  title: string;
}
export interface VacancyProps {
  vacancy: VacancyType;
  path: string;
  details: boolean;
}
export interface PaginateType {
  pageType: string;
  page: number;
  pageCount: number;
}

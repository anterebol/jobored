export interface FilterVacanciesType {
  [key: string]: string | number | undefined;
  keyword: string | undefined;
  payment_from: number | undefined;
  payment_to: number | undefined;
  catalogues: number | undefined;
  count: number | undefined;
  published: number | undefined;
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
  id: string;
  profession: string;
  firm_name: string;
  town: { title: string };
  catalogues: Array<{ title: string }>;
  type_of_work: { title: string };
  payment_to: string;
  payment_from: string;
  currency: string;
  candidat: string;
}
export interface CatalougeType {
  key: number;
  title: string;
}

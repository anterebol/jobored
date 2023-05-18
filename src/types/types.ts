export type FilterVacanciesType = {
  [key: string]: any;
  keyword?: string;
  payment_from?: number | string;
  payment_to?: number | string;
  count?: number;
  published?: number;
  ids?: Array<number>;
  catalogues?: Array<string>;
};
export interface FilterComponentType {
  cataloguesProps: Array<CatalougeType>;
  submit: (data: FormType) => void;
}
export interface AuthPropsType {
  [key: string]: any;
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
  [key: string]: any;
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
export interface FormType {
  [key: string]: any;
  payment_from?: number | string;
  payment_to?: number | string;
  catalogues?: Array<string>;
  keyWord?: string;
}

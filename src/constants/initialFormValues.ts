import { FormType } from '@/types/types';

export const initialFilterValues = {
  payment_from: '',
  payment_to: '',
  catalogues: [],
};
export const initialFormValues = {
  ...initialFilterValues,
  keyword: '',
} as FormType;

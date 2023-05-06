import { CatalougeType } from '@/types/types';

export const choiseIndustryKey = (allIndustries: Array<CatalougeType>, selected: string) => {
  return allIndustries.filter((industry) => industry.title === selected);
};

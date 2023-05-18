import { CatalougeType } from '@/types/types';
interface DecodintType {
  currentCatalogue: Array<string>;
  fullCatalogue: Array<CatalougeType>;
  from: string;
  to: string;
}
export const decodingCatalogue = ({ currentCatalogue, fullCatalogue, from, to }: DecodintType): Array<string> => {
  return currentCatalogue?.map((catalogueItem) => {
    return fullCatalogue[fullCatalogue.findIndex((catalogue) => catalogue[from] === catalogueItem)][
      to
    ];
  });
};

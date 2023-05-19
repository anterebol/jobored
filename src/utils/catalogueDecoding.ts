import { DecodintType } from '@/types/types';

export const decodingCatalogue = ({
  currentCatalogue,
  fullCatalogue,
  from,
  to,
}: DecodintType): Array<string> => {
  return currentCatalogue?.map((catalogueItem) => {
    return fullCatalogue[fullCatalogue.findIndex((catalogue) => catalogue[from] === catalogueItem)][
      to
    ];
  });
};

import styles from './nothingFound.module.css';
import { useRouter } from 'next/router';
import nothingFound from '@/assets/nothingFound.svg';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { useAppSelector } from '@/hooks/hooks';
import { VACANCIES_PATH } from '@/constants/query/path';

export const NothingFound = ({ isFavorites }: { isFavorites: boolean }) => {
  const { currentPage } = useAppSelector((state) => state);
  const router = useRouter();
  return (
    <div className={styles['nothing-found']}>
      <Image src={nothingFound} alt={'nothing-found'} />
      <h2>Упс, здесь еще ничего нет!</h2>
      {isFavorites ? (
        <Button
          onClick={() => {
            router.push(`/${VACANCIES_PATH}/page=${currentPage.vacancies}`);
          }}
          variant="light"
          color="indigo"
        >
          Поиск Вакансий
        </Button>
      ) : null}
    </div>
  );
};

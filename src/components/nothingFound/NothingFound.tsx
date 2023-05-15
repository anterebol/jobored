import styles from './nothingFound.module.css';
import { useRouter } from 'next/router';
import nothingFound from '@/assets/nothingFound.svg';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { useAppSelector } from '@/hooks/hooks';

export const NothingFound = () => {
  const { currentPage } = useAppSelector((state) => state);
  const router = useRouter();
  return (
    <div className={styles['nothing-found']}>
      <Image src={nothingFound} alt={'nothing-found'} />
      <h2>Упс, здесь еще ничего нет!</h2>
      <Button
        onClick={() => {
          router.push(`/vacancies/page=${currentPage.vacancies}`);
        }}
        variant="light"
        color="indigo"
      >
        Поиск Вакансий
      </Button>
    </div>
  );
};

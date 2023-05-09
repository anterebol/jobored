import { Box, Group, Button, MultiSelect, NumberInput } from '@mantine/core';
import Image from 'next/image';
import styles from './form.module.css';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { CatalougeType } from '@/types/types';
import iconX from '@/assets/iconX.svg';
import down from '@/assets/down.svg';

export const FormVacancy = (props: { catalogues: Array<CatalougeType> }) => {
  const { catalogues } = props;
  const form = useForm({
    initialValues: {
      paymentFrom: 0,
      paymentTo: 0,
      industry: 0,
    },

    validate: {
      paymentFrom: (value) => (typeof value === 'number' ? null : 'Введите сумму'),
      paymentTo: (value) => (typeof value === 'number' ? null : 'Введите сумму'),
      industry: (value) => (typeof value === 'number' ? null : 'Выберите отрасль'),
    },
  });
  return (
    <Box className={styles['form-box']}>
      <form className={styles.form} onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className={styles['form-head']}>
          <h2 className={styles['form-title']}>Фильтры</h2>
          <button className={styles['form-reset-btn']}>
            Сбросить все <Image src={iconX} alt={'X'} />
          </button>
        </div>
        <h3 className={styles['form-article-title']}>Отрасль</h3>
        <MultiSelect
          className={styles['form-select']}
          data={catalogues.map((industry) => industry.title)}
          placeholder="Выберите отрасль"
          rightSection={
            <button className={styles['form-select-btn']}>
              <Image src={down} alt={'down'} />
            </button>
          }
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSectionWidth={40}
        />
        <h3 className={styles['form-article-title']}>Оклад</h3>
        <NumberInput
          placeholder="От"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button>
                <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
                <IconChevronUp width={12} height={12} style={{ display: 'block !important' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block !important' }} />
              </button>
            </div>
          }
        />
        <NumberInput
          placeholder="До"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button>
                <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
                <IconChevronUp width={12} height={12} style={{ display: 'block !important' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block !important' }} />
              </button>
            </div>
          }
        />
        <Group>
          <Button className={styles['form-submit-button']} type="submit">
            Применить
          </Button>
          <Button type="submit">Применить</Button>
        </Group>
      </form>
    </Box>
  );
};

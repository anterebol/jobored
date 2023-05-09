import { Box, Group, Button, MultiSelect, NumberInput } from '@mantine/core';
<<<<<<< HEAD
import Image from 'next/image';
=======
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
import styles from './form.module.css';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { CatalougeType } from '@/types/types';
<<<<<<< HEAD
import iconX from '@/assets/iconX.svg';
import down from '@/assets/down.svg';
=======
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329

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
<<<<<<< HEAD
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
          style={{ marginBottom: 8 }}
=======
        <div style={{ display: 'flex' }}>
          <h2 className={styles['form-title']}>Фильтры</h2>
          <button>Сбросить все</button>
        </div>
        <h3 className={styles['form-title']}>Отрасль</h3>
        <MultiSelect
          data={catalogues.map((industry) => industry.title)}
          placeholder="Выберите отрасль"
          rightSection={<IconChevronDown size="1rem" />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          rightSectionWidth={40}
        />
        <h3 className={styles['form-title']}>Оклад</h3>
        <NumberInput
          placeholder="От"
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button>
<<<<<<< HEAD
                <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
=======
                <IconChevronUp width={12} height={12} style={{ display: 'block !important' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block !important' }} />
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
              </button>
            </div>
          }
        />
        <NumberInput
<<<<<<< HEAD
          placeholder="До"
=======
          // defaultValue={0}
          // style={{ width: 275 }}
          placeholder="От"
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button>
<<<<<<< HEAD
                <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
=======
                <IconChevronUp width={12} height={12} style={{ display: 'block !important' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block !important' }} />
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
              </button>
            </div>
          }
        />
        <Group>
<<<<<<< HEAD
          <Button className={styles['form-submit-button']} type="submit">
            Применить
          </Button>
=======
          <Button type="submit">Применить</Button>
>>>>>>> 3c021153967dfd9ce624435b13c46d0b2dc6a329
        </Group>
      </form>
    </Box>
  );
};

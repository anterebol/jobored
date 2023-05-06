import { Box, Group, Button, MultiSelect, NumberInput } from '@mantine/core';
import styles from './form.module.css';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { CatalougeType } from '@/types/types';

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
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button>
                <IconChevronUp width={12} height={12} style={{ display: 'block !important' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block !important' }} />
              </button>
            </div>
          }
        />
        <NumberInput
          // defaultValue={0}
          // style={{ width: 275 }}
          placeholder="От"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button>
                <IconChevronUp width={12} height={12} style={{ display: 'block !important' }} />
              </button>
              <button>
                <IconChevronDown width={12} height={12} style={{ display: 'block !important' }} />
              </button>
            </div>
          }
        />
        <Group>
          <Button type="submit">Применить</Button>
        </Group>
      </form>
    </Box>
  );
};

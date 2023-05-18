import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import styles from './keywordForm.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setForm } from '@/store/appReducer';

export const KeyWordForm = () => {
  const { formState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      vacancyName: formState.vacancyName,
    },

    validate: {
      vacancyName: (value) => (value ? null : 'Введите текст'),
    },
  });
  const setVacancyName = (vacancyName: string) => {
    form.setValues({ vacancyName: vacancyName });
  };

  return (
    <form
      className={styles['search-vacancy-form']}
      onSubmit={form.onSubmit((values) => dispatch(setForm(values)))}
    >
      <TextInput
        size="lg"
        value={form.values.vacancyName}
        onInput={(event: any) => setVacancyName(event.target.value)}
        width={1000}
        placeholder="Введите название вакансии"
        icon={<IconSearch size="0.8rem" />}
        rightSection={<Button className={styles['search-vacancy-form__button']}>Поиск</Button>}
      />
    </form>
  );
};

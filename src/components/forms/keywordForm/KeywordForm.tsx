import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import styles from './keywordForm.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setForm } from '@/store/appReducer';
import { FormType } from '@/types/types';

export const KeyWordForm = ({ submit }: { submit: (data: FormType) => void }) => {
  const { keyword } = useAppSelector((state) => state.formState);
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      keyword: decodeURI(keyword),
    },
  });

  return (
    <form
      id="keyword"
      className={styles['search-vacancy-form']}
      onSubmit={form.onSubmit((values) => {
        const keyword = { keyword: encodeURI(values.keyword) };
        dispatch(setForm({ ...keyword }));
        submit({ ...keyword });
      })}
    >
      <TextInput
        size="lg"
        {...form.getInputProps('keyword')}
        width={1000}
        placeholder="Введите название вакансии"
        icon={<IconSearch size="0.8rem" />}
        rightSection={
          <Button type="submit" className={styles['search-vacancy-form__button']}>
            Поиск
          </Button>
        }
      />
    </form>
  );
};

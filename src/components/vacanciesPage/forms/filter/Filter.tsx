import { Box, Group, Button, MultiSelect, NumberInput } from '@mantine/core';
import Image from 'next/image';
import styles from './filter.module.css';
import { useForm } from '@mantine/form';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { FilterComponentType, FormType } from '@/types/types';
import iconX from '@/assets/iconX.svg';
import down from '@/assets/down.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setForm } from '@/store/appReducer';
import { validatePaymentFrom, validatePaymentTo } from '@/utils/validation';
import { decodingCatalogue } from '@/utils/catalogueDecoding';
import { step } from '@/constants/step';
import { initialFilterValues } from '@/constants/initialFormValues';

export const Filter = ({ cataloguesProps, submit }: FilterComponentType) => {
  const { payment_from, payment_to, catalogues } = useAppSelector((state) => state.formState);
  const dispatch = useAppDispatch();
  const form: any = useForm({
    initialValues: {
      payment_from: payment_from as number,
      payment_to: payment_to as number,
      catalogues: decodingCatalogue({
        currentCatalogue: catalogues as Array<string>,
        fullCatalogue: cataloguesProps,
        from: 'key',
        to: 'title',
      }),
    },

    validate: {
      payment_from: (value) => validatePaymentFrom(value, form.values.payment_to),
      payment_to: (value) => validatePaymentTo(value, form.values.payment_from),
    },
  });

  const _setPaymentTo = (value: number) => {
    form.setValues({ payment_to: value });
  };
  const _setPaymentFrom = (value: number) => {
    form.setValues({ payment_from: value });
  };
  const getPayment = (payment: number | string) => Number(payment ? payment : 0);

  return (
    <Box className={styles['form-box']}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values: FormType) => {
          const catalogueKeys = decodingCatalogue({
            currentCatalogue: values.catalogues as Array<string>,
            fullCatalogue: cataloguesProps,
            from: 'title',
            to: 'key',
          });
          submit({
            ...form.values,
            catalogues: catalogueKeys,
          });
        })}
      >
        <div className={styles['form-head']}>
          <h2 className={styles['form-title']}>Фильтры</h2>
          <button
            type="reset"
            className={styles['form-reset-btn']}
            onClick={() => {
              form.setValues({ ...initialFilterValues });
              dispatch(setForm({ ...initialFilterValues }));
              submit({ ...initialFilterValues });
            }}
          >
            Сбросить все <Image src={iconX} alt={'X'} />
          </button>
        </div>
        <h3 className={styles['form-article-title']}>Отрасль</h3>
        <MultiSelect
          {...form.getInputProps('catalogues')}
          className={styles['form-select']}
          data={cataloguesProps.map((industry) => industry.title)}
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
          style={{ marginBottom: 10 }}
          placeholder="От"
          {...form.getInputProps('payment_from')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button
                type="button"
                onClick={() => {
                  _setPaymentFrom(getPayment(form.values.payment_from) + step);
                }}
              >
                <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
              </button>
              <button
                type="button"
                onClick={() => _setPaymentFrom(getPayment(form.values.payment_from) - step)}
              >
                <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
              </button>
            </div>
          }
        />
        <NumberInput
          placeholder="До"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          {...form.getInputProps('payment_to')}
          rightSection={
            <div className={styles['form-buttons-salary']}>
              <button
                type="button"
                onClick={() => _setPaymentTo(getPayment(form.values.payment_to) + step)}
              >
                <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
              </button>
              <button
                type="button"
                onClick={() => _setPaymentTo(getPayment(form.values.payment_to) - step)}
              >
                <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
              </button>
            </div>
          }
        />
        <Group>
          <Button className={styles['form-submit-button']} type="submit">
            Применить
          </Button>
        </Group>
      </form>
    </Box>
  );
};

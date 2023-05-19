import { step } from '@/constants/step';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import styles from '../filter.module.css';
import { NumberInput } from '@mantine/core';

export const SalaryInput = ({ form, setPayment, placeholder }) => {
  const getPayment = (payment: number | string) => Number(payment ? payment : 0);
  return (
    <NumberInput
      placeholder={placeholder}
      parser={(value: string) => value.replace(/\$\s?|(,*)/g, '')}
      {...form.getInputProps('payment_to')}
      rightSection={
        <div className={styles['form-buttons-salary']}>
          <button
            type="button"
            onClick={() => setPayment(getPayment(form.values.payment_to) + step)}
          >
            <IconChevronUp width={12} height={12} style={{ display: 'block' }} />
          </button>
          <button
            type="button"
            onClick={() => setPayment(getPayment(form.values.payment_to) - step)}
          >
            <IconChevronDown width={12} height={12} style={{ display: 'block' }} />
          </button>
        </div>
      }
    />
  );
};

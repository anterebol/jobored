export const validatePaymentFrom = (paymentFrom: number, paymentTo: number) =>
  paymentFrom < 0
    ? 'Значение не может быть ниже нуля'
    : paymentTo
    ? paymentFrom > paymentTo
      ? 'Значение "От" выше значения "До" '
      : null
    : null;
export const validatePaymentTo = (paymentTo: number, paymentFrom: number) =>
  paymentTo < 0
    ? 'Значение не может быть ниже нуля'
    : paymentFrom && paymentTo
    ? paymentTo < paymentFrom
      ? 'Значение "До" ниже значения "От"'
      : null
    : null;

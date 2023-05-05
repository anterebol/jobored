import { Layout } from '@/components/layout/Layout';
import { Vacancy } from '@/components/vacancies/Vacancy';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const CurrentVacancy: NextPage = () => {
  const { id } = useRouter().query;
  return <Layout>{/* <Vacancy id={Number(id)} /> */}</Layout>;
};
export default Vacancy;

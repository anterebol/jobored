import { Layout } from '@/components/layout/Layout';
import { CurrentVacancy } from '@/components/vacancy/Vacancy';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Vacancy: NextPage = () => {
  const { id } = useRouter().query;
  return (
    <Layout>
      <CurrentVacancy id={Number(id)} />
    </Layout>
  );
};
export default Vacancy;

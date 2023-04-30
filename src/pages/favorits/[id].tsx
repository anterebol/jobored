import { CurrentFavorite } from '@/components/favorite/Favorite';
import { Layout } from '@/components/layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Favorite: NextPage = () => {
  const { id } = useRouter().query;
  return (
    <Layout>
      <CurrentFavorite id={Number(id)} />
    </Layout>
  );
};
export default Favorite;

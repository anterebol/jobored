import { FavoriteIdPage } from '@/components/favoritesPage/FavoriteIdPage';
import { FavoritesPage } from '@/components/favoritesPage/FavoritesPage';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Favorites: NextPage = () => {
  const { query } = useRouter().query as { query: string };
  const queryProps = query?.split('=');
  return (
    <>
      {queryProps && queryProps[0].includes('page') ? (
        <FavoritesPage page={Number(queryProps[1])} />
      ) : (
        <FavoriteIdPage id={queryProps ? queryProps[1] : ''} />
      )}
    </>
  );
};
export default Favorites;

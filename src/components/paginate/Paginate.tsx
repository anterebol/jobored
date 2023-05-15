import { useAppDispatch } from '@/hooks/hooks';
import { currentPageSet } from '@/store/appReducer';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import styles from './paginate.module.css';
import { PaginateType } from '@/types/types';

export const Paginate = ({ pageType, page, pageCount }: PaginateType) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    dispatch(currentPageSet({ type: pageType, page: selectedPage }));
    router.push(`/${pageType}/page=${selectedPage}`);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      initialPage={Number(page) - 1}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName={styles['pagination']}
      nextLinkClassName={styles['page-num']}
      pageLinkClassName={styles['page-num']}
      previousLinkClassName={styles['page-num']}
      activeLinkClassName={styles['active']}
      disabledClassName={styles['disabled']}
    />
  );
};

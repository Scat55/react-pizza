import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface Page {
  onChangePage: (number: number) => void;
}

function Pagination({ onChangePage }: Page) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      // Бэкенд должен возвращать кол-во страниц, но MockApi этого не умеет делать
      // И это кол-во страниц мы пишем в pageCount
      pageCount={3}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;

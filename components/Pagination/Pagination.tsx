'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  pageRangeDisplayed?: number; // скільки сторінок показувати у центрі
  marginPagesDisplayed?: number; // скільки сторінок показувати з країв
}

export default function Pagination({
  totalPages,
  page,
  setPage,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      disabledClassName={css.disabled}
    />
  );
}

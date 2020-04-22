import React from 'react';

import styles from './Pagination.module.css';
import cx from 'classnames';

interface Pagination {
  pageCount: number;
  currentPage: number;
  goToPage: (pageNumber: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  goToPage,
}: Pagination) {
  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <>
          <button onClick={() => goToPage(currentPage - 1)} className={styles.prev_next}>Previous</button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            className={styles.pages}
          >
            {currentPage - 1}
          </button>
        </>
      )}
      <p className={cx(styles.pages, styles.active)}>{currentPage}</p>
      {currentPage < pageCount && (
        <>
          <button
            onClick={() => goToPage(currentPage + 1)}
            className={styles.pages}
          >
            {currentPage + 1}
          </button>
          <button onClick={() => goToPage(currentPage + 1)} className={styles.prev_next}>Next</button>
        </>
      )}
    </div>
  );
}

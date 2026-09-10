import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils/getNumbers';
import { Icon } from '../Icon';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);

  if (pageCount <= 1) {
    return null;
  }

  const pages = getNumbers(1, pageCount);

  return (
    <nav className={styles.wrapper} aria-label="Pagination">
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="chevron-left" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          type="button"
          className={cn(styles.page, { [styles.active]: page === currentPage })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.button}
        disabled={currentPage === pageCount}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
};

import { storiesOf } from '@storybook/react';
import React from 'react';

import Pagination from '.';
import { useState } from '@storybook/addons';

storiesOf('Pagination', module).add('Default', () => {
  const [currentPage, setCurrentPage] = useState(1);

  function changePage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div style={{ backgroundColor: 'grey', padding: '3rem' }}>
      <Pagination
        currentPage={currentPage}
        pageCount={25}
        goToPage={changePage}
      />
    </div>
  );
});

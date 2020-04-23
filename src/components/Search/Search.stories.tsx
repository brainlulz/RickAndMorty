import React from 'react';

import { action } from '@storybook/addon-actions';
import { useState } from '@storybook/addons';
import { storiesOf } from '@storybook/react';

import Search from './';

storiesOf('Search', module).add('Default', () => {
  const [searchValue, setSearchValue] = useState('');

  function changeSearch(value: string) {
    setSearchValue(value);
  }

  return (
    <div style={{ backgroundColor: 'grey', padding: '3rem' }}>
      <Search
        handleCharacterSearch={changeSearch}
        resetData={action('resetData')}
        value={searchValue}
      />
    </div>
  );
});

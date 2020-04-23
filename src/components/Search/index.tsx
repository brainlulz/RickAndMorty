import React, { useCallback, useEffect, useState } from 'react';

import styles from './Search.module.css';

interface Props {
  handleCharacterSearch: (search: string) => void;
  resetData: () => void;
  value: string;
}

export default function Search({
  handleCharacterSearch,
  resetData,
  value,
}: Props) {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCharacterSearch(currentValue);
  };

  const onReset = (event: React.FormEvent) => {
    event.preventDefault();
    resetData();
  };

  const onChange = useCallback((e) => {
    setCurrentValue(e.target.value);
  }, []);

  return (
    <>
      <form className={styles.wrapper} onSubmit={onSubmit} onReset={onReset}>
        <label htmlFor="character" className={styles.label}>
          Search a character
        </label>
        <p className={styles.species}>
          Or click on a character's species to find same ones
        </p>
        <div className={styles.container}>
          <input
            data-testid="input"
            type="text"
            id="character"
            aria-label="character"
            onChange={onChange}
            value={currentValue}
            className={styles.input}
            placeholder="Eg: Beebo "
          />
          <div className={styles.buttons_wrapper}>
            <button type="reset" onClick={onSubmit} className={styles.button} disabled={currentValue === ''}>
              Search
            </button>
            <button type="reset" onClick={onReset} className={styles.button}>
              Reset search or filter
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

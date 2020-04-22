import React, { useState, useCallback, useEffect } from 'react';
import styles from './Search.module.css';

interface Props {
  handleCharacterSearch: (search: string) => void;
  fetchData: () => void;
  value: string;
}

export default function Search({ handleCharacterSearch, fetchData, value }: Props) {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(currentValue)
    handleCharacterSearch(currentValue);
  };

  const onReset = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData();
  };

  const onChange = useCallback((e) => {
    setCurrentValue(e.target.value);
  }, []);

  return (
    <>
      <form className={styles.wrapper} onSubmit={onSubmit} onReset={onReset}>
        <label htmlFor="character">Search a character</label>
        <input
          data-testid="input"
          type="text"
          id="character"
          aria-label="character"
          onChange={onChange}
          value={currentValue}
        />
        <button type="reset" onClick={onReset}>Reset</button>
      </form>
    </>
  );
}

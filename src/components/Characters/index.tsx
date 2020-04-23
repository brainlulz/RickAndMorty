import React, { useCallback, useEffect, useState } from 'react';

import meeseeks from '../../assets/meeseeks.png';
import spinner from '../../assets/spinner.gif';
import getByName from '../../services/getByName';
import getBySpecies from '../../services/getBySpecies';
import getCharacters from '../../services/getCharacters';
import CharacterCard from '../CharacterCard';
import Pagination from '../Pagination';
import Search from '../Search';
import styles from './Characters.module.css';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  const [speciesSearch, setSpeciesSearch] = useState('');
  const [error, setError] = useState(null);

  function handleResponse(response: {
    error: React.SetStateAction<null>;
    results: React.SetStateAction<never[]>;
    info: { pages: React.SetStateAction<number> };
  }) {
    if (response.error) {
      setError(response.error);
      setCharacters([]);
    } else {
      setCharacters(response.results);
      setPageCount(response.info.pages);
    }
    setFetching(false);
    setSpeciesSearch('');
  }

  const fetchData = useCallback(async (selected = 1) => {
    setFetching(true);
    setCurrentValue('');
    setError(null);
    setCurrentPage(selected);

    const data = await getCharacters(selected);
    handleResponse(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchByCharacterName = useCallback(
    (name: string, page?: number) => {
      if (currentValue === name && page === currentPage) return;

      setFetching(true);
      setCurrentValue(name);
      setError(null);

      const fetchCharacter = async () => {
        const data = await getByName(name, page);
        handleResponse(data);
      };

      fetchCharacter();
    },
    [currentPage, currentValue]
  );

  // fetch by character name

  // fetch by characters by species
  const fetchBySpecies = (type: string, page?: number) => {
    if (speciesSearch === type && page === currentPage) return;
    setFetching(true);

    const fetchCharacter = async () => {
      const data = await getBySpecies(type, page);
      handleResponse(data);
      setSpeciesSearch(type);
    };

    fetchCharacter();
  };

  function changePage(pageNumber: number) {
    if (currentValue) {
      fetchByCharacterName(currentValue, pageNumber);
    } else if (speciesSearch) {
      fetchBySpecies(speciesSearch, pageNumber);
    } else {
      fetchData(pageNumber);
    }
    setCurrentPage(pageNumber);
  }

  // LIFE CYCLE

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // RENDERS

  function handleFetch() {
    return (
      <div className={styles.spinner}>
        <img src={spinner} alt="loading" />
      </div>
    );
  }

  function handleSearch() {
    if (error) {
      return (
        <div className={styles.error}>
          <img src={meeseeks} alt="mr meeseeks" />
          Ooops: {error}
        </div>
      );
    } else {
      return (
        <>
          {speciesSearch.length > 0 && (
            <p className={styles.searched}>Searched By: {speciesSearch}</p>
          )}
          <div className={styles.characters_wrapper}>
            {characters.map((character, i) => (
              <CharacterCard
                key={i}
                data={character}
                fetchBySpecies={fetchBySpecies}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            goToPage={changePage}
          />
        </>
      );
    }
  }

  return (
    <div>
      <Search
        value={currentValue}
        handleCharacterSearch={fetchByCharacterName}
        fetchData={fetchData}
      />
      {fetching ? handleFetch() : handleSearch()}
    </div>
  );
}

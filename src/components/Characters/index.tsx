import React, { useState, useEffect, useCallback } from 'react';
import getCharacters from '../../services/getCharacters';
import getByName from '../../services/getByName';
import getBySpecies from '../../services/getBySpecies';
import CharacterCard from '../CharacterCard';
import Search from '../Search';
import spinner from '../../assets/spinner.gif';
import styles from './Characters.module.css';
import Pagination from '../Pagination';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  const [error, setError] = useState(null);

  function handleResponse(response: {
    error: React.SetStateAction<null>;
    results: React.SetStateAction<never[]>;
    info: { pages: React.SetStateAction<number> };
  }) {
    console.log("response",response)
    if (response.error) {
      setError(response.error);
      setCharacters([]);
    } else {
      setCharacters(response.results);
      setPageCount(response.info.pages);
    }
    setFetching(false);
  }

  const fetchData = useCallback(async (selected = 1) => {
    setFetching(true);
    setCurrentValue('');
    setError(null);
    setCurrentPage(selected);

    console.log(selected)

    const data = await getCharacters(selected);
    handleResponse(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // fetch by character name
  const handleCharacterSearch = useCallback((name: string) => {

    console.log("NAME", name)
    setFetching(true);
    setCurrentValue(name);

    const fetchCharacter = async () => {
      const data = await getByName(name);
      handleResponse(data);
    };

    fetchCharacter();
  }, []);

  // fetch by characters by species
  const fetchBySpecies = (type: string) => {
    setFetching(true);

    const fetchCharacter = async () => {
      const data = await getBySpecies(type);
      handleResponse(data);
    };

    fetchCharacter();
  };

  function changePage(pageNumber: number) {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // RENDERS

  function handleError() {
    return <div>{error}</div>;
  }

  function handleFetch() {
    return (
      <div className={styles.spinner}>
        <img src={spinner} alt="loading" />
      </div>
    );
  }

  function handleSearch() {
    return (
      <>
        <Search
          value={currentValue}
          handleCharacterSearch={handleCharacterSearch}
          fetchData={fetchData}
        />
        {error && handleError()}
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

  return <div>{fetching ? handleFetch() : handleSearch()}</div>;
}

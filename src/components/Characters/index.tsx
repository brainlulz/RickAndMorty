import React, { useState, useEffect } from 'react';
import fetchCharacters from '../../services/fetchCharacters';
import CharacterCard from '../CharacterCard';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters();
      console.log(data.results);
      setCharacters(data.results);
    };
    fetchData();
  }, []);

  if (characters.length < 1) {
    return <h1>Loading Characters</h1>;
  }
  return (
    <div>
      {characters.map((character) => (
        <CharacterCard data={character} />
      ))}
    </div>
  );
}

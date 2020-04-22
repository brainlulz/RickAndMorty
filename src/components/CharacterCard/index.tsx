import React, { useState, useCallback } from 'react';

import styles from './CharacterCard.module.css';
import CharacterInt from './Character.types';
import Episode from '../Episode';

interface Props {
  data: CharacterInt;
  fetchBySpecies: (type: string) => void;
}

export default function CharacterCard({ data, fetchBySpecies}: Props) {
  const [episodeURL, setEpisodeURL] = useState('');

  function showEpisode(url: string) {
    setEpisodeURL(url);
  }

  const clearEpisode = useCallback(() => {
    setEpisodeURL('');
  }, []);

  return (
    <div className={styles.wrapper}>
      <img src={data.image} alt={data.name} className={styles.image} />
      <p className={styles.name}>{data.name}</p>
      <div>
        <div className={styles.species}>
          <p className={styles.title}>Species:</p>
          <p onClick={() => fetchBySpecies(data.species)}>&nbsp;{data.species}</p>
        </div>
        <p className={styles.title}>Episodes:</p>
        <div className={styles.episode_wrapper}>
          {data.episode.map((episode) => (
            <>
              <p
                onMouseEnter={() => showEpisode(episode)}
                onMouseLeave={clearEpisode}
                className={styles.episode}
              >
                {episode.match(/\d*/gm)}
              </p>
            </>
          ))}
          {episodeURL && <Episode url={episodeURL} />}
        </div>
      </div>
    </div>
  );
}

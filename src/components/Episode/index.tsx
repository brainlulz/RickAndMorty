import React, { useState, useEffect } from 'react';

import getEpisode from '../../services/getEpisode';

import styles from './Episode.module.css';

export default function Episode({ url }: { url: string }) {
  const [name, setName] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async (episodeURL: string) => {
      const data = await getEpisode(episodeURL);
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
        setEpisodeNumber(data.episode);
      }
    };

    fetchEpisodeData(url);
    setFetching(false);
  }, [url]);

  if (error) {
    return <div className={styles.wrapper}>{error}</div>;
  }

  if (fetching || name === '' || episodeNumber === '') {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <p>
        {name}, {episodeNumber}
      </p>
    </div>
  );
}

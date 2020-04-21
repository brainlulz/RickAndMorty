import React from 'react';

import styles from './CharacterCard.module.css';
import CharacterInt from '../../interfaces/Character';

interface Props {
  data: CharacterInt;
}

export default function CharacterCard({ data }: Props) {
  return (
    <div className={styles.wrapper}>
      {data.name}
    </div>
  );
}

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './accordion.module.scss';

const Accordion = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleCardClick}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <p className={styles.cardFrontP}>Discover Options! </p>
        </div>
        <div className={styles.cardBack}>
          <div className={styles.options}>
            <Link href="/admin/product"> Products </Link>
            <Link href="/admin/category"> Categories </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

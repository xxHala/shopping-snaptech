import React from "react";
import styles from './card.module.scss';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useTranslation } from 'next-i18next'

const Card = (cardData) => {
  const { query: { slug } } = useRouter();
  const { t } = useTranslation()

  return (
    slug === 'product' ? (
      <div className={styles.cardContaier}>
        <img src={cardData.image} className={styles.image} />
        <div className={styles.itemInfo}>
          <h1 className={styles.title}>{cardData.title}</h1>
          <p>{cardData.price} JOD</p>
        </div>
        <Link passHref className={styles.glow}
          href={{ pathname: `/${slug}/${cardData.id}`, query: cardData }}
        >
          {t("checkProductDatials")}
        </Link >
      </div>
    ) :
      <div className={styles.cardContaier}>
        <div className={styles.itemInfo}>
          <h1 className={styles.title}>{cardData.title}</h1>
          <Link className={styles.glow}
            href={`/product/${cardData.title}`}
          >
            {t("relatedCategori")}
          </Link >
        </div>
      </div >
  )
}

export default Card;

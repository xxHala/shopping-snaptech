import styles from './detailsproduct.module.scss';

const Details = (data) => (
  <div className={styles.wrapper}>
    <div className={styles.productInfo}>
      <div className={styles.img}>
        <img src={data.image} height={400} width={400}></img>
      </div>
      <div className={styles.desc}>
        <h1>{data.title}</h1>
        <p>{data.price}JD</p>
        <p>{data.description}</p>
      </div>
    </div>
  </div>
);

export default Details;
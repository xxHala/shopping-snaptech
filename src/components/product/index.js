import Grid from '@/components/grid';
import Head from 'next/head';
import styles from './product.module.scss';

const Product = ({ product }) => {
  if (product.length === 0) {
    return <div>Loading...</div>;
  }

  const pageTitle = 'ProductList';
  const pageDescription = 'A list of Some Of Our Products';

  return (
    <div className={styles.g}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Grid data={product} />
    </div>
  );
};

export default Product;

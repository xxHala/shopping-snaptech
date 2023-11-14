import Grid from '@/components/grid';
import Head from 'next/head'; // Import the Head component

const Category = ({ category }) => {
  const pageTitle = 'Categories';
  const pageDescription = 'Discover more categories and product inside each of them';

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Grid data={category} />
    </div >
  )
};

export default Category;

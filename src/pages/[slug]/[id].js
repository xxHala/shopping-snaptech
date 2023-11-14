import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Details from '@/components/detailsproduct';
import axios from 'axios';
import Head from 'next/head';

export default function Main({ cardData }) {
  const { result, query } = cardData;
  const pageTitle = result ? 'Product-Categories' : 'Product Info';
  const pageDescription = "product information"

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <div>
        {result && (result.map((data, index) => (
          <Details key={index} {...data} />
        )))}
      </div><div>
        {query && (
          <Details {...query} />
        )}
      </div></>
  );
}

export async function getServerSideProps(context) {
  const { locale, query } = context;
  const response = await axios.get(`http://localhost:3000/api/getData/product?category=${query.id}`);
  return {
    props: {
      cardData: (response.data.result).length !== 0 ? { ...response.data } : { query },
      ...(await serverSideTranslations(locale)),
    },
  };

}

import Category from '@/components/Category'
import Product from '@/components/product'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router';
import axios from 'axios';
import { translate } from '@/translate';

export default function Admin({ product, category }) {
  const { query: { slug } } = useRouter();
  return (
    <div>
      {slug === 'product' && <Product product={product} />}
      {slug === 'category' && <Category category={category} />}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const response = await axios.get('/api/getData/product');
  const products = response.data.result;

  const translateProducts = await Promise.all(
    products?.map(async product => {
      return {
        ...product,
        href: product.category,
        category: await translate(product.category, locale),
        description: await translate(product.description, locale),
        title: await translate(product.title, locale)
      }
    })
  );

  const cat_response = await axios.get('https://shopping-snaptech.vercel.app/api/getData/category');

  const category = cat_response.data.result;
  const translateCategory = await Promise.all(
    category?.map(async item => {
      return {
        ...item,
        title: await translate(item.title, locale)
      }
    })
  );

  return {
    props: {
      product: translateProducts,
      category: translateCategory,
      ...(await serverSideTranslations(locale)),
    },
  }
}

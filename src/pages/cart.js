import Card from '@/components/card'
import { useCartContext } from '@/context/CartContext'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Cart () {
  const { products, buyAll } = useCartContext()

  return (
    <div className='wrapper-cart'>
      <div className='cart-container'>
        {products.map(product =>
          <Card {...product} key={`product-${product.id}`} />
        )}
      </div>
      {!!products.length &&
        <button className='glow cart-button' onClick={buyAll}>
          Buy All
        </button>}
    </div>
  )
}

export async function getServerSideProps (context) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  }
}

import { useCartContext } from '@/context/CartContext'
import styles from './detailsproduct.module.scss'

const Details = data => {
  const { addToCart, removeFromCart } = useCartContext()

  return (
    <div className={styles.wrapper}>
      <div className={styles.productInfo}>
        <div className={styles.img}>
          <img src={data.image} height={400} width={400} />
        </div>
        <div className={styles.desc}>
          <h1>
            {data.title}
          </h1>
          <p>
            {data.price}JD
          </p>
          <p>
            {data.description}
          </p>
          {data.product &&
            <div>
              <button
                className='glow'
                onClick={() => {
                  addToCart(data)
                }}
              >
                Add to cart
              </button>
              <button
                className='glow'
                onClick={() => {
                  removeFromCart(data)
                }}
              >
                Remove from cart
              </button>
            </div>}
        </div>
      </div>
    </div>
  )
}
export default Details

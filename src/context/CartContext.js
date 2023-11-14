const {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} = require('react')

const CartContext = createContext({
  products: []
})

export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({ children }) => {
  const [products, setProduct] = useState([])

  const addToCart = element => {
    if (!products.includes(element)) {
      localStorage.setItem('product', JSON.stringify([...products, element]))
      setProduct([...products, element])
    } else window.alert('Already here !!')
  }

  const buyAll = () => {
    setProduct([])
    window.alert('Completed !!')
  }

  const removeFromCart = element => {
    const filteredProducts = products.filter(
      product => product.id !== element.id
    )

    localStorage.setItem('product', JSON.stringify(products))

    setProduct(filteredProducts)
    window.alert('Removed !!')
  }

  useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem('product')) || [])
  }, [])

  const value = useMemo(
    () => ({
      addToCart,
      products,
      removeFromCart,
      buyAll
    }),
    [addToCart]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider

import Wrapper from '@/components/Wrapper/Wrapper'
import { AuthContextProvider } from '@/context/AuthContext'

import { appWithTranslation } from 'next-i18next'

import '@/styles/globals.scss'
import CartContextProvider from '@/context/CartContext'

const App = ({ Component, pageProps }) =>
  <AuthContextProvider>
    <CartContextProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </CartContextProvider>
  </AuthContextProvider>

export default appWithTranslation(App)

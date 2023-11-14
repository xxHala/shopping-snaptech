import Wrapper from '@/components/Wrapper/Wrapper'
import { AuthContextProvider } from '@/context/AuthContext'

import { appWithTranslation } from 'next-i18next'

import '@/styles/globals.scss'

const App = ({ Component, pageProps }) => (
  <AuthContextProvider>
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper >
  </AuthContextProvider>
)

export default appWithTranslation(App)

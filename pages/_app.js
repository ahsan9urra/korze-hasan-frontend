import ContextWrapper from '<prefix>/context/ContextWrapper'
import Layout from '<prefix>/layout/Layout'
import '<prefix>/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextWrapper>
  )
}

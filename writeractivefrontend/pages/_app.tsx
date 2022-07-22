import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import EngineLayout from "../components/EngineLayout/EngineLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <EngineLayout>
          <Component {...pageProps} />
        </EngineLayout>
      </>
  )
}

export default MyApp

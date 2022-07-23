import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import EngineLayout from "../components/EngineLayout/EngineLayout";
import {AuthProvider} from "../context/AuthContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
      <>
        <AuthProvider router={router}>
            <EngineLayout>
                <Component {...pageProps} />
            </EngineLayout>
        </AuthProvider>
      </>
  )
}

export default MyApp

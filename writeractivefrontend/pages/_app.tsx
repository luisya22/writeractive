import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout/Layout";
import {AuthProvider} from "../context/AuthContext";
import api from "../http/axiosConfig";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
      <>
        <AuthProvider router={router}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
      </>
  )
}

export default MyApp

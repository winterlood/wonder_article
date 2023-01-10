import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import Head from "next/head";
import MetaHead from "components/MetaHead";
import ExternalScript from "lib/client/ExternalScript";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <ExternalScript />
      </Head>
      <MetaHead />
      <Component {...pageProps} />
    </Layout>
  );
}

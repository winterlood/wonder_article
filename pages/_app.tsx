import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import Head from "next/head";
import MetaHead from "components/MetaHead";
import ExternalScript from "lib/client/ExternalScript";
import { useEffect } from "react";
import { Router } from "next/router";

import "nprogress/nprogress.css";
import NProgress from "nprogress";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

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

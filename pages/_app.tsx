import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import Head from "next/head";
import thumbnail from "public/image/wonder_thumbnail.png";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>{"Wonder"}</title>
        <meta property="og:title" content={"Wonder"} />
        <meta
          property="og:image"
          content={process.env.BASE_URL + thumbnail.src}
        />
        <meta
          property="og:description"
          content={`Wonder가 소개하는 '뭐라도 하는' 아티클들`}
        />
        <meta property="og:type" content={"website"} />
        <meta property="og:locale" content={"kor"} />
        <meta property="og:site_name" content={"Wonder"} />
        <meta property="twitter:title" content={"Wonder"} />
        <meta
          property="twitter:image"
          content={process.env.BASE_URL + thumbnail.src}
        />
        <meta property="twitter:card" content={"image"} />
        <meta
          property="twitter:description"
          content={`Wonder가 소개하는 '뭐라도 하는' 아티클들`}
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

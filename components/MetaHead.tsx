import React from "react";
import Head from "next/head";
import thumbnail from "public/image/wonder_thumbnail.png";

// TYPES

interface Props {
  title?: string;
  thumbnail?: string;
  description?: string;
}

// COMPONENT

const MetaHead = (props: Props) => {
  const image = props.thumbnail || process.env.BASE_URL + thumbnail.src;
  const description =
    props.description || "Wonder가 소개하는 '뭐라도 하는' 아티클들";
  const title = props.title ? `${props.title} | Wonder` : "Wonder";

  const openGraphObj: {
    og: { [k: string]: string };
    twitter: { [k: string]: string };
  } = {
    og: {
      title,
      image,
      description,
      type: "website",
      site_name: "Wonder",
      locale: "ko",
    },
    twitter: {
      title,
      image,
      description,
      card: "image",
    },
  };

  return (
    <Head>
      <title>{openGraphObj.og.title}</title>
      {Object.keys(openGraphObj.og).map((it) => {
        const content = openGraphObj.og[it];
        return (
          <meta key={`meta_og_${it}`} property={`og:${it}`} content={content} />
        );
      })}
      {Object.keys(openGraphObj.twitter).map((it) => {
        const content = openGraphObj.twitter[it];
        return (
          <meta
            key={`meta_twitter_${it}`}
            property={`twitter:${it}`}
            content={content}
          />
        );
      })}
    </Head>
  );
};

export default MetaHead;

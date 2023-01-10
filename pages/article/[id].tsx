import { GetStaticProps, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { getArticleDetail } from "lib/server/notion";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import { IArticle } from "types/global";
import logo from "public/image/logo_square.png";

import style from "./[id].module.scss";
import classNames from "classnames/bind";
import Head from "next/head";
import MetaHead from "components/MetaHead";
const cx = classNames.bind(style);

interface IProps {
  pageID: string;
  articleInfo: IArticle;
  articleRecordMap: ExtendedRecordMap;
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function Page(props: IProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading</div>;
  }

  const { articleInfo, articleRecordMap } = props;

  return (
    <div className={cx("container")}>
      <MetaHead
        title={articleInfo.title}
        description={`Wonder가 소개하는 '뭐라도 하는' 아티클들 ${articleInfo.title}`}
        thumbnail={articleInfo.cover}
      />
      <div className={cx("header")}>
        <div className={cx("info_row")}>
          <div className={cx("create_time")}>
            {new Date(articleInfo.createTime).toLocaleDateString()}
          </div>
        </div>
        <div className={cx("title")}>{articleInfo.title}</div>
        <div className={cx("author_row")}>
          <div
            className={cx("author_avatar")}
            style={{
              backgroundImage: `url(${articleInfo.author.avatarUrl})`,
            }}
          ></div>
          <div className={cx("author_name")}>{articleInfo.author.name}</div>
        </div>
      </div>
      <div className={cx("thubmnail_wrapper")}>
        {articleInfo.cover && (
          <div
            className={cx("thumbnail")}
            style={{ backgroundImage: `url(${articleInfo.cover})` }}
          ></div>
        )}
      </div>
      <div className={cx("main")}>
        <NotionRenderer
          showTableOfContents={true}
          darkMode={false}
          previewImages={true}
          recordMap={articleRecordMap}
        />
      </div>
    </div>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as IParams;
  const detailResponse = await getArticleDetail(id);
  if (detailResponse) {
    const { articleInfo, articleRecordMap } = detailResponse;
    return {
      props: {
        pageID: id,
        articleInfo,
        articleRecordMap,
      },
      revalidate: 30,
    };
  } else {
    throw new Error();
  }
};

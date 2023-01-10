import classNames from "classnames/bind";
import style from "./index.module.scss";
import { getArticleList } from "lib/server/notion";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IArticle } from "types/global";
import ArticleItem from "components/ArticleItem";
import Link from "next/link";

const cx = classNames.bind(style);

interface IProps {
  articleList: IArticle[];
}

export default function Home({ articleList }: IProps) {
  const router = useRouter();

  return (
    <div className={cx("container")}>
      <section className={cx("section_title")}>
        <div className={cx("title")}>Wonder</div>
        <div className={cx("desc")}>
          퇴근해서 뭐라도 하고싶은 사람들을 위한
          <br />
          아티클을 공유합니다
        </div>
      </section>
      {!router.isFallback && (
        <section className={cx("section_article_list")}>
          <div className={cx("header")}>
            <div className={cx("title")}>최근 아티클</div>
            <div className={cx("viewmore")}>
              <Link href={`/article`}>더보기</Link>
            </div>
          </div>
          {articleList.map((article) => (
            <ArticleItem key={article.id} {...article} />
          ))}
        </section>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const articleList = await getArticleList();
  return {
    props: {
      articleList: articleList ? articleList.slice(0, 2) : [],
    },
    revalidate: 5,
  };
};

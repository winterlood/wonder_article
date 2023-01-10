import classNames from "classnames/bind";
import ArticleItem from "components/ArticleItem";
import { getArticleList } from "lib/server/notion";
import { GetServerSideProps } from "next";
import { IArticle } from "types/global";
import style from "./index.module.scss";
const cx = classNames.bind(style);

interface IProps {
  articleList: IArticle[];
}

export default function Page({ articleList }: IProps) {
  return (
    <div className={cx("container")}>
      {articleList.map((article) => (
        <ArticleItem key={article.id} {...article} />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articleList = await getArticleList();
  return {
    props: {
      articleList,
    },
  };
};

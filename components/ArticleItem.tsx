import classNames from "classnames/bind";
import Link from "next/link";
import { IArticle } from "types/global";
import style from "./ArticleItem.module.scss";
import Tag from "./Tag";
import logo from "public/image/logo_square.png";

const cx = classNames.bind(style);

interface IProps extends IArticle {}

export default function ArticleItem(props: IProps) {
  const cover = props.cover ?? logo.src;
  return (
    <div className={cx("container")}>
      <Link href={`/article/${props.id}`}>
        <div
          className={cx("thumbnail_col")}
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
        <div className={cx("info_col")}>
          <div className={cx("title")}>{props.title}</div>
          <div className={cx("desc")}>
            <div className={cx("author_col")}>
              <div
                className={cx("author_avatar")}
                style={{ backgroundImage: `url(${props.author.avatarUrl})` }}
              ></div>
              <div className={cx("author_name")}>{props.author.name}</div>
            </div>
            <div className={cx("create_time")}>
              {new Date(props.createTime).toLocaleDateString()} 작성
            </div>
          </div>
          <div className={cx("tag")}>
            {props.tags.map((tag) => (
              <Tag key={`${props.id}-${tag}`}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

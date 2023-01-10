import classNames from "classnames/bind";
import style from "./Banner.module.scss";
const cx = classNames.bind(style);
export default function Banner() {
  return (
    <div className={cx("container")}>
      <div>Wonder 카카오 오픈채팅 입장</div>
    </div>
  );
}

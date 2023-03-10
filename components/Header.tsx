import classNames from "classnames/bind";
import Image from "next/image";
import style from "./Header.module.scss";
const cx = classNames.bind(style);

import profileImage from "public/image/winterlood.png";
import { useRouter } from "next/router";
import Link from "next/link";

const navArray = [
  { pageName: "home", path: "/" },
  { pageName: "article", path: "/article/" },
];

export default function Header() {
  const router = useRouter();
  const curFirstLocation = router.pathname.split("/")[1] || "home";

  return (
    <div className={cx("container")}>
      <div className={cx("logo_col")}>
        <Link href={`/`}>Wonder</Link>
      </div>
      <nav className={cx("nav_col")}>
        {navArray.map((it) => (
          <li
            className={
              curFirstLocation === it.pageName ? cx("nav_on") : undefined
            }
            key={it.pageName}
          >
            <Link href={it.path}>{it.pageName.toUpperCase()}</Link>
          </li>
        ))}
      </nav>
    </div>
  );
}

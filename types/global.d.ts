import { ReactElement } from "react";

interface IArticle {
  id: string;
  title: string;
  tags: string[];
  createTime: string;
  cover: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}

type IChildren = string | ReactElement | ReactElement[];

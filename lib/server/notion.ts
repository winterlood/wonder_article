import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import * as notionUtils from "notion-utils";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { IArticle } from "types/global";

const DATABSE_ID = "6303d538f2544b1aa3e0ac1f36961695";

const api = new NotionAPI();

export const notionClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});

const convertArticleType = (page: PageObjectResponse): IArticle => {
  const postItem = {
    id: page.id,
    // @ts-ignore
    title: page.properties.title.title.map((it) => it.plain_text).join(" "),
    // @ts-ignore
    cover: page.cover && page.cover[page.cover.type].url,
    // @ts-ignore
    tags: page.properties.tags.multi_select.map((it) => it.name),
    createTime: page.created_time,
    author: {
      // @ts-ignore
      name: page.properties.author.created_by.name,
      // @ts-ignore
      avatarUrl: page.properties.author.created_by.avatar_url,
    },
  };
  return postItem;
};

export const getArticleDetail = async (
  pageID: string
): Promise<
  { articleInfo: IArticle; articleRecordMap: ExtendedRecordMap } | undefined
> => {
  try {
    const [pageQuery, recordMapQuery] = await Promise.allSettled([
      notionClient.pages.retrieve({
        page_id: pageID,
      }),
      api.getPage(pageID),
    ]);
    if (
      pageQuery.status === "fulfilled" &&
      recordMapQuery.status === "fulfilled"
    ) {
      const pageQueryData = pageQuery.value as PageObjectResponse;
      const recordMap = recordMapQuery.value;
      const pageInfo: IArticle = convertArticleType(pageQueryData);
      return { articleInfo: pageInfo, articleRecordMap: recordMap };
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
  }
};

export const getArticleList = async () => {
  try {
    const queryData = await notionClient.databases.query({
      database_id: DATABSE_ID,
    });

    // Step2. 페이지 프로퍼티 불러오기
    const pages: IArticle[] = queryData.results.map((it) => {
      const page = it as PageObjectResponse;
      return convertArticleType(page);
    });

    return pages;
  } catch (err) {
    console.log(err);
    return null;
  }
};

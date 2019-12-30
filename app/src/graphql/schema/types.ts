import {QueryResult} from "@apollo/react-common";
export type MyArticleQueryResult = QueryResult<Array<MyArticle>>
export interface MyArticle {
    oid: string;
    name: string;
    type: "blob" | "tree"
}


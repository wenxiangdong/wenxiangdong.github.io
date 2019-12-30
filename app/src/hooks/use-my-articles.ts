import {useQuery} from "@apollo/react-hooks";
import { MyArticleQueryResult } from "../graphql/schema/types";
import {loader} from "graphql.macro";

const myArticlesQuery = loader("../graphql/schema/my-articles.graphql");
const branch = "master";
export default function useMyArticles(): MyArticleQueryResult {
    const {data, ...rest} = useQuery(myArticlesQuery);
    const url = data?.repository?.url || "";
    const entries = (data?.repository?.object?.entries || [])
        .map((article: any) => ({
            ...article,
            url:  [url, article.type, branch ,article.name].join("/"),
        }));
    return {
        data: entries,
        ...rest,
    }
}
import {useQuery} from "@apollo/react-hooks";
import { ApolloQueryResult } from "apollo-boost";
import { MyArticleQueryResult } from "../graphql/schema/types";
import {loader} from "graphql.macro";

const myArticlesQuery = loader("../graphql/schema/my-articles.graphql");
export default function useMyArticles(): MyArticleQueryResult {
    const {data, ...rest} = useQuery(myArticlesQuery);
    return {
        data: data?.repository?.object?.entries,
        ...rest,
    }
}
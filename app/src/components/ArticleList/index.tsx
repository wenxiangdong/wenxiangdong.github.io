import React, { useMemo } from "react";
import useMyArticles from "../../hooks/use-my-articles";
import { MyArticle } from "../../graphql/schema/types";

const ArticleItem: React.FC<{article: MyArticle}> = ({article}) => {
    return (
        <>
        <a href={article.url} target="_blank">{article.name}</a>
        </>
    );
}

const ArticleList: React.FC = () => {
    const {data, error, loading} = useMyArticles();

    if (error) throw error;
    return useMemo(() => (
        <div>
            {
                loading ? (
                    "loading..."
                ) : (
                    data?.map(article => (
                        <ArticleItem key={article.oid} article={article} />
                    ))
                )
            }
        </div>
    ), [loading]);
}

export default ArticleList;
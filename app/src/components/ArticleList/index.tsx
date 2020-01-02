import React from "react";
import useMyArticles from "../../hooks/use-my-articles";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";
import withErrorBoundary from "../../hocs/with-error-boundary";

const ListWrapper = styled.div`

`;
const ArticleList: React.FC = () => {
    const {data: articleList, error} = useMyArticles();

    return (
        <ListWrapper>
            {
                articleList?.map(article => (
                    <ArticleItem key={article.url} article={article} />
                ))
            }
        </ListWrapper>
    );
}


export default withErrorBoundary(ArticleList, <ListWrapper>无文章</ListWrapper>);


import React from "react";
import useMyArticles from "../../hooks/use-my-articles";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";
import withErrorBoundary from "../../hocs/with-error-boundary";

const ListWrapper = styled.div`
    color: ${props => props.theme.textPrimaryColor};
`;
const ArticleList: React.FC = () => {
    const {data: articleList, error} = useMyArticles();

    if (error || !articleList || !articleList.length) 
        return <ListWrapper>无文章</ListWrapper>;

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


export default ArticleList;


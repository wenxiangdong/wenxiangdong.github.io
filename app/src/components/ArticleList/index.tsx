import React from "react";
import useMyArticles from "../../hooks/use-my-articles";
import styled from "styled-components";
import ArticleItem from "./ArticleItem";
import tw from "twin.macro";

const ListWrapper = styled.div`
    ${tw`text-primary dark:text-primary-light`}
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


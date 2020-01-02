import React from "react";
import styled from "styled-components";
import { Article } from "../../types";
import { Theme } from "../../hooks/use-theme";

const Wrapper = styled.div`
    padding: 8px;
    border-bottom: ${props => (props.theme as Theme).borderColor} 1px dashed;
    vertical-align: center;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${props => (props.theme as Theme).hoverColor};
    }
`;

const TitleLink = styled.a`
    text-decoration: none;
    color: ${props => (props.theme as Theme).textSecondaryColor};
    font-size: 24px;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
        color: ${props => (props.theme as Theme).textPrimaryColor};
    }
`;
const Tag = styled.span`
    border: ${({color}) => `${color} 1px solid`};
    border-radius: 5px;
    color: ${({color}) => color};
    font-size: 12px;
    padding: 4px 6px;
    margin: 0 8px;
`;
const COLORS = ['#564FF7', '#F56171', '#F5A623'];


interface IProps {article: Article}
const ArticleItem: React.FC<IProps> = ({article}) => {
    return (
        <Wrapper>
            <TitleLink href={article.url} target="_blank" title={article.url}>
                <span style={{fontSize: "2em"}}>{article.name[0]}</span>
                {article.name.slice(1)}
            </TitleLink>
            <span>&emsp;&emsp;</span>
            {
                article.category.map((cate, index) => (
                    <Tag key={index} color={COLORS[index % COLORS.length]} >{cate}</Tag>
                ))
            }
        </Wrapper>
    );
}

export default ArticleItem;
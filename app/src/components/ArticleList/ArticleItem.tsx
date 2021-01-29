import React from "react";
import styled from "styled-components";
import { Article } from "../../types";
import classnames from "classnames";
import tw from "twin.macro";

// const TitleLink = styled.a`
//     text-decoration: none;
//     color: ${props => (props.theme as Theme).textSecondaryColor};
//     font-size: 24px;
//     font-weight: 500;

//     &:hover {
//         text-decoration: underline;
//         color: ${props => (props.theme as Theme).textPrimaryColor};
//     }
// `;
const Tag = styled.span`
    border: ${({color}) => `${color} 1px solid`};
    color: ${({color}) => color};
    ${tw`rounded text-sm p-1 my-0 mx-4`}
`;
const COLORS = ['#564FF7', '#F56171', '#F5A623'];


interface IProps {article: Article}
const ArticleItem: React.FC<IProps> = ({article}) => {
    return (
        <div className={classnames(
            "px-2 py-4",
            "border-b border-gray-200 border-solid",
            "dark:border-gray-600"
        )}>
            <a className={
                classnames(
                    "text-2xl text-medium text-secondary",
                    "dark:text-secondary-light dark:hover:text-primary-light",
                    "hover:no-underline hover:text-primary"
                )
            } href={article.url} target="_blank" title={article.url}>
                <span style={{fontSize: "2em"}}>{article.name[0]}</span>
                {article.name.slice(1)}
            </a>
            {
                article.category.map((cate, index) => (
                    <Tag key={index} color={COLORS[index % COLORS.length]} >{cate}</Tag>
                ))
            }
        </div>
    );
}

export default ArticleItem;
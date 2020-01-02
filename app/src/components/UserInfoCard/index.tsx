import React, { useMemo } from "react";
import {cardStyles, HELP_TEXT_COLOR, PRIMARY_COLOR} from "../../styles";
import useUserInfo from "../../hooks/use-user-info";
import ImageUtils from "../FullScreenImage";
import WhiteSpace from "../WhiteSpace";
import styled from "styled-components";
import Card from "../Card";
import { Theme } from "../../hooks/use-theme";
// styles
const Wrapper = styled(Card)(props => ({
    padding: "16px",
    width: "500px",
    display: "flex",
    alignItems: "center",
    color: `${(props.theme as Theme).textPrimaryColor}`,
}));
const UsernameDiv = styled.div`
    font-size: 24px;
`;
const AvatarImg = styled.img({
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
});
const TextSection = styled.div({
    flex: 1,
    padding: "16px",
    textAlign: "right",
});
const ItemLabelSpan = styled.span`
    margin-right: 8px;
    color: ${props => (props.theme as Theme).textSecondaryColor};
`;
const ItemValueLink = styled.a`
    text-decoration: none;
    color: ${props => (props.theme as Theme).textPrimaryColor};
`;
// inner components
const Item: React.FC<{title: string, value: string}> = ({title, value}) => {
    const isLink = ["http://", "https://"].some(item => value && value.startsWith(item));
    return (
        <div>
            <ItemLabelSpan>{title}</ItemLabelSpan>
            <span>
                {
                    isLink
                    ? <ItemValueLink href={value}>链接</ItemValueLink>
                    : value
                }
            </span>
        </div>
    );
};
const UserInfoCard: React.FC<{style?: React.CSSProperties}> = ({style = {}} = {}) => {

    const {userInfo} = useUserInfo();
    const infoList = useMemo(() => [
        {
            title: "真实姓名",
            value: userInfo.actualName
        },
        {
            title: "英文名",
            value: userInfo.englishName
        },
        {
            title: "性别",
            value: userInfo.gender
        },
        {
            title: "出生",
            value: userInfo.birthday
        },
        {
            title: "大学",
            value: userInfo.school
        },
        {
            title: "公司",
            value: userInfo.company
        },
        {
            title: "简历",
            value: userInfo.resume
        }
    ], [userInfo]);

    return (
        <Wrapper style={style}>
            <div>
                <AvatarImg 
                    alt="头像加载失败"
                    src={userInfo.avatar}/>
            </div>
            <div style={{width: "36px"}}/>
            <TextSection>
                <UsernameDiv>{userInfo.name}</UsernameDiv>
                <WhiteSpace />
                {
                    infoList
                        .filter(info => !!info.value)
                        .map((info) => (
                        <Item key={info.title} title={info.title} value={info.value}/>
                    ))
                }
            </TextSection>
        </Wrapper>
    );
};

export default UserInfoCard;
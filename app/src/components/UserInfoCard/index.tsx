import React, { useMemo } from "react";
import useUserInfo from "../../hooks/use-user-info";
import WhiteSpace from "../WhiteSpace";
import styled from "styled-components";
import Card from "../Card";
import { Theme } from "../../hooks/use-theme";
import classnames from "classnames";
// styles
const Wrapper: React.FC<{ style: React.CSSProperties }> = ({ children, style }) => (
    <Card
        style={style}
        className={classnames(
            "p-4",
            "flex items-center",
            "text-primary dark:text-primary-light"
        )}>{children}</Card>
)
const TextSection = styled.div({
    flex: 1,
    padding: "16px",
    textAlign: "right",
});
// inner components
const Item: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    const isLink = ["http://", "https://"].some(item => value && value.startsWith(item));
    return (
        <div>
            <span className={classnames(
                "m-2",
                "text-secondary dark:text-secondary-light"
            )}>{title}</span>
            <span>
                {
                    isLink
                        ? <a href={value} target="_blank" className={classnames(
                            "no-underline",
                            "text-blue-500"
                        )} >链接</a>
                        : value
                }
            </span>
        </div>
    );
};
const UserInfoCard: React.FC<{ style?: React.CSSProperties }> = ({ style = {} } = {}) => {

    const { userInfo } = useUserInfo();
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
                <img
                    alt="头像加载失败"
                    src={userInfo.avatar}
                    className={classnames(
                        "w-40 h-40",
                        "rounded-full",
                        "object-cover"
                    )} />
            </div>
            <div className="w-8" />
            <TextSection>
                <div className="text-2xl">{userInfo.name}</div>
                <WhiteSpace />
                {
                    infoList
                        .filter(info => !!info.value)
                        .map((info) => (
                            <Item key={info.title} title={info.title} value={info.value} />
                        ))
                }
            </TextSection>
        </Wrapper>
    );
};

export default UserInfoCard;
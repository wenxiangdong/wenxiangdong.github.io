import React, { useMemo } from "react";
import {cardStyles, HELP_TEXT_COLOR, PRIMARY_COLOR, whiteSpaceStyles} from "../../styles";
import useUserInfo from "../../hooks/use-user-info";
import ImageUtils from "../FullScreenImage";
// styles
const wrapperStyles: React.CSSProperties = {
    padding: "16px",
    width: "500px",
    display: "flex",
    alignItems: "center"
};
const titleStyles: React.CSSProperties = {
    fontSize: "24px"
};
const imageStyles: React.CSSProperties = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
};
const textSectionStyles: React.CSSProperties = {
  flex: 1,
  padding: "16px",
    textAlign: "right"
};
// inner components
const Item: React.FC<{title: string, value: string}> = ({title, value}) => {
    const isLink = ["http://", "https://"].some(item => value && value.startsWith(item));
    return (
        <div>
            <span style={{marginRight: "8px", color: HELP_TEXT_COLOR}}>{title}</span>
            {
                isLink
                    ? <span><a
                        style={{textDecoration: "none", color: PRIMARY_COLOR}}
                        href={value}>
                        链接
                    </a></span>
                    : <span>{value}</span>
            }
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
        <div style={{...cardStyles(), ...wrapperStyles, ...style}}>
            <div>
                <img 
                alt="头像加载失败"
                src={userInfo.avatar} 
                style={{...imageStyles}} 
                onClick={() => ImageUtils.previewInFullScreen(userInfo.avatar)}/>
            </div>
            <div style={{width: "36px"}}/>
            <div style={{...textSectionStyles}}>
                <div style={{...titleStyles}}>{userInfo.name}</div>
                <div style={{...whiteSpaceStyles({height: 16})}}/>
                {
                    infoList
                        .filter(info => !!info.value)
                        .map((info) => (
                        <Item key={info.title} title={info.title} value={info.value}/>
                    ))
                }
            </div>
        </div>
    );
};

export default UserInfoCard;
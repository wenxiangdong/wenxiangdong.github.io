import React from "react";
import logo from "../../logo.jpg";
import {cardStyles, HELP_TEXT_COLOR, whiteSpaceStyles} from "../../styles";
import useUserInfo from "../../hooks/use-user-info";

const UserInfoCard: React.FC<{style?: React.CSSProperties}> = ({style = {}} = {}) => {
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
        borderRadius: "50%"
    };
    const textSectionStyles: React.CSSProperties = {
      flex: 1,
      padding: "16px",
        textAlign: "right"
    };

    const {userInfo} = useUserInfo();
    const infoList = [
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
    ];

    // inner components
    const Item: React.FC<{title: string, value: any}> = ({title, value}) => {
        return (
            <div>
                <span style={{marginRight: "8px", color: HELP_TEXT_COLOR}}>{title}</span>
                <span style={{}}>{value}</span>
            </div>
        );
    };

    return (
        <div style={{...cardStyles(), ...wrapperStyles, ...style}}>
            <div>
                <img src={logo} style={{...imageStyles}}/>
            </div>
            <div style={{width: "36px"}}/>
            <div style={{...textSectionStyles}}>
                <div style={{...titleStyles}}>{userInfo.name}</div>
                <div style={{...whiteSpaceStyles({height: 16})}}/>
                {
                    infoList.map((info) => (
                        <Item key={info.title} title={info.title} value={info.value}/>
                    ))
                }
            </div>
        </div>
    );
};

export default UserInfoCard;
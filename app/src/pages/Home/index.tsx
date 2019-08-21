import React, {CSSProperties} from "react";
import Tile from "../../components/Tile";
import WechatIcon from "../../components/icons/WechatIcon";
import SectionTitle from "../../components/SectionTitle";
import GithubIcon from "../../components/icons/GithubIcon";
import OutlookIcon from "../../components/icons/OutlookIcon";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import {useContactInfo} from "../../hooks/use-contact-info";

// const SOCIAL_LIST = [
//     {
//         name: "GitHub",
//         value: "wenxiangdong",
//         icon: GithubIcon,
//         link: "https://github.com/wenxiangdong"
//     },
//     {
//         name: "微信",
//         value: "ericlpl",
//         icon: WechatIcon,
//     },
//     {
//         name: "个人邮箱",
//         value: "wenxiangdong@outlook.com",
//         icon: OutlookIcon,
//     },
//     ];
function Home() {
    // handlers
    const handleJumpToOtherWebsite = (url: string | undefined) => {
        url && window.open(url);
    };
    // styles
    const flexSectionStyles: React.CSSProperties = {
        display: "flex", flexWrap: "wrap", padding: "8px 24px",
        boxSizing: "border-box"
    };
    const pageStyles: CSSProperties = {
        width: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
    };

    // hooks
    const {contactInfoList} = useContactInfo();



    return (
        <div style={{...pageStyles}}>
            <SectionTitle title={"个人信息"} />
            <div style={{...flexSectionStyles}}>
                <UserInfoCard />
            </div>
            <SectionTitle title={"社交联系"} />
            <div style={{...flexSectionStyles}}>
                {
                    contactInfoList.map((item) => (
                        <Tile
                            key={item.type}
                            title={item.type}
                            note={item.value}
                            icon={<Icon type={item.icon} />}
                           onClick={() => handleJumpToOtherWebsite(item.link)}
                        />
                    ))
                }
            </div>
        </div>
    );
}
export default Home;
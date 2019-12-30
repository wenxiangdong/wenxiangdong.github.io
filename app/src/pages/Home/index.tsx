import React, {CSSProperties} from "react";
import Tile from "../../components/Tile";
import SectionTitle from "../../components/SectionTitle";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import {useContactInfo} from "../../hooks/use-contact-info";
import ShootingStars from "../../components/ShootingStars";
import Application from "../../components/Application";
import ArticleList from "../../components/ArticleList";
import {IApplication} from "../../hooks/use-application-info";
import useHtmlTitle from "../../hooks/use-html-title";


// styles
const flexSectionStyles: React.CSSProperties = {
    display: "flex", flexWrap: "wrap", padding: "8px 24px",
    boxSizing: "border-box"
};
const pageStyles: CSSProperties = {
    width: "100vw",
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#ECF5FD66",
    padding: "36px",
};
const sectionTitleStyles: CSSProperties = {
    backgroundColor: "transparent"
};
function Home() {
    // handlers
    const handleJumpToOtherWebsite = (url: string | undefined) => {
        url && window.open(url);
    };

    // hooks
    const {contactInfoList} = useContactInfo();
    useHtmlTitle("文向东的主页");

    return (
        <div style={{...pageStyles}}>
            <SectionTitle title={"个人信息"} style={sectionTitleStyles} />
            <div style={flexSectionStyles}>
                <UserInfoCard />
            </div>
            <SectionTitle title={"社交联系"} style={sectionTitleStyles} />
            <div style={flexSectionStyles}>
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
            <SectionTitle title={"我的应用"} style={sectionTitleStyles} />
            <SectionTitle title={"我的文章"} style={sectionTitleStyles} />
            <ArticleList />
            {/*背景*/}
            <ShootingStars style={{opacity: 0.8}}/>
        </div>
    );
}
export default Home;
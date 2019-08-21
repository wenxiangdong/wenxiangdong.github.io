import React, {CSSProperties} from "react";
import Tile from "../../components/Tile";
import SectionTitle from "../../components/SectionTitle";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import {useContactInfo} from "../../hooks/use-contact-info";
import ShootingStars from "../../components/ShootingStars";

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
        backgroundColor: "#ECF5FD66",
        padding: "36px",
    };
    const sectionTitleStyles: CSSProperties = {
        backgroundColor: "transparent"
    };

    // hooks
    const {contactInfoList} = useContactInfo();



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
            <div style={flexSectionStyles}>
                <Tile title={"Mr Listen"} style={{cursor: "auto"}}>
                    <ul>
                        <li><a onClick={() => console.log("click")}>github</a></li>
                        <li>应用地址</li>
                        <li>二维码</li>
                    </ul>
                </Tile>
                {
                    Array(10).fill("").map(() => (
                        <Tile />
                    ))
                }
            </div>
            {/*背景*/}
            <ShootingStars style={{opacity: 0.8}}/>
        </div>
    );
}
export default Home;
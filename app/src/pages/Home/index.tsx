import React, {CSSProperties} from "react";
import Tile from "../../components/Tile";
import SectionTitle from "../../components/SectionTitle";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import {useContactInfo} from "../../hooks/use-contact-info";
import ShootingStars from "../../components/ShootingStars";
import Application from "../../components/Application";
import {IApplication} from "../../hooks/use-application-info";

const app = {name: "程序", desc: "描述描述描述描述描述描述描述描述描".repeat(2),
    type: 0,
    webUrl: "httsp",
    sourceCodeUrl: "hhtt",
    qrCodeUrl: "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7e250e62399b033b2c88fbdc2df551ee/38dbb6fd5266d016a32b8d4e9a2bd40735fa35a1.jpg",
    cooperators: ["Eric", "Lucy", "Jane"],
    // appPreviewImages: [
    //     "http://img3.imgtn.bdimg.com/it/u=4077384849,4007343454&fm=26&gp=0.jpg",
    //     "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7e250e62399b033b2c88fbdc2df551ee/38dbb6fd5266d016a32b8d4e9a2bd40735fa35a1.jpg"
    // ]
} as IApplication;

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
            <div style={{...flexSectionStyles, display: "block"}}>
                <Application app={app} />
                <Application app={app} />
                <Application app={app} />
                <Application app={app} />
                <Application app={app} />
                <Application app={app} />
            </div>
            {/*背景*/}
            <ShootingStars style={{opacity: 0.8}}/>
        </div>
    );
}
export default Home;
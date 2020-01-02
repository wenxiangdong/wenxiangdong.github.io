import React, {CSSProperties, useCallback, useContext} from "react";
import Tile from "../../components/Tile";
import SectionTitle from "../../components/SectionTitle";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import {useContactInfo} from "../../hooks/use-contact-info";
import ShootingStars from "../../components/ShootingStars";
import useHtmlTitle from "../../hooks/use-html-title";
import ArticleList from "../../components/ArticleList";
import {ThemeContainer, Theme} from "../../hooks/use-theme";
import styled, {ThemeContext, ThemeProvider} from "styled-components";
import { useContainer } from "unstated-next";


// styles
const FlexSection = styled.div({
    display: "flex", 
    flexWrap: "wrap", 
    padding: "8px 24px",
    boxSizing: "border-box"
});
const Page = styled.div`
    width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    background-color: ${(props) => (props.theme as Theme).pageBackgroundColor};
    padding: 36px;
`;
const ArticleListWrapper = styled.div`
    padding: 8px;
`;

function Home() {
    // handlers
    const handleJumpToOtherWebsite = useCallback((url: string | undefined) => {
        url && window.open(url);
    }, []);

    // hooks
    const {contactInfoList} = useContactInfo();
    useHtmlTitle("文向东的主页");

    return (
        <Page>
            <SectionTitle title={"个人信息"} />
            <FlexSection>
                <UserInfoCard />
            </FlexSection>
            <SectionTitle title={"社交联系"} />
            <FlexSection>
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
            </FlexSection>
            {/* <SectionTitle title={"我的应用"} style={sectionTitleStyles} /> */}
            <SectionTitle title={"我的文章"} />
            <ArticleListWrapper>
                <ArticleList />
            </ArticleListWrapper>
            {/*背景*/}
            <ShootingStars style={{opacity: 0.8}}/>
        </Page>
    );
}
export default Home;
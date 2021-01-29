import React, { useCallback, useState } from "react";
import Tile from "../../components/Tile";
import SectionTitle from "../../components/SectionTitle";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import { useContactInfo } from "../../hooks/use-contact-info";
import ShootingStars from "../../components/ShootingStars";
import useHtmlTitle from "../../hooks/use-html-title";
import ArticleList from "../../components/ArticleList";
import SidePanel, { SidePanelDirections } from "../../components/SidePanel";
import { Theme } from "../../hooks/use-theme";
import styled from "styled-components";

const FlexSection: React.FC = ({children}) => (
  <div className="flex flex-wrap py-2 px-6 box-border">{children}</div>
)
const Page: React.FC = ({children}) => (
  <div className="min-h-screen box-border p-9 bg-gray-100 dark:bg-gray-900">{children}</div>
)
const ArticleListWrapper:React.FC = ({children}) => (
  <div className="p-2">{children}</div>
)

function Home() {
  // handlers
  const handleJumpToOtherWebsite = useCallback((url: string | undefined) => {
    url && window.open(url);
  }, []);

  // hooks
  const { contactInfoList } = useContactInfo();
  useHtmlTitle("文向东的主页");

  const [showPanel, setShowPanel] = useState(false);

  return (
    <Page>
      <SectionTitle title={"个人信息"} />
      <FlexSection>
        <UserInfoCard />
      </FlexSection>
      <SectionTitle title={"社交联系"} />
      <FlexSection>
        {contactInfoList.map((item) => (
          <Tile
            key={item.type}
            title={item.type}
            note={item.value}
            icon={<Icon type={item.icon} />}
            onClick={() => handleJumpToOtherWebsite(item.link)}
          />
        ))}
      </FlexSection>
      {/* <SectionTitle title={"我的应用"} style={sectionTitleStyles} /> */}
      <SectionTitle title={"我的文章"} />
      <ArticleListWrapper>
        <ArticleList />
      </ArticleListWrapper>
      {/*背景*/}
      <ShootingStars style={{ opacity: 0.8 }} />
    </Page>
  );
}
export default Home;

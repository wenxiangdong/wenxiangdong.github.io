import React, { useCallback, useState } from "react";
import Tile from "../../components/Tile";
import SectionTitle from "../../components/SectionTitle";
import UserInfoCard from "../../components/UserInfoCard";
import Icon from "../../components/icons/Icon";
import { useContactInfo } from "../../hooks/use-contact-info";
import ShootingStars from "../../components/ShootingStars";
import useHtmlTitle from "../../hooks/use-html-title";
import ArticleList from "../../components/ArticleList";
import { ToolConfigs } from "../Tools/tool-data";
import { Link } from "react-router-dom";

const FlexSection: React.FC = ({ children }) => (
  <div className="box-border flex flex-wrap px-6 py-2">{children}</div>
)
const Page: React.FC = ({ children }) => (
  <div className="box-border min-h-screen p-2 bg-gray-100 sm:p-4 md:p-9 dark:bg-gray-900">{children}</div>
)
const ArticleListWrapper: React.FC = ({ children }) => (
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
      {/* <SectionTitle title={"我的文章"} />
      <ArticleListWrapper>
        <ArticleList />
      </ArticleListWrapper> */}
      <SectionTitle title="小工具" />
      <FlexSection>
        {
          ToolConfigs.map(item => (
            <Link key={item.link} to={item.link}>
              <Tile
                title={item.title}
                note={item.desc} />
            </Link>
          ))
        }
      </FlexSection>
      {/*背景*/}
      <ShootingStars style={{ opacity: 0.8 }} />
    </Page>
  );
}
export default Home;

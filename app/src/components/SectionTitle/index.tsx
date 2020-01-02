import React from "react";
import {PRIMARY_COLOR} from "../../styles";
import styled from "styled-components";

const Wrapper = styled.div`
    font-size: 18px;
    padding: 8px;
    background-color: white;
`;
const TagSpan = styled.span`
    padding: 0 4px;
    background-color: ${PRIMARY_COLOR};
    margin-right: 8px;
`;

const SectionTitle: React.FC<{title: string, style?: React.CSSProperties}> = (
    {
        title,
        style = {}
    }
) => {
  return (
      <Wrapper style={style}>
          <TagSpan></TagSpan>
          {title}
      </Wrapper>
  );
};

export default SectionTitle;
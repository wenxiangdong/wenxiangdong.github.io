import React from "react";
import styled from "styled-components";
import { Theme } from "../../hooks/use-theme";

const Wrapper = styled.div`
    font-size: 18px;
    padding: 8px;
    background-color: transparent;
    color: ${props => (props.theme as Theme).textPrimaryColor}
`;
const TagSpan = styled.span`
    padding: 0 4px;
    background-color: ${props => (props.theme as Theme).primaryColor};
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
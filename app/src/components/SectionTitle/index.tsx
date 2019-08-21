import React from "react";
import {PRIMARY_COLOR} from "../../styles";

const SectionTitle: React.FC<{title: string, style?: React.CSSProperties}> = (
    {
        title,
        style = {}
    }
) => {
    // styles
    const defaultStyles: React.CSSProperties = {
      fontSize: "18px",
      padding: "8px",
        // position: "sticky",
        // top: "0",
        // zIndex: 10,
        backgroundColor: "white"
    };
    const tagStyles: React.CSSProperties = {
        padding: "0 4px",
        backgroundColor: PRIMARY_COLOR,
        marginRight: "8px"
    };
  return (
      <div style={{...defaultStyles, ...style}}>
          <span style={{...tagStyles}}></span>
          {title}
      </div>
  );
};

export default SectionTitle;
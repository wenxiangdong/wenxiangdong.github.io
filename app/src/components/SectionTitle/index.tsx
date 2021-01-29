import React from "react";
import styled from "styled-components";
import classnames from "classnames";
const SectionTitle: React.FC<{title: string, style?: React.CSSProperties}> = (
    {
        title,
        style = {}
    }
) => {
  return (
      <div style={style} className={classnames(
          "text-lg text-primary dark-text-primary-light",
          "p-2",
          "bg-transparent"
      )}>
          <span className={classnames(
              "w-4",
              "m-2 py-0 px-1",
              "bg-blue-500"
          )}></span>
          {title}
      </div>
  );
};

export default SectionTitle;
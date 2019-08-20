import * as React from "react";
const FONT_SIZE_NORMAL = "16px";

export const PRIMARY_COLOR = "#2d8cf0";

const baseButtonStyles: React.CSSProperties = {
    outline: "none",
    fontSize: FONT_SIZE_NORMAL,
    padding: "8px 16px",
    backgroundColor: "transparent",
    borderRadius: "8px",
    cursor: "pointer",
    boxSizing: "border-box"
};
export const outlineButtonStyles: (options?:{borderColor: string, textColor: string} | any) => React.CSSProperties = ({borderColor = PRIMARY_COLOR, textColor = "white"} = {}) => ({
    ...baseButtonStyles,
    border: `${borderColor} 1px solid`,
    color: textColor,
});
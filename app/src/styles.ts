import * as React from "react";
import {CSSProperties} from "react";
const FONT_SIZE_NORMAL = "16px";

export const PRIMARY_COLOR = "#2d8cf0";
export const HELP_TEXT_COLOR = "#C9C9C9";

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

export const whiteSpaceStyles = ({height = 16} = {}) => ({
    height: `${height}px`,
    width: "100%",
    backgroundColor: "transparent",
} as CSSProperties);

export const cardStyles = ({hasShadow = true} = {}) => ({
    boxSizing: "border-box",
    borderRadius: "6px",
    backgroundColor: "white",
    border: "rgba(0,0,0,0.1) 1px solid",
    boxShadow: hasShadow ? "rgba(0,0,0,0.05) 0 0 5px" : "none",
} as CSSProperties);
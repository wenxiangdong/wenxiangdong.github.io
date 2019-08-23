import React from "react";
import "./index.css";
import {HELP_TEXT_COLOR, whiteSpaceStyles} from "../../styles";

interface IProps {
    title?: string | React.ReactNode;
    note?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | any;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
}

const Tile: React.FC<IProps> = ({
                                    title = "",
                                    note = "",
                                    children,
                                    style = {},
                                    icon,
                                    onClick
                                } = {}) => {
    // constants
    const SIZE = "200px";
    const PADDING = "16px";
    // styles
    const defaultStyle: React.CSSProperties = {
        width: SIZE,
        height: SIZE,
        margin: "8px",
        padding: PADDING,
        wordBreak: "break-all",
        wordWrap: "break-word",
        overflowY: "auto",
    };
    const titleStyle: React.CSSProperties = {
        fontSize: "18px"
    };
    const noteStyle: React.CSSProperties = {
        color: HELP_TEXT_COLOR,
        fontSize: "14px"
    };
    const iconStyle: React.CSSProperties = {
        position: "absolute",
        right: PADDING,
        bottom: PADDING
    };
    return (
        <div
            className="Tile__wrapper"
            onClick={onClick}
            style={{...defaultStyle, ...style}}>
            <div style={{...titleStyle}}>
                {title}
            </div>
            <div style={{...whiteSpaceStyles({height: 8})}}/>
            <div style={{...noteStyle}}>{note}</div>
            <div style={{flex: "1"}}>
                {children}
            </div>
            <div style={{...iconStyle}}>
                {icon}
            </div>
        </div>
    );
};

export default Tile;
import React from "react";
import WhiteSpace from "../WhiteSpace";
import styled from "styled-components";
import { Theme } from "../../hooks/use-theme";

interface IProps {
    title?: string | React.ReactNode;
    note?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | any;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
}

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

const Wrapper = styled.div`
    box-sizing: border-box;
    border-radius: 6px;
    background-color: ${props => (props.theme as Theme).backgroundColor};
    border: ${props => (props.theme as Theme).borderColor} 1px solid;
    position: relative;
    cursor: pointer;
    box-shadow: rgba(0,0,0,0.05) 0 0 5px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    width: ${SIZE};
    height: ${SIZE};
    margin: 8px;
    padding: ${PADDING};
    word-break: break-all;
    word-wrap: break-word;
    overflow-y: auto;

    color: ${props => (props.theme as Theme).textPrimaryColor};

    &:hover::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: ${props => (props.theme as Theme).hoverColor};
        pointer-events: none;
    }

    & .title {
       font-size: 18px; 
    }
    & .note {
        font-size: 14px;
        color: ${props => (props.theme as Theme).textSecondaryColor};
    }
    & .icon {
        position: absolute;
        right: ${PADDING};
        bottom: ${PADDING};
    }
`;

const Tile: React.FC<IProps> = ({
                                    title = "",
                                    note = "",
                                    children,
                                    style = {},
                                    icon,
                                    onClick
                                } = {}) => {
    
    return (
        <Wrapper
            onClick={onClick}
            style={{...defaultStyle, ...style}}>
            <div className="title">
                {title}
            </div>
            <WhiteSpace style={{height: "8px"}} />
            <div className="note">{note}</div>
            <div style={{flex: "1"}}>
                {children}
            </div>
            <div className="icon">
                {icon}
            </div>
        </Wrapper>
    );
};

export default Tile;
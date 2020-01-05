import React, { useState } from "react";
import styled, {css} from "styled-components";
import {Theme} from "../../hooks/use-theme";
import { useLogger } from "../../hooks/use-logger";
import SidePanel, { SidePanelDirections } from "../SidePanel";
import ThemeSwitcher from "../ThemeSwitcher";


const BUTTON_WIDTH = "24px";
const LINE_HEIGHT = "4px";
const GAP = "5px";
const LINE_CLASS = "line";
const CENTER_LINE_CLASS = "center-line";
const TOP_LINE_CLASS = "top-line";
const BOTTOM_LINE_CLASS = "bottom-line";
const HamburgerButton = styled.div.attrs((props: any) => ({
    active: props.active
}))`
    width: ${BUTTON_WIDTH};
    height: ${BUTTON_WIDTH};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;

    position: fixed;
    top: 10px;
    right: ${props => props.active ? "calc(20vw + 10px)" : "10px"};
    transition: all .5s ease;
    z-index: 3;

    cursor: pointer;

    &>div {
        width: ${BUTTON_WIDTH};
        background-color: ${props => (props.theme as Theme).textPrimaryColor};
        height: ${LINE_HEIGHT};
        transition: all .5s ease;
    }

    &>div:nth-child(1) {
        transform-origin: left center;
        transform: rotateZ(${props => props.active ? "40deg" : "0"});
        width: ${props => props.active ? `calc(${BUTTON_WIDTH} * 1.3)` : BUTTON_WIDTH};
    }

    &>div:nth-child(2) {
        width: ${props => props.active ? "0" : BUTTON_WIDTH};
    }

    &>div:nth-child(3) {
        transform-origin: left center;
        transform: rotateZ(${props => props.active ? "-40deg" : "0"});
        width: ${props => props.active ? `calc(${BUTTON_WIDTH} * 1.3)` : BUTTON_WIDTH};
    }
`;

const SettingItemTitle = styled.div`
    color: ${props => (props.theme as Theme).textPrimaryColor};
    font-size: 24px;
    padding: 8px;
`;

const Setting: React.FC<React.PropsWithChildren<React.HTMLAttributes<any>>> = ({children, style, onClick, className}) => {
    const [active,setActive] = useState(false);
    const {info} = useLogger(Setting.name);
    const handleClickButton = (e: any) => {
        
        setActive(pre => !pre);
        info(active);
        onClick?.(e);
        
    }
    return (
        <>
            <HamburgerButton 
                active={active}
                className={className}
                style={style}  
                onClick={handleClickButton} >
                    <div/>
                    <div/>
                    <div/>
                </HamburgerButton>
            <SidePanel
                visible={active} 
                direction={SidePanelDirections.fromRight}
                onClose={() => setActive(false)}>
                <SettingItemTitle>主题</SettingItemTitle>
                <ThemeSwitcher/>
            </SidePanel>
        </>
    );
}

export default Setting;

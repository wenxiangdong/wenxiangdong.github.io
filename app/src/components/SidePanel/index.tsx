import React, { useMemo, useState } from "react";
import styled, {keyframes, css, Keyframes, StyledComponent} from "styled-components";
import {Theme} from "../../hooks/use-theme";
import {Animated, AnimationString} from "react-animated-css";

export enum SidePanelDirections {
    fromTop = 0,
    fromRight = 1,
    fromBottom = 2,
    fromLeft = 3,  
}
interface IProps {
    visible: boolean;
    direction?: SidePanelDirections;
    style?: React.CSSProperties;
    onClose?: () => void;
    onOpen?: () => void;
}

const OverLayer = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: ${props => (props.theme as Theme).hoverColor};
    transition: all .5s ease;
`;
const BasePanel = styled.div`
    background-color: ${props => (props.theme as Theme).backgroundColor};
    border: ${props => (props.theme as Theme).borderColor} 1px solid;
    box-shadow: ${props => (props.theme as Theme).borderColor} 0 0 2px;
    display: flex;
    padding: 8px;
`;

const VerticalPanel = styled(BasePanel)`
    width: 20vw;
    height: 100vh;
    flex-direction: column;
`;
const HorizontalPanel = styled(BasePanel)`
    width: 100vw;
    height: 20vh;
    flex-direction: row;
`;
const createPositionStyle = (direction: SidePanelDirections) => {
    const positions = [
        "top: 0; left: 0;",
        "right: 0; top: 0;",
        "bottom: 0; left: 0;",
        "left: 0; top: 0;",
    ];
    return css`
        position: absolute;
        ${positions[direction]};
    `;
}
const getPanelComponent = (direction: SidePanelDirections) => {
    return [HorizontalPanel, VerticalPanel, HorizontalPanel, VerticalPanel][direction];
}
const createAnimatedProps = (direction: SidePanelDirections) => {
    const inOuts: Array<Array<AnimationString>> = [
        ["bounceInDown", "bounceOutUp"],
        ["bounceInRight", "bounceOutRight"],
        ["bounceInUp", "bounceOutDown"],
        ["bounceInLeft", "bounceOutLeft"],
    ];
    const [animationIn, animationOut] = inOuts[direction];
    return {
        animationIn,
        animationOut,
    };
}


const SidePanel: React.FC<React.PropsWithChildren<IProps>> = ({
    children, 
    visible,
    direction = SidePanelDirections.fromRight,
    style = {},
    onClose,
    onOpen,
}) => {

    const Panel: StyledComponent<"div", any> = useMemo(() => {
        const style = createPositionStyle(direction);
        return styled(getPanelComponent(direction))`
            ${style}
        `;
    }, [direction]);

    const handleToggle = () => {
        const nextVisible = !visible;
        return nextVisible ? onOpen?.() : onClose?.();
    }
    

    return (
        <>
        <Animated isVisible={visible} animationIn="fadeIn" animationOut="fadeOut">
            <OverLayer onClick={handleToggle}>
                <Panel style={style} onClick={e => {e.stopPropagation()}}>{children}</Panel>
            </OverLayer>
        </Animated>
        </>
    );
}

export default SidePanel;
import React from "react";
import WhiteSpace from "../WhiteSpace";
import styled from "styled-components";
import tw from "twin.macro";
import classnames from "classnames";
import Card from "../Card";

interface IProps {
    title?: string | React.ReactNode;
    note?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | any;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
}

const Wrapper = styled(Card).attrs({
    className: classnames(
        "transition-transform",
        "transform origin-center hover:scale-105 hover:shadow-lg",
        "relative w-full sm:w-40 sm:h-40 sm:mx-2 my-2 p-2",
        "flex flex-col",
        "no-underline cursor-pointer",
        "break-all",
        "overflow-y-auto",
    )
})`
    & .title {
       ${tw`text-lg text-primary dark:text-primary-light`}
    }
    & .note {
        ${tw`text-sm text-secondary dark:text-secondary-light`}
    }
    & .icon {
        ${tw`absolute right-2 bottom-2`}
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
            style={style}>
            <div className="title">
                {title}
            </div>
            <WhiteSpace style={{ height: "8px" }} />
            <div className="note">{note}</div>
            <div style={{ flex: "1" }}>
                {children}
            </div>
            <div className="icon">
                {icon}
            </div>
        </Wrapper>
    );
};

export default Tile;
import React from "react";
import styled from "styled-components";
import { Theme } from "../../hooks/use-theme";

const CardDiv = styled.div(props => ({
    boxSizing: "border-box",
    borderRadius: "6px",
    backgroundColor: `${(props.theme as Theme).backgroundColor}`,
    border: `${(props.theme as Theme).borderColor} 1px solid`,
    // boxShadow: "rgba(0,0,0,0.05) 0 0 5px",
}))

const Card: React.FC<React.PropsWithChildren<React.HTMLAttributes<any>>> = ({children, style, className}) => {
    return (
        <CardDiv style={style} className={className}>
            {children}
        </CardDiv>
    );
}

export default Card;
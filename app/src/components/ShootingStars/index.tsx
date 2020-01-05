import React, { useContext } from "react";
import "./index.css";
import styled, { ThemeContext } from "styled-components";
import { Theme } from "../../hooks/use-theme";
const Star = styled.div`
    background: linear-gradient(-45deg, rgba(0, 0, 0, 0), ${props => (props.theme as Theme).starColor});
    /* background: linear-gradient(-45deg, #ffe75f, rgba(0, 0, 255, 0)); */
    filter: drop-shadow(0 0 6px ${props => (props.theme as Theme).starColor});
    z-index: 2;

    &::after, &::before {
        background: linear-gradient(-45deg, rgba(0, 0, 0, 0), ${props => (props.theme as Theme).starColor}, rgba(0, 0, 0, 0));
        content: "hello";
        font-size: 20px;
    }
`;
const ShootingStars: React.FC<{style?: React.CSSProperties}> = ({style = {}}) => {
    const theme = useContext(ThemeContext);
    return (
        <div className="wrapper" style={{...style}}>
            <div className="night">
                <Star className="star" />
                <Star className="star" />
                <Star className="star"/>
                <Star className="star"/>
                <Star className="star"/>
            </div>
        </div>
    );
};

export default ShootingStars;
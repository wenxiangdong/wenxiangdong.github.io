import React, { useContext } from "react";
import "./index.css";
import styled from "styled-components";
const Star = styled.div`
    background: linear-gradient(-45deg, #ffe75f, rgba(0, 0, 255, 0));
    filter: drop-shadow(0 0 6px #ffe75f);
    z-index: 2;

    &::after, &::before {
        background: linear-gradient(-45deg, rgba(0, 0, 0, 0), #ffe75f, rgba(0, 0, 0, 0));
        content: "";
        font-size: 20px;
    }
`;
const ShootingStars: React.FC<{style?: React.CSSProperties}> = ({style = {}}) => {
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
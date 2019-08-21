import React from "react";
import "./index.css";
const ShootingStars: React.FC<{style?: React.CSSProperties}> = ({style = {}}) => {
    return (
        <div className="wrapper" style={{...style}}>
            <div className="night">
                <div className="star" />
                <div className="star" />
                <div className="star"/>
                <div className="star"/>
                <div className="star"/>
            </div>
        </div>
    );
};

export default ShootingStars;
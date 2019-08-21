import React from "react";
import "./index.css";
function BreathingButton({onClick = () => null, style = {}} = {}) {
    const SIZE = "30px";
    return (
        <div className="BB__wrapper">
            <div
                className="BB__circle"
                onClick={onClick}
                style={{
                    ...style,
                    width: SIZE,
                    height: SIZE
                }}/>
        </div>
    );
}

export default BreathingButton;
import React from "react";
import "./index.css";
function BreathingButton({ onClick = () => null, style = {} } = {}) {
    const SIZE = "30px";
    return (
        <div className="BB__wrapper inline-block p-4">
            <div
                className="BB__circle border-black border-2 border-solid rounded-full dark:border-white"
                onClick={onClick}
                style={{
                    ...style,
                    width: SIZE,
                    height: SIZE
                }} />
        </div>
    );
}

export default BreathingButton;
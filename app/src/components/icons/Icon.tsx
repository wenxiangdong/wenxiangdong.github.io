import React, { useState, useEffect } from "react";
import { ICON_SIZE } from "./type";

const Icon: React.FC<{ size?: number, color?: string, type: string }> = ({
    size = ICON_SIZE,
    color,
    type
}) => {
    const [module, setModule] = useState({});
    useEffect(() => {
        import(`./${type}Icon`)
            .then(res => {
                setModule(res);
            })
            .catch(console.error);
    }, [type]);
    // @ts-ignore
    const Icon = module && module.default;
    return Icon ? <Icon size={size} color={color} /> : null;
};

export default Icon;
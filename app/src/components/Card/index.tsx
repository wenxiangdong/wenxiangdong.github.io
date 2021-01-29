import React from "react";
import classnames from "classnames";

const Card: React.FC<React.PropsWithChildren<React.HTMLAttributes<any>>> = ({children, style, className}) => {
    return (
        <div 
        style={style} 
        className={classnames(
            className,
            "box-border",
            "rounded-md",
            "bg-white dark:bg-gray-700"
        )}>
            {children}
        </div>
    );
}

export default Card;
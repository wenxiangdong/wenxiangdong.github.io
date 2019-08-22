import React, {CSSProperties} from "react";
import Tile from "../Tile";
import {ApplicationType, IApplication} from "../../hooks/use-application-info";

import webIcon from "./Chrome.png";
import androidIcon from "./Android.png";
import miniIcon from "./mini.png";
import sourceIcon from "./source.png";

interface IProps {
    app: IApplication;
    style?: CSSProperties;
}

const Icons = {
    [ApplicationType.Android]: androidIcon,
    [ApplicationType.MiniProgram]: miniIcon,
    [ApplicationType.Web]: webIcon,
};

const InfoItem = ({image = "", label = "", value = "", isLink = false}) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center"
        }}>
            <img src={image} style={{width: "24px", height: "24px"}} />
            <span>{label}：</span>
            <span>{
                isLink ? <a href={value}>go</a> : value
            }</span>
        </div>
    );
};

const Application: React.FC<IProps> = ({app, style = {}}) => {
    const baseStyles: CSSProperties = {
        width: "auto",
        maxWidth: "500px",
    };
    const image = <img src={Icons[app.type]} style={{width: "32px", height: "32px"}} /> ;
    return (
        <Tile
            style={{...baseStyles, ...style}}
            note={app.desc}
            title={app.name}
            icon={image}
        >
            <div>
                <InfoItem image={sourceIcon} label={"源代码"} value={"www.github.com"} isLink />
            </div>
        </Tile>
    );
};

export default Application;
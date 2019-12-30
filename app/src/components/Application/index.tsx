import React, {CSSProperties} from "react";
import Tile from "../Tile";
import {ApplicationType, IApplication} from "../../hooks/use-application-info";

import webIcon from "./Chrome.png";
import androidIcon from "./Android.png";
import miniIcon from "./mini.png";
import {PRIMARY_COLOR} from "../../styles";
import qrCodeIcon from "./qr-code.png";
import ImageUtils from "../FullScreenImage";

interface IProps {
    app: IApplication;
    style?: CSSProperties;
}

const Icons = {
    [ApplicationType.Android]: androidIcon,
    [ApplicationType.MiniProgram]: miniIcon,
    [ApplicationType.Web]: webIcon,
};

const InfoItem = ({label = "", value = "", link = ""}: {label: string, value: any, link?: string}) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            margin: "8px 0"
        }}>
            {/*<img src={image} style={{width: "24px", height: "24px"}} />*/}
            <span>{label}：</span>
            <span>{
                link ? <a href={link} style={{
                    textDecoration: "none",
                    color: PRIMARY_COLOR
                }}>{value}</a> : value
            }</span>
        </div>
    );
};

const Application: React.FC<IProps> = ({app, style = {}}) => {
    const HEIGHT = "250px";
    const baseStyles: CSSProperties = {
        width: "auto",
        height: HEIGHT,
        maxWidth: "500px",
        cursor: "auto"
    };
    const wrapperStyles: React.CSSProperties = {
        display: "flex"
    };
    const typeIcon = <img src={Icons[app.type]} style={{width: "32px", height: "32px"}} /> ;

    const ImageTile = ({url = "", index = 0}: {url: string, index: number}) => {
        return (
            <Tile
                // title={"预览图"}
                onClick={() => ImageUtils.previewInFullScreen(url)}
                note={`预览图(${index + 1})`}
                style={{height: HEIGHT, width: HEIGHT, overflow: "hidden", marginLeft: "0"}}>
                <div style={{
                    height: "100%",
                    // marginTop: "8px",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    <img src={url} style={{width: "100%", height: "auto"}}/>
                </div>
            </Tile>
        );
    };

    return (
        <div style={wrapperStyles}>
            <Tile
                style={{...baseStyles, ...style}}
                note={app.desc}
                title={app.name}
                icon={typeIcon}
            >
                <div style={{padding: "8px"}}>
                    <InfoItem label={"源代码"} value={"去看看"} link={app.sourceCodeUrl} />
                    {app.webUrl && <InfoItem label={"应用地址"} value={"运行"} link={app.webUrl} />}
                    {app.qrCodeUrl &&
                        <InfoItem label={"二维码"}
                              value={
                                  <img
                                      onClick={() => ImageUtils.previewInFullScreen(app.qrCodeUrl)}
                                      src={qrCodeIcon}
                                      style={{width: "1em", height: "1em", cursor: "pointer"}} />
                              }/>
                    }
                    {app.cooperators && app.cooperators.length
                        && <InfoItem label={"合作者"} value={app.cooperators.join("，")} />}
                </div>
            </Tile>
            {
                app.appPreviewImages && app.appPreviewImages.map((url, index) => (
                    <ImageTile url={url} index={index}/>
                ))
            }
        </div>
    );
};

export default Application;